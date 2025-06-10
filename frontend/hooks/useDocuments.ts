import { useQuery } from "@tanstack/react-query";

export const useDocuments = () => {
    return useQuery({
        queryKey: ["documents"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/document/docs`, {
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Failed to fetch documents");
            }

            return data.data;
        },
    });
};