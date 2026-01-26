"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Authenticated, Unauthenticated } from "convex/react";

function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="flex flex-col gap-4 w-full bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-300 dark:border-slate-600"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const formData = new FormData(e.target as HTMLFormElement);
        formData.set("flow", flow);
        void signIn("password", formData)
          .then(() => {
            // After successful sign in/up, the Authenticated component will take over
            setLoading(false);
          })
          .catch((err) => {
            setError(err.message);
            setLoading(false);
          });
      }}
    >
      <input
        className="bg-white dark:bg-slate-900 text-foreground rounded-lg p-3 border border-slate-300 dark:border-slate-600 focus:border-slate-500 dark:focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 outline-none transition-all placeholder:text-slate-400"
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <div className="flex flex-col gap-1">
        <input
          className="bg-white dark:bg-slate-900 text-foreground rounded-lg p-3 border border-slate-300 dark:border-slate-600 focus:border-slate-500 dark:focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 outline-none transition-all placeholder:text-slate-400"
          type="password"
          name="password"
          placeholder="Password"
          minLength={8}
          required
        />
        {flow === "signUp" && (
          <p className="text-xs text-slate-500 dark:text-slate-400 px-1">
            Password must be at least 8 characters
          </p>
        )}
      </div>
      <button
        className="bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-semibold rounded-lg py-3 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading..." : flow === "signIn" ? "Sign in" : "Sign up"}
      </button>
      <div className="flex flex-row gap-2 text-sm justify-center">
        <span className="text-slate-600 dark:text-slate-400">
          {flow === "signIn"
            ? "Don't have an account?"
            : "Already have an account?"}
        </span>
        <span
          className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 font-medium underline decoration-2 underline-offset-2 hover:no-underline cursor-pointer transition-colors"
          onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
        >
          {flow === "signIn" ? "Sign up" : "Sign in"}
        </span>
      </div>
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/30 dark:border-rose-500/50 rounded-lg p-4">
          <p className="text-rose-700 dark:text-rose-300 font-medium text-sm break-words">
            Error: {error}
          </p>
        </div>
      )}
    </form>
  );
}

function AuthenticatedContent() {
  const router = useRouter();
  const approvalStatus = useQuery(api.userApproval.getUserApprovalStatus);
  const { signOut } = useAuthActions();

  useEffect(() => {
    if (approvalStatus?.status === "approved") {
      router.push("/admin");
    }
  }, [approvalStatus, router]);

  // Loading state
  if (approvalStatus === undefined) {
    return (
      <div className="flex flex-col gap-4 w-full bg-slate-100 dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-300 dark:border-slate-600">
        <p className="text-center text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    );
  }

  // Pending approval
  if (approvalStatus?.status === "pending") {
    return (
      <div className="flex flex-col gap-6 w-full bg-amber-50 dark:bg-amber-900/20 p-8 rounded-2xl shadow-xl border border-amber-300 dark:border-amber-600">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-2">
            Account Pending Approval
          </h2>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            Your account is pending approval from an administrator.
          </p>
          <p className="text-amber-600 dark:text-amber-400 text-sm mt-4">
            You will be able to access the admin panel once your account is approved.
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="mt-4 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm underline cursor-pointer"
        >
          Sign out
        </button>
      </div>
    );
  }

  // Declined
  if (approvalStatus?.status === "declined") {
    return (
      <div className="flex flex-col gap-6 w-full bg-rose-50 dark:bg-rose-900/20 p-8 rounded-2xl shadow-xl border border-rose-300 dark:border-rose-600">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-rose-800 dark:text-rose-200 mb-2">
            Access Declined
          </h2>
          <p className="text-rose-700 dark:text-rose-300 text-sm">
            Your access request has been declined by an administrator.
          </p>
          <p className="text-rose-600 dark:text-rose-400 text-sm mt-4">
            Please contact the administrator if you believe this is an error.
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="mt-4 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm underline cursor-pointer"
        >
          Sign out
        </button>
      </div>
    );
  }

  // No approval record yet (new sign up - waiting for record to be created)
  // This happens briefly after sign up before the pending user record is created
  return (
    <div className="flex flex-col gap-6 w-full bg-amber-50 dark:bg-amber-900/20 p-8 rounded-2xl shadow-xl border border-amber-300 dark:border-amber-600">
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-2">
          Account Created
        </h2>
        <p className="text-amber-700 dark:text-amber-300 text-sm">
          Your account has been created. An administrator has been notified and will review your access request.
        </p>
        <p className="text-amber-600 dark:text-amber-400 text-sm mt-4">
          You will be able to access the admin panel once your account is approved.
        </p>
      </div>
      <button
        onClick={() => signOut()}
        className="mt-4 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm underline cursor-pointer"
      >
        Sign out
      </button>
    </div>
  );
}

export default function SignIn() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-lg mx-auto h-screen justify-center items-center px-4">
      <div className="text-center flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <Image
            src="/convex.svg"
            alt="Convex Logo"
            width={90}
            height={90}
          />
          <div className="w-px h-20 bg-slate-300 dark:bg-slate-600"></div>
          <Image
            src="/nextjs-icon-light-background.svg"
            alt="Next.js Logo"
            width={90}
            height={90}
            className="dark:hidden"
          />
          <Image
            src="/nextjs-icon-dark-background.svg"
            alt="Next.js Logo"
            width={90}
            height={90}
            className="hidden dark:block"
          />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          Forefront Ministries South Africa
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Sign in or sign up to access the admin panel.
        </p>
      </div>
      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
      <Authenticated>
        <AuthenticatedContent />
      </Authenticated>
    </div>
  );
}
