"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export default function AdditionalDocumentUpload({
  applicationId,
}: {
  applicationId: string;
}) {
  const router = useRouter();
  const [type, setType] = useState<"PAN" | "Aadhaar" | "Other">("Other");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    setError("");
    setSuccess(false);
    if (!f) return;
    if (!ALLOWED.includes(f.type)) {
      setError("Only PDF, JPG, and PNG files are allowed");
      return;
    }
    if (f.size > MAX_SIZE) {
      setError("File must be under 5MB");
      return;
    }
    setFile(f);
  }

  async function handleUpload() {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const dataUri = await fileToDataUri(file);
      const res = await fetch(`/api/applications/${applicationId}/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documents: [{ type, dataUri, bytesEstimate: file.size }],
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setSuccess(true);
      setFile(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-primary/5 bg-white p-5 shadow-card">
      <div className="mb-3 flex items-center gap-2">
        <UploadCloud size={18} className="text-accent" />
        <h3 className="font-heading font-semibold text-primary">
          Upload Additional Document
        </h3>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as typeof type)}
          className="rounded-xl border border-primary/10 px-3 py-2.5 text-sm outline-none focus:border-secondary"
        >
          <option value="PAN">PAN Card</option>
          <option value="Aadhaar">Aadhaar Card</option>
          <option value="Other">Other Document</option>
        </select>

        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="flex-1 rounded-xl border border-primary/10 px-3 py-2 text-sm outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-secondary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white"
        />

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <p className="mt-2 text-xs text-primary/40">PDF, JPG, or PNG — max 5MB</p>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      {success && (
        <p className="mt-2 text-sm text-emerald-600">Document uploaded successfully.</p>
      )}
    </div>
  );
}
