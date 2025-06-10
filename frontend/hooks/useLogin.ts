"use client";

import { useMutation } from "@tanstack/react-query";

type LoginPayload = {
  email: string;
  password: string;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Login failed");
      }

      return result;
    },
  });
};
