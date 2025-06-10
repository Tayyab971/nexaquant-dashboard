// hooks/useUser.ts
"use client";

import { useQuery } from "@tanstack/react-query";

export const useUser = () =>
  useQuery({
    queryKey: ["user"],

    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`, {
        credentials: "include",
      });

      const data = await res.json();
      if (!data.success) throw new Error("Unauthenticated");
      return data.user;
    },
    retry: false,
  });
