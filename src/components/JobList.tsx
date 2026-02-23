"use client";

import { useJobs } from "@/hooks/useJobs";
import { JobItem } from "@/components/JobItem";

interface JobListProps {
    candidateId: string;
    uuid: string;
    applicationId: string;
}

export function JobList({ candidateId, uuid, applicationId }: Readonly<JobListProps>) {
    const { data: jobs, isLoading, isError, error } = useJobs();

    if (isLoading) {
        return (
            <div className="space-y-4">
                {["skeleton-1", "skeleton-2", "skeleton-3"].map((id) => (
                    <div
                        key={id}
                        className="h-28 animate-pulse rounded-xl bg-gray-100"
                    />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                <p className="text-sm text-red-600">
                    {error instanceof Error ? error.message : "Failed to load positions"}
                </p>
            </div>
        );
    }

    if (!jobs || jobs.length === 0) {
        return (
            <p className="text-center text-gray-500">
                No open positions available at the moment.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {jobs.map((job) => (
                <JobItem
                    key={job.id}
                    job={job}
                    candidateId={candidateId}
                    uuid={uuid}
                    applicationId={applicationId}
                />
            ))}
        </div>
    );
}
