
"use client";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import "./summarymodal.scss"

export default function SummaryModal({
    visible,
    onHide,
    summary,
    loading,
}: {
    visible: boolean;
    onHide: () => void;
    summary: string | null;
    loading: boolean;
}) {
    
    return (
        <Dialog header="Generated Summary" visible={visible} onHide={onHide} className="summary-dialogue">
            {loading ? (
                <div className="spinner-wrapper" >
                    <ProgressSpinner />
                </div>
            ) : (
                <p>{summary}</p>
            )}
        </Dialog>
    );
}
