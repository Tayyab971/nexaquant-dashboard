"use client";
import NexaTable from "../components/common/NexaTable/NexaTable";
import { documents } from "@/utils/navigation";

export default function NexaQuantaDashboard() {
  const handleGenerateSummary = (id: number) => {
    console.log("Generate summary for:", id);
  };
  return (
    <main>
      <h1>Your Documents</h1>
      <NexaTable
        documents={documents}
        onGenerateSummary={handleGenerateSummary}
      />
    </main>
  );
}
