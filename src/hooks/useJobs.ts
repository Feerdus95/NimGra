import { useQuery } from "@tanstack/react-query";

import { getJobs } from "@/services/jobRepository";

export function useJobs() {
    return useQuery({
        queryKey: ["jobs"],
        queryFn: getJobs,
    });
}
