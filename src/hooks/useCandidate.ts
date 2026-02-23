import { useQuery } from "@tanstack/react-query";

import { getCandidateByEmail } from "@/services/candidateRepository";

export function useCandidate(email: string) {
    return useQuery({
        queryKey: ["candidate", email],
        queryFn: () => getCandidateByEmail(email),
        enabled: !!email,
        retry: false,
    });
}
