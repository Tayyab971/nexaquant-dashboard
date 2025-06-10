
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useGenerateSummary() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/document/generate-summary/${id}`, {
                method: "PATCH",
                credentials: "include",
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.message || "Failed to generate summary");
            }

            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        },
    });
}
