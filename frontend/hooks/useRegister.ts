"use client";

import { useMutation } from "@tanstack/react-query";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const res = await fetch("http://localhost:6432/api/auth/register", {
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
  });
};
