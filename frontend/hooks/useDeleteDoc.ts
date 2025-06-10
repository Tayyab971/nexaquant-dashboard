import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteDoc() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/document/delete/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            const data = await res.json();
            if (!res.ok || data.success === false) {
                throw new Error(data.message || "Failed to delete document");
            }

            return data.message;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        },
    });
}