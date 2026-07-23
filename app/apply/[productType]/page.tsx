"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notFound, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { slugToProductType } from "@/lib/productSlug";
import {
  ApplyDraft,
  EMPTY_DRAFT,
  loadDraft,
  saveDraft,
  clearDraft,
} from "@/lib/applyFormStorage";
import ProgressBar from "@/components/apply/ProgressBar";
import StepPersonalDetails from "@/components/apply/StepPersonalDetails";
import StepEmploymentDetails from "@/components/apply/StepEmploymentDetails";
import StepLoanDetails from "@/components/apply/StepLoanDetails";
import StepDocumentUpload, { ApplyDocuments } from "@/components/apply/StepDocumentUpload";
import StepReview from "@/components/apply/StepReview";

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export default function ApplyWizardPage() {
  const router = useRouter();
  const params = useParams<{ productType: string }>();
  const slug = params.productType;
  const productType = slugToProductType(slug);

  const [data, setData] = useState<ApplyDraft>(EMPTY_DRAFT);
  const [documents, setDocuments] = useState<ApplyDocuments>({ pan: null, aadhaar: null });
  const [docError, setDocError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!productType) return;
    setData(loadDraft(slug));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (!hydrated || !productType) return;
    saveDraft(slug, data);
  }, [data, hydrated, slug, productType]);

  if (!productType) {
    notFound();
  }

  function updateData(patch: Partial<ApplyDraft>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  function goToStep(step: number) {
    updateData({ step });
  }

  function validateCurrentStep(): string {
    if (data.step === 1) {
      if (!data.fullName || !data.mobile || !data.email) {
        return "Please fill in your name, mobile number, and email.";
      }
    }
    if (data.step === 3) {
      if (!data.loanAmount) return "Please enter the amount you're requesting.";
    }
    if (data.step === 4) {
      if (!documents.pan || !documents.aadhaar) {
        return "Please upload both your PAN and Aadhaar card.";
      }
    }
    return "";
  }

  function handleNext() {
    const err = validateCurrentStep();
    if (err) {
      setDocError(data.step === 4 ? err : "");
      if (data.step !== 4) alert(err);
      return;
    }
    setDocError("");
    goToStep(Math.min(data.step + 1, 5));
  }

  function handleBack() {
    goToStep(Math.max(data.step - 1, 1));
  }

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError("");
    try {
      const leadPayload: Record<string, unknown> = {
        productType,
        fullName: data.fullName,
        mobile: data.mobile,
        email: data.email,
        dob: data.dob || undefined,
        city: data.city || undefined,
        pan: data.pan || undefined,
        loanAmount: Number(data.loanAmount),
        cibilScore: data.cibilScore ? Number(data.cibilScore) : undefined,
        existingEmi: data.existingEmi ? Number(data.existingEmi) : undefined,
        existingLoan: data.existingLoan,
      };

      if (productType === "Business Loan") {
        leadPayload.companyName = data.companyName || undefined;
        leadPayload.businessAgeYears = data.businessAgeYears
          ? Number(data.businessAgeYears)
          : undefined;
        leadPayload.annualTurnover = data.annualTurnover
          ? Number(data.annualTurnover)
          : undefined;
      } else {
        leadPayload.employmentType = data.employmentType || undefined;
        leadPayload.companyName = data.companyName || undefined;
        leadPayload.designation = data.designation || undefined;
        leadPayload.monthlyIncome = data.monthlyIncome
          ? Number(data.monthlyIncome)
          : undefined;
        leadPayload.workExperienceYears = data.workExperienceYears
          ? Number(data.workExperienceYears)
          : undefined;
      }

      const leadRes = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });
      const leadData = await leadRes.json();
      if (!leadRes.ok) throw new Error(leadData.error || "Failed to submit application");

      const [panDataUri, aadhaarDataUri] = await Promise.all([
        fileToDataUri(documents.pan as File),
        fileToDataUri(documents.aadhaar as File),
      ]);

      const appRes = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: leadData.leadId,
          productType,
          loanAmount: Number(data.loanAmount),
          documents: [
            { type: "PAN", dataUri: panDataUri, bytesEstimate: (documents.pan as File).size },
            {
              type: "Aadhaar",
              dataUri: aadhaarDataUri,
              bytesEstimate: (documents.aadhaar as File).size,
            },
          ],
        }),
      });
      const appData = await appRes.json();
      if (!appRes.ok) throw new Error(appData.error || "Failed to upload documents");

      clearDraft(slug);
      router.push(`/apply/success?ref=${appData.applicationId}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* Solid White Container Layout with Dynamic Title */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Apply for <span className="text-blue-600">{productType}</span>
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Complete the steps below to process your request smoothly.
        </p>
      </div>

      <ProgressBar currentStep={data.step} />

      <div className="rounded-2xl border border-primary/5 bg-white p-6 shadow-card md:p-8 mt-6">
        {data.step === 1 && <StepPersonalDetails data={data} onChange={updateData} />}
        {data.step === 2 && (
          <StepEmploymentDetails data={data} onChange={updateData} productType={productType} />
        )}
        {data.step === 3 && (
          <StepLoanDetails data={data} onChange={updateData} productType={productType} />
        )}
        {data.step === 4 && (
          <StepDocumentUpload
            documents={documents}
            onChange={(patch) => setDocuments((prev) => ({ ...prev, ...patch }))}
            error={docError}
          />
        )}
        {data.step === 5 && (
          <StepReview data={data} documents={documents} productType={productType} />
        )}

        {submitError && <p className="mt-4 text-sm text-red-500">{submitError}</p>}

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={data.step === 1 || submitting}
            className="flex items-center gap-1 rounded-xl px-4 py-2.5 text-sm font-medium text-primary/60 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={16} /> Back
          </button>

          {data.step < 5 ? (
            <button onClick={handleNext} className="btn-primary flex items-center gap-1">
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-accent flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}