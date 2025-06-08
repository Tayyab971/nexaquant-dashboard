"use client";

import { useUser } from "@/hooks/useUser";
import { usePathname } from "next/navigation";
import NexaHeader from "./NexaHeader";

export default function NexaHeaderWrapper() {
  const { data: user, isSuccess, isLoading } = useUser();
  const pathname = usePathname();

  if (pathname === "/") return null;

  if (isLoading) {
    return <div style={{ height: "60px" }} />;
  }

  if (!user) return null;

  return <NexaHeader />;
}
