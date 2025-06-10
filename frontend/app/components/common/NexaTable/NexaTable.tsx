"use client";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

type Document = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  summary?: string;
};

type DocumentTableProps = {
  documents: Document[];
  onGenerateSummary: (id: string) => void;
  onEdit: (doc: Document) => void
  onDelete: (doc: Document) => void
};



export default function NexaTable({
  documents,
  onGenerateSummary,
  onEdit,
  onDelete
}: DocumentTableProps) {
  const deleteButton = (rowData: Document) => (
    <Button
      label="Delete"
      icon="pi pi-trash"
      onClick={() => onDelete(rowData)
      }
      className="p-button-sm p-button-outlined"
      severity="danger"
    />
  );
  const editButton = (rowData: Document) => (
    <Button
      label="Edit"
      icon="pi pi-pencil"
      onClick={() => onEdit(rowData)}
      className="p-button-sm p-button-outlined"
    />
  );
  const summaryButton = (rowData: Document) => (
    <Button
      label="Generate Summary"
      icon="pi pi-bolt"
      onClick={() => onGenerateSummary(rowData.id)}
      className="p-button-sm p-button-outlined"
    />
  );

  const severity = ["success", "danger", "warning", "info", "secondary", "contrast"];
  function getRandomString(strings: any) {
    if (!strings.length) throw new Error("Array must not be empty");
    const randomIndex = Math.floor(Math.random() * strings.length);
    return strings[randomIndex];
  }

  const tagsTemplate = (rowData: Document) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
      {rowData.tags.map((tag, index) => {
        const color = getRandomString(severity);
        return <Tag key={index} value={tag} severity={color} rounded />;
      })}
    </div>
  );
  return (
    <DataTable value={documents} paginator rows={5} responsiveLayout="scroll">
      <Column field="title" header="Title" />
      <Column field="description" header="Description" />
      <Column body={tagsTemplate} header="Tags" />
      <Column
        body={summaryButton}
        header="Actions"
        style={{ width: "16rem" }}
      />
      <Column
        body={editButton}
        header="Edit"
        style={{ width: "8rem" }}
      />
      <Column
        body={deleteButton}
        header="Delete"
        style={{ width: "8rem" }}
      />
    </DataTable>
  );
}
