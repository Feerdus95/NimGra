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
        throw new Error(data.message || "Failed to fetch candidate profile");
    }

    return data;
}
