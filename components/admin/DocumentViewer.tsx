import { FileText, Image as ImageIcon, ExternalLink } from "lucide-react";
import { formatDateTime } from "@/lib/format";

interface DocumentItem {
  type: string;
  url: string;
  format: string;
  bytes: number;
  uploadedAt: string;
}

export default function DocumentViewer({ documents }: { documents: DocumentItem[] }) {
  return (
    <div className="rounded-2xl border border-primary/5 bg-white p-5 shadow-card">
      <h3 className="mb-4 font-heading font-semibold text-primary">
        Uploaded Documents
      </h3>

      {documents.length === 0 && (
        <p className="py-4 text-center text-sm text-primary/40">
          No documents uploaded yet.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {documents.map((doc, i) => {
          const isImage = ["jpg", "jpeg", "png"].includes(doc.format.toLowerCase());
          return (
            <a
              key={i}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl border border-primary/10 transition-colors hover:border-secondary/40"
            >
              <div className="flex h-40 items-center justify-center bg-background">
                {isImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={doc.url}
                    alt={`${doc.type} document`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FileText size={40} className="text-primary/30" />
                )}
              </div>
              <div className="flex items-center justify-between p-3">
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-medium text-primary">
                    {isImage ? <ImageIcon size={14} /> : <FileText size={14} />}
                    {doc.type}
                  </p>
                  <p className="text-xs text-primary/40">
                    {(doc.bytes / 1024).toFixed(0)} KB • {formatDateTime(doc.uploadedAt)}
                  </p>
                </div>
                <ExternalLink
                  size={16}
                  className="text-primary/30 transition-colors group-hover:text-secondary"
                />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
