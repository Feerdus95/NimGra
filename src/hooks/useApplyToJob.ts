import { useMutation } from "@tanstack/react-query";

import { applyToJob } from "@/services/jobRepository";

export function useApplyToJob() {
    return useMutation({
        mutationFn: applyToJob,
    });
}
