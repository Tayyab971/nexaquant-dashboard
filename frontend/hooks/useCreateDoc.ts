import { useMutation, useQueryClient } from "@tanstack/react-query";



export const useCreateDocument = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (docData: {
            title: string;
            description: string;
            tags: string[];
            summary?: string;
        }) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/document/create`, {
                method: "POST",
                credentials: "include", // Important for cookies
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(docData),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Failed to create document");
            }

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        },
    });
};