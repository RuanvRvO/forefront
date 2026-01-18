# Email Subscription Setup

This document explains the email subscription system for marketing and reminders.

## Overview

Users can subscribe to updates via the landing page. Email addresses are stored in Convex and can be used for marketing campaigns and meeting reminders via Resend.

## Database Schema

The `emailSubscribers` table stores:
- `email` - Subscriber's email address (indexed for quick lookups)
- `subscribedAt` - Timestamp when they subscribed
- `source` - Where they subscribed from (e.g., "landing_page")

## Features

### 1. Email Subscription
- Form validation (proper email format required)
- Duplicate prevention (can't subscribe twice with same email)
- Success/error feedback to users
- Auto-clear form on success

### 2. Available Functions

**For Users:**
- `emailSubscribers.subscribe` - Subscribe a new email

**For Admin:**
- `emailSubscribers.listSubscribers` - Get all subscribers
- `emailSubscribers.unsubscribe` - Remove a subscriber

## Integrating with Resend

### Setup Resend

1. Install Resend:
   ```bash
   npm install resend
   ```

2. Add your Resend API key to environment variables:
   ```bash
   npx convex env set RESEND_API_KEY your_resend_api_key
   ```

### Example: Send Welcome Email

Create `convex/emails.ts`:

```typescript
import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

export const sendWelcomeEmail = action({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Forefront <noreply@yourdomain.com>",
      to: args.email,
      subject: "Welcome to Forefront Community!",
      html: `
        <h1>Welcome!</h1>
        <p>Thank you for subscribing to Forefront updates.</p>
        <p>You'll receive notifications about upcoming meetings and events.</p>
      `,
    });
  },
});
```

Then update the subscribe mutation to trigger the welcome email:

```typescript
// In convex/emailSubscribers.ts
import { internal } from "./_generated/api";

// After successful subscription:
await ctx.scheduler.runAfter(0, internal.emails.sendWelcomeEmail, {
  email: args.email,
});
```

### Example: Send Meeting Reminders

Create a function to send reminders to all subscribers:

```typescript
export const sendMeetingReminder = action({
  args: {
    meetingTitle: v.string(),
    meetingDate: v.string(),
    meetingTime: v.string(),
    meetingLocation: v.string(),
  },
  handler: async (ctx, args) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Get all subscribers
    const subscribers = await ctx.runQuery(
      internal.emailSubscribers.listSubscribers
    );

    // Send email to each subscriber
    for (const subscriber of subscribers) {
      await resend.emails.send({
        from: "Forefront <noreply@yourdomain.com>",
        to: subscriber.email,
        subject: `Reminder: ${args.meetingTitle}`,
        html: `
          <h1>${args.meetingTitle}</h1>
          <p><strong>Date:</strong> ${args.meetingDate}</p>
          <p><strong>Time:</strong> ${args.meetingTime}</p>
          <p><strong>Location:</strong> ${args.meetingLocation}</p>
          <p>We look forward to seeing you there!</p>
        `,
      });
    }

    return { sent: subscribers.length };
  },
});
```

### Schedule Automated Reminders

Add to `convex/cron.ts`:

```typescript
// Send weekly digest every Monday at 9 AM
crons.weekly(
  "weekly digest",
  { hourUTC: 9, minuteUTC: 0, dayOfWeek: "monday" },
  internal.emails.sendWeeklyDigest
);
```

## Exporting Subscribers

To export subscribers for external use:

1. Go to Convex Dashboard
2. Run `emailSubscribers.listSubscribers`
3. Export the results as CSV/JSON

Or create a dedicated export function:

```typescript
export const exportSubscribers = query({
  args: {},
  handler: async (ctx) => {
    const subscribers = await ctx.db
      .query("emailSubscribers")
      .collect();

    return subscribers.map(s => ({
      email: s.email,
      subscribedAt: new Date(s.subscribedAt).toISOString(),
      source: s.source,
    }));
  },
});
```

## GDPR Compliance

Remember to:
- Add a privacy policy link on the subscription form
- Provide unsubscribe links in all emails
- Store consent information
- Allow users to request their data deletion

## Testing

Test the subscription:
1. Enter an email on the landing page
2. Click "Subscribe"
3. Check Convex dashboard for the new subscriber
4. Try subscribing again with the same email (should see error)
5. Test with invalid email format (should see error)
