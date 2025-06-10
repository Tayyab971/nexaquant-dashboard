"use client";
import { Button } from "primereact/button";
import NexaTable from "../components/common/NexaTable/NexaTable";
import { useState } from "react";
import DocumentDialog from "../components/DocumentDialogue/DocumentDialogue";
import { useCreateDocument } from "@/hooks/useCreateDoc";
import { useDocuments } from "@/hooks/useDocuments";
import { useUpdateDoc } from "@/hooks/useUpdateDoc";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useDeleteDoc } from "@/hooks/useDeleteDoc";
import { useGenerateSummary } from "@/hooks/useGenerateSummary";
import SummaryModal from "../components/SummaryModal/SummaryModal";
import "./dashboard.scss"



export default function NexaQuantaDashboard() {
  const { data: documents = [], } = useDocuments();
  const createDocMutation = useCreateDocument()
  const updateDocMutation = useUpdateDoc()
  const deleteDocMutation = useDeleteDoc()
  const generateSummaryMutation = useGenerateSummary()

  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [summaryModalVisible, setSummaryModalVisible] = useState<boolean>(false)
  const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);



  const handleDelete = (doc: any) => {
    confirmDialog({
      message: `Are you sure you want to delete "${doc.title}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        deleteDocMutation.mutate(doc.id);
      },
      reject: () => {
        return
      }
    });
  };
  const handleGenerateSummary = (id: string) => {
    setSummaryModalVisible(true);
    setGeneratedSummary(null);
    generateSummaryMutation.mutate(id, {
      onSuccess: (data) => {
        setGeneratedSummary(data.summary);
      },
      onError: (err) => {
        setGeneratedSummary("Error generating summary.");
      },
    });
  };
  return (
    <div className="dashboard-page">
      <h1>Your Documents</h1>
      <div className="button-wrapper">
        <Button
          label="Add New Document"
          icon="pi pi-plus"
          onClick={() => {
            setSelectedDoc(null);
            setDialogVisible(true);
          }}
        />
      </div>
      <NexaTable
        documents={documents}
        onGenerateSummary={handleGenerateSummary}
        onEdit={(doc) => {
          setSelectedDoc(doc)
          setDialogVisible(true)
        }}
        onDelete={handleDelete}
      />
      <DocumentDialog
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        mode={selectedDoc ? "edit" : "create"}
        initialData={selectedDoc}
        onSubmit={(data) => {
          if (selectedDoc) {
            updateDocMutation.mutate(
              { id: selectedDoc.id, ...data },
              {
                onSuccess: () => {
                  setDialogVisible(false);
                  setSelectedDoc(null);
                },
                onError: (err: any) => {
                  console.error("Update failed:", err.message);
                },
              }
            );
          } else {
            createDocMutation.mutate(data, {
              onSuccess: () => {
                console.log("Document created successfully");
                setDialogVisible(false);

              },
              onError: (error) => {
                console.error("Failed to create document:", error.message);
              },
            });
          }
        }} />
      <SummaryModal
        visible={summaryModalVisible}
        onHide={() => setSummaryModalVisible(false)}
        summary={generatedSummary}
        loading={generateSummaryMutation.isPending}
      />
      <ConfirmDialog />
    </div>
  );
}
