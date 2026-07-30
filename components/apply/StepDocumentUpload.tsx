"use client";

import { FileCheck2, UploadCloud } from "lucide-react";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

export interface ApplyDocuments {
  pan: File | null;
  aadhaar: File | null;
}

export default function StepDocumentUpload({
  documents,
  onChange,
  error,
  fileErrors,
  onFileError,
}: {
  documents: ApplyDocuments;
  onChange: (patch: Partial<ApplyDocuments>) => void;
  error: string;
  fileErrors: { pan: string; aadhaar: string };
  onFileError: (patch: Partial<{ pan: string; aadhaar: string }>) => void;
}) {
  function handleFile(key: keyof ApplyDocuments, file: File | null) {
    if (!file) {
      onFileError({ [key]: "" });
      return onChange({ [key]: null });
    }
    if (!ALLOWED.includes(file.type)) {
      onFileError({ [key]: "Only PDF, JPG, and PNG files are allowed" });
      onChange({ [key]: null });
      return;
    }
    if (file.size > MAX_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      onFileError({ [key]: `File is ${sizeMB}MB — must be under 5MB` });
      onChange({ [key]: null });
      return;
    }
    onFileError({ [key]: "" });
    onChange({ [key]: file });
  }

  const slots: { key: keyof ApplyDocuments; label: string }[] = [
    { key: "pan", label: "PAN Card" },
    { key: "aadhaar", label: "Aadhaar Card" },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary">Document Upload</h2>
      <p className="text-sm text-primary/50">
        Upload clear copies of your PAN and Aadhaar cards. PDF, JPG, or PNG — max 5MB each.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {slots.map(({ key, label }) => (
          <div key={key}>
            <label
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
                fileErrors[key]
                  ? "border-red-400 hover:border-red-500"
                  : "border-primary/15 hover:border-secondary/40"
              }`}
            >
              {documents[key] ? (
                <>
                  <FileCheck2 className="text-emerald-500" size={28} />
                  <span className="text-sm font-medium text-primary">{label} selected</span>
                  <span className="text-xs text-primary/40">{documents[key]?.name}</span>
                </>
              ) : (
                <>
                  <UploadCloud className="text-primary/30" size={28} />
                  <span className="text-sm font-medium text-primary">Upload {label}</span>
                  <span className="text-xs text-primary/40">Click to browse</span>
                </>
              )}
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => handleFile(key, e.target.files?.[0] || null)}
              />
            </label>
            {fileErrors[key] && (
              <p className="mt-1 text-xs text-red-500">{fileErrors[key]}</p>
            )}
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}