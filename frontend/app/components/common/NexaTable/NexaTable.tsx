"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

type Document = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  summary?: string;
};

type DocumentTableProps = {
  documents: Document[];
  onGenerateSummary: (id: number) => void;
};

export default function NexaTable({
  documents,
  onGenerateSummary,
}: DocumentTableProps) {
  const summaryButton = (rowData: Document) => (
    <Button
      label="Generate Summary"
      icon="pi pi-bolt"
      onClick={() => onGenerateSummary(rowData.id)}
      className="p-button-sm p-button-outlined"
    />
  );

  const tagsTemplate = (rowData: Document) => (
    <div>{rowData.tags.join(", ")}</div>
  );

  return (
    <DataTable value={documents} paginator rows={5} responsiveLayout="scroll">
      <Column field="title" header="Title" />
      <Column field="description" header="Description" />
      <Column body={tagsTemplate} header="Tags" />
      <Column
        body={summaryButton}
        header="Actions"
        style={{ width: "12rem" }}
      />
      <Column
        body={summaryButton}
        header="Actions"
        style={{ width: "12rem" }}
      />
    </DataTable>
  );
}
