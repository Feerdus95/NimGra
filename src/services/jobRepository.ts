import type { Job, ApplyToJobPayload, ApplyToJobResponse } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getJobs(): Promise<Job[]> {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to fetch job listings");
    }

    return data;
}

export async function applyToJob(
    payload: ApplyToJobPayload
): Promise<ApplyToJobResponse> {
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
        // Handle descriptive field errors if present
        if (data.details?.fieldErrors) {
            const fieldErrors = Object.entries(data.details.fieldErrors)
                .map(([field, messages]) => `${field}: ${(messages as string[]).join(", ")}`)
                .join(" | ");
            throw new Error(fieldErrors || data.error || "Validation error");
        }

        throw new Error(data.message || data.error || "Failed to submit application");
    }

    return data;
}
