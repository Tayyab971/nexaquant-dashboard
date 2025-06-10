"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });
};
