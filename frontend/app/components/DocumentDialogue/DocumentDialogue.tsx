"use client";

import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Chips } from "primereact/chips";
import { useState, useEffect } from "react";
import "./DocumentDialogue.scss"

interface DocumentDialogProps {
    visible: boolean;
    onHide: () => void;
    onSubmit: (data: {
        title: string;
        description: string;
        tags: string[];
        summary?: string;
    }) => void;
    mode: "create" | "edit";
    initialData?: {
        title: string;
        description: string;
        tags: string[];
        summary?: string;
    };
}

export default function DocumentDialog({
    visible,
    onHide,
    onSubmit,
    mode,
    initialData,
}: DocumentDialogProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [summary, setSummary] = useState("");

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
            setTags(initialData.tags || []);
            setSummary(initialData.summary || "");
        } else {
            setTitle("");
            setDescription("");
            setTags([]);
            setSummary("");
        }
    }, [initialData, mode, visible]);

    const handleSubmit = () => {
        onSubmit({ title, description, tags, summary });
        onHide();
    };

    return (
        <div className="dialogue-wrapper">
            <Dialog
                header={mode === "edit" ? "Edit Document" : "Create Document"}
                visible={visible}
                onHide={onHide}
                style={{ borderRadius: '90px', }}
                modal
                className="custom-dialog"
            >
                <div className="field">
                    <label htmlFor="title">Title</label>
                    <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea
                        id="description"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label htmlFor="tags">Tags</label>
                    <Chips
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.value ?? [])}
                    />
                </div>

                <div className="field">
                    <label htmlFor="summary">Summary (optional)</label>
                    <InputTextarea
                        id="summary"
                        rows={3}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    />
                </div>

                <div className="buttons-wrapper">
                    <Button label="Cancel" icon="pi pi-times" onClick={onHide} className="p-button-text" />
                    <Button
                        label={mode === "edit" ? "Update" : "Create"}
                        icon="pi pi-check"
                        onClick={handleSubmit}
                    />
                </div>
            </Dialog>
        </div>
    );
}
