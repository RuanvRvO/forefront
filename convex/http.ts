import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

auth.addHttpRoutes(http);

// HTTP endpoint for user approval/decline
http.route({
  path: "/approve-user",
  method: "GET",
  handler: httpAction(async (ctx, request) => {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const action = url.searchParams.get("action");

    if (!token || !action || (action !== "approve" && action !== "decline")) {
      return new Response(generateHtmlResponse("Invalid Request", "Missing or invalid parameters.", false), {
        status: 400,
        headers: { "Content-Type": "text/html" },
      });
    }

    const result = await ctx.runAction(internal.userApproval.processApproval, {
      token,
      action: action as "approve" | "decline",
    });

    const title = result.success 
      ? (action === "approve" ? "User Approved" : "User Declined")
      : "Error";

    return new Response(generateHtmlResponse(title, result.message, result.success), {
      status: result.success ? 200 : 400,
      headers: { "Content-Type": "text/html" },
    });
  }),
});

function generateHtmlResponse(title: string, message: string, success: boolean): string {
  const bgColor = success ? (title.includes("Approved") ? "#22c55e" : "#f59e0b") : "#ef4444";
  const icon = success ? (title.includes("Approved") ? "✓" : "✕") : "⚠";
  
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - Forefront Ministries</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          padding: 20px;
        }
        .card {
          background: white;
          border-radius: 16px;
          padding: 40px;
          max-width: 450px;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: ${bgColor};
          color: white;
          font-size: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }
        h1 {
          color: #1e293b;
          margin-bottom: 16px;
          font-size: 24px;
        }
        p {
          color: #64748b;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="icon">${icon}</div>
        <h1>${title}</h1>
        <p>${message}</p>
      </div>
    </body>
    </html>
  `;
}

export default http;
