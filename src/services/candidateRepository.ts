import type { Candidate } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCandidateByEmail(
    email: string
): Promise<Candidate> {
    const response = await fetch(
        `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`
    );

    const data = await response.json();

    if (!response.ok) {
        if (data.details?.fieldErrors) {
            const fieldErrors = Object.entries(data.details.fieldErrors)
                .map(([field, messages]) => `${field}: ${(messages as string[]).join(", ")}`)
                .join(" | ");
            throw new Error(fieldErrors || data.error || "Validation error");
        }
        throw new Error(data.message || data.error || "Failed to fetch candidate profile");
    }

    return data;
}
