"use client";
import { useUser } from "@/hooks/useUser";
import AuthCard from "./components/AuthCard/AuthCard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Carousel } from "primereact/carousel";
import "./main.scss";

export default function Home() {
  const { data: user, isSuccess } = useUser();
  const router = useRouter();

  const carouselItems = [
    {
      title: "Summarization with protected Route",
      description: "Summary with gemini Ai.",


    },
    {
      title: "Secure Authentication JWT",
      description: "Experience blazing fast app performance.",

    },
    {
      title: "Secure Access",
      description: "Your data is protected with advanced security.",
    },
  ];
  useEffect(() => {
    if (isSuccess) {
      router.push("/dashboard");
    }
  }, [isSuccess]);
  const itemTemplate = (item: any) => (
    <div className="carousel-item">
      <h2>{item.title}</h2>
      <p>{item.description}</p>

    </div>)

  return (
    <main className="login-layout">
      <div className="login-left">
        <Carousel
          value={carouselItems}
          itemTemplate={itemTemplate}
          numVisible={1}
          numScroll={1}
          autoplayInterval={2000}
          circular
        />
      </div>
      <div className="login-right">
        <AuthCard />
      </div>
    </main>
  );
}
