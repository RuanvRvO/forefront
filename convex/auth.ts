import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
  callbacks: {
    afterUserCreatedOrUpdated: async (ctx, args) => {
      // Only trigger for new users (not updates)
      if (args.existingUserId === undefined && args.profile?.email) {
        // Schedule the approval workflow
        await ctx.scheduler.runAfter(0, internal.userApproval.handleNewUserSignUp, {
          userId: args.userId,
          email: args.profile.email as string,
        });
      }
    },
  },
});
