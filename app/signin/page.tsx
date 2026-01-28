"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";

function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="flex flex-col gap-4 w-full bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const formData = new FormData(e.target as HTMLFormElement);
        formData.set("flow", flow);
        
        console.log("[SignIn] Attempting sign in with flow:", flow);
        console.log("[SignIn] Form data entries:", Object.fromEntries(formData.entries()));
        
        void signIn("password", formData)
          .then((result) => {
            console.log("[SignIn] Sign in successful, result:", result);
            setLoading(false);
          })
          .catch((err) => {
            console.error("[SignIn] Sign in error:", err);
            console.error("[SignIn] Error message:", err.message);
            console.error("[SignIn] Error stack:", err.stack);
            setError(err.message);
            setLoading(false);
          });
      }}
    >
      <input
        className="bg-gray-50 text-gray-800 rounded-lg p-3 border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all placeholder:text-gray-400"
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <div className="flex flex-col gap-1">
        <input
          className="bg-gray-50 text-gray-800 rounded-lg p-3 border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all placeholder:text-gray-400"
          type="password"
          name="password"
          placeholder="Password"
          minLength={8}
          required
        />
        {flow === "signUp" && (
          <p className="text-xs text-gray-500 px-1">
            Password must be at least 8 characters
          </p>
        )}
      </div>
      <button
        className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg py-3 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading..." : flow === "signIn" ? "Sign In" : "Sign Up"}
      </button>
      <div className="flex flex-row gap-2 text-sm justify-center">
        <span className="text-gray-600">
          {flow === "signIn"
            ? "Don't have an account?"
            : "Already have an account?"}
        </span>
        <span
          className="text-amber-600 hover:text-amber-700 font-medium cursor-pointer transition-colors"
          onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
        >
          {flow === "signIn" ? "Sign up" : "Sign in"}
        </span>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-medium text-sm break-words">
            {error}
          </p>
        </div>
      )}
    </form>
  );
}

function AuthenticatedContent() {
  const router = useRouter();
  const approvalStatus = useQuery(api.userApproval.getUserApprovalStatus);
  const ensurePendingUserRecord = useMutation(api.userApproval.ensurePendingUserRecord);
  const { signOut } = useAuthActions();
  const [isCreatingRecord, setIsCreatingRecord] = useState(false);
  const [recordCreated, setRecordCreated] = useState(false);

  // If no approval record exists, create one
  useEffect(() => {
    if (approvalStatus === null && !isCreatingRecord && !recordCreated) {
      setIsCreatingRecord(true);
      ensurePendingUserRecord()
        .then((result) => {
          console.log("[SignIn] Ensured pending user record:", result);
          setRecordCreated(true);
          setIsCreatingRecord(false);
        })
        .catch((err) => {
          console.error("[SignIn] Error ensuring pending user record:", err);
          setIsCreatingRecord(false);
        });
    }
  }, [approvalStatus, isCreatingRecord, recordCreated, ensurePendingUserRecord]);

  useEffect(() => {
    if (approvalStatus?.status === "approved") {
      router.push("/admin");
    }
  }, [approvalStatus, router]);

  // Loading state - also show loading if record was just created (waiting for query to update)
  if (approvalStatus === undefined || isCreatingRecord || (approvalStatus === null && recordCreated)) {
    return (
      <div className="flex flex-col gap-4 w-full bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
        <div className="flex items-center justify-center py-4">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );
  }

  // Pending approval
  if (approvalStatus?.status === "pending") {
    return (
      <div className="flex flex-col gap-6 w-full bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Account Pending Approval
          </h2>
          <p className="text-gray-600 text-sm">
            Your account is pending approval from an administrator.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            You will be able to access the admin panel once your account is approved.
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="mt-2 text-amber-600 hover:text-amber-700 text-sm font-medium cursor-pointer transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  // Declined
  if (approvalStatus?.status === "declined") {
    return (
      <div className="flex flex-col gap-6 w-full bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Access Declined
          </h2>
          <p className="text-gray-600 text-sm">
            Your access request has been declined by an administrator.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            Please contact the administrator if you believe this is an error.
          </p>
        </div>
        <button
          onClick={() => signOut()}
          className="mt-2 text-amber-600 hover:text-amber-700 text-sm font-medium cursor-pointer transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  // No approval record yet - this should rarely show since we auto-create records
  // Show a retry option in case something went wrong
  return (
    <div className="flex flex-col gap-6 w-full bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Setting Up Your Account
        </h2>
        <p className="text-gray-600 text-sm">
          Please wait while we set up your account...
        </p>
      </div>
      <button
        onClick={() => {
          setRecordCreated(false);
          setIsCreatingRecord(false);
        }}
        className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg cursor-pointer transition-colors"
      >
        Retry
      </button>
      <button
        onClick={() => signOut()}
        className="text-amber-600 hover:text-amber-700 text-sm font-medium cursor-pointer transition-colors"
      >
        Sign out
      </button>
    </div>
  );
}

export default function SignIn() {
  return (
    <div className="min-h-screen font-sans relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero-mountains.jpg')`,
          backgroundColor: '#2d3748',
        }}
      >
        <div className="absolute inset-0 bg-slate-800/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span className="text-white/60 hover:text-white/80 text-sm transition-colors">
              ← Back to Home
            </span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-light text-white mb-2">
            Welcome to
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-amber-400 italic mb-4">
            Forefront
          </h2>
          <p className="text-gray-300 max-w-md mx-auto">
            Sign in to access the admin panel and manage ministry operations.
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md">
          <Unauthenticated>
            <SignInForm />
          </Unauthenticated>
          <Authenticated>
            <AuthenticatedContent />
          </Authenticated>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Forefront Ministries South Africa
          </p>
        </div>
      </div>
    </div>
  );
}
