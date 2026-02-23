"use client";

import { useState } from "react";

import type { Job } from "@/types";
import { useApplyToJob } from "@/hooks/useApplyToJob";

interface JobItemProps {
    job: Job;
    candidateId: string;
    uuid: string;
}

export function JobItem({ job, candidateId, uuid }: Readonly<JobItemProps>) {
    const [repoUrl, setRepoUrl] = useState("");
    const { mutate, status, isPending, isSuccess, isError, error } = useApplyToJob();

    const isValidUrl = repoUrl.trim().length > 0;

    function handleSubmit() {
        mutate({
            uuid,
            jobId: job.id,
            candidateId,
            repoUrl: repoUrl.trim(),
        });
    }

    const buttonLabel = (
        {
            pending: "Submitting...",
            success: "Submitted ✓",
        } as Record<string, string>
    )[status] ?? "Submit";

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">{job.title}</h3>

            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    type="url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/your-user/your-repo"
                    disabled={isPending || isSuccess}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                />

                <button
                    onClick={handleSubmit}
                    disabled={!isValidUrl || isPending || isSuccess}
                    className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                >
                    {buttonLabel}
                </button>
            </div>

            {isError && (
                <p className="mt-3 text-sm text-red-600">
                    {error instanceof Error ? error.message : "An unexpected error occurred"}
                </p>
            )}

            {isSuccess && (
                <p className="mt-3 text-sm text-green-600">
                    Application submitted successfully!
                </p>
            )}
        </div>
    );
}
