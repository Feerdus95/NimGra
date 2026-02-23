"use client";

import { useState } from "react";

import { useCandidate } from "@/hooks/useCandidate";
import { JobList } from "@/components/JobList";

export default function Home() {
  const [emailInput, setEmailInput] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    data: candidate,
    isLoading,
    isError,
    error,
  } = useCandidate(submittedEmail);

  function handleLoadProfile(e: React.FormEvent) {
    e.preventDefault();
    setSubmittedEmail(emailInput.trim());
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          NimGra
        </h1>
        <p className="mt-2 text-gray-500">
          Nimble Gravity — Job Application Portal
        </p>
      </header>

      {!candidate && (
        <form
          onSubmit={handleLoadProfile}
          className="mb-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Enter your email to get started
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="email"
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="jane.doe@example.com"
              required
              disabled={isLoading}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-50"
            />

            <button
              type="submit"
              disabled={isLoading || !emailInput.trim()}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            >
              {isLoading ? "Loading..." : "Load Profile"}
            </button>
          </div>

          {isError && (
            <p className="mt-3 text-sm text-red-600">
              {error instanceof Error
                ? error.message
                : "Could not load your profile"}
            </p>
          )}
        </form>
      )}

      {candidate && (
        <>
          <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-4 text-center">
            <p className="text-sm text-green-800">
              Welcome, <span className="font-semibold">{candidate.firstName} {candidate.lastName}</span>!
            </p>
          </div>

          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Open Positions
          </h2>

          <JobList candidateId={candidate.candidateId} uuid={candidate.uuid} />
        </>
      )}
    </main>
  );
}
