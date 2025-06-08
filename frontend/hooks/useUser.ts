// hooks/useUser.ts
"use client";

import { useQuery } from "@tanstack/react-query";

export const useUser = () =>
  useQuery({
    queryKey: ["user"],

    queryFn: async () => {
      const res = await fetch("http://localhost:6432/api/auth/profile", {
        credentials: "include",
      });

      const data = await res.json();
      if (!data.success) throw new Error("Unauthenticated");
      return data.user;
    },
    retry: false,
  });
