"use client";
import { useUser } from "@/hooks/useUser";
import AuthCard from "./components/AuthCard/AuthCard";
import "./main.scss";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: user, isSuccess } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard");
    }
  }, [isSuccess]);
  return (
    <main className="login-layout">
      <div className="login-left">
        <div className="branding">
          <h2>New Scheduling And Routing Options</h2>
          <p>We also updated the format of podcasts and rewards.</p>
          {/* You can add an image or SVG here */}
          <img src="/login-illustration.png" alt="Illustration" />
        </div>
      </div>
      <div className="login-right">
        <AuthCard />
      </div>
    </main>
  );
}
