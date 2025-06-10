// hooks/useUpdateDoc.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateDocPayload = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    summary?: string;
};

export const useUpdateDoc = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: UpdateDocPayload) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/document/update/${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (!res.ok || !result.success) {
                throw new Error(result.message || "Failed to update document please try again");
            }

            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        },
    });
};
