# Coda Integration Setup

This document explains how to set up the automatic sync between Coda and Convex for meeting data.

## Overview

The website now pulls meeting data from Convex, which automatically syncs with your Coda table once per day at 6 AM UTC.

## Setup Steps

### 1. Create a Coda Table

Create a table in Coda with the following columns:
- **Title** - The meeting title
- **Description** - Meeting description
- **Date** - Meeting date (e.g., "January 13, 2026")
- **Time** - Meeting time (e.g., "7:00 PM - 8:30 PM")
- **Location** - Meeting location (e.g., "Online (Zoom)" or "Community Center, Room 204")
- **Type** - Meeting type (must be either "Online" or "In-Person")

### 2. Get Your Coda API Credentials

1. Go to https://coda.io/account
2. Click on "API Settings"
3. Generate a new API token
4. Copy your API token

To get your Doc ID and Table ID:
- Your Doc ID is in the URL when viewing your Coda doc: `https://coda.io/d/_d{DOC_ID}/`
- Your Table ID can be found by:
  1. Opening your table
  2. Click the three dots menu on the table
  3. Select "Copy table URI"
  4. The table ID is the last part: `grid-{TABLE_ID}`

### 3. Configure Environment Variables in Convex

Add the following environment variables to your Convex deployment:

```bash
npx convex env set CODA_API_TOKEN your_api_token_here
npx convex env set CODA_DOC_ID your_doc_id_here
npx convex env set CODA_TABLE_ID your_table_id_here
```

### 4. Update Column Names (if needed)

If your Coda table uses different column names, edit `convex/codaSync.ts` and update the column mappings:

```typescript
const meetings = data.items.map((row: any) => ({
  codaId: row.id,
  title: row.values["c-YourTitleColumn"] || "",
  description: row.values["c-YourDescriptionColumn"] || "",
  // ... etc
}));
```

### 5. Seed Initial Data (Optional)

To populate the database with initial test data before setting up Coda:

1. Go to your Convex dashboard
2. Navigate to Functions
3. Run `seedMeetings.seedInitialMeetings`

### 6. Manual Sync (Optional)

To manually trigger a sync from Coda instead of waiting for the daily cron:

1. Go to your Convex dashboard
2. Navigate to Functions
3. Run `codaSync.manualSyncFromCoda`

## How It Works

1. **Cron Job**: A scheduled function runs daily at 6 AM UTC
2. **Fetch Data**: It fetches all rows from your Coda table via the Coda API
3. **Transform**: The data is transformed to match the meeting schema
4. **Sync**: The database is updated:
   - New meetings from Coda are inserted
   - Existing meetings are updated
   - Meetings removed from Coda are deleted

## Coda Table Format

Your Coda table should look like this:

| Title | Description | Date | Time | Location | Type |
|-------|-------------|------|------|----------|------|
| Monday Mindset Session | Start your week with intention... | January 13, 2026 | 7:00 PM - 8:30 PM | Online (Zoom) | Online |
| Wednesday Wellness | Mid-week focus on mental health... | January 15, 2026 | 6:30 PM - 8:00 PM | Community Center, Room 204 | In-Person |

## Testing

After setup:
1. Add a meeting to your Coda table
2. Run the manual sync function (or wait for the daily cron)
3. Check your website to see the new meeting appear

## Troubleshooting

- **No meetings showing**: Check that the Coda API credentials are correct
- **Sync errors**: Check the Convex logs for error messages
- **Column not found**: Verify column names in `codaSync.ts` match your Coda table
