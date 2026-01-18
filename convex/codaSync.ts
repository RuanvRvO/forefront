import { action, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

// Type for Coda row data
interface CodaRow {
  id: string;
  values: Record<string, string>;
}

// This action will be called by the cron job to sync meetings from Coda
export const syncMeetingsFromCodaAction = internalAction({
  args: {},
  handler: async (ctx) => {
    // TODO: Replace these with your actual Coda API credentials
    // You can store these in environment variables
    const CODA_API_TOKEN = process.env.CODA_API_TOKEN;
    const CODA_DOC_ID = process.env.CODA_DOC_ID;
    const CODA_TABLE_ID = process.env.CODA_TABLE_ID;

    if (!CODA_API_TOKEN || !CODA_DOC_ID || !CODA_TABLE_ID) {
      console.error("Coda credentials not configured");
      return { success: false, error: "Coda credentials not configured" };
    }

    try {
      // Fetch rows from Coda table
      const response = await fetch(
        `https://coda.io/apis/v1/docs/${CODA_DOC_ID}/tables/${CODA_TABLE_ID}/rows`,
        {
          headers: {
            Authorization: `Bearer ${CODA_API_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Coda API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Transform Coda rows to meeting format
      // Adjust the column names based on your Coda table structure
      const meetings = data.items.map((row: CodaRow) => ({
        codaId: row.id,
        title: row.values["c-title"] || row.values["Title"] || "",
        description: row.values["c-description"] || row.values["Description"] || "",
        date: row.values["c-date"] || row.values["Date"] || "",
        time: row.values["c-time"] || row.values["Time"] || "",
        location: row.values["c-location"] || row.values["Location"] || "",
        type: (row.values["c-type"] || row.values["Type"] || "Online") as "Online" | "In-Person",
      }));

      // Sync the meetings to the database
      await ctx.runMutation(internal.meetings.syncMeetingsFromCoda, {
        meetings,
      });

      console.log(`Successfully synced ${meetings.length} meetings from Coda`);
      return { success: true, synced: meetings.length };
    } catch (error) {
      console.error("Error syncing from Coda:", error);
      return { success: false, error: String(error) };
    }
  },
});

// Manual sync action that can be called from the dashboard or API
export const manualSyncFromCoda = action({
  args: {},
  handler: async (ctx): Promise<{ success: boolean; synced?: number; error?: string }> => {
    return await ctx.runAction(internal.codaSync.syncMeetingsFromCodaAction, {});
  },
});
