import type { Metadata } from "next";
import ApplyWizardContent from "./ApplyWizardContent";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ApplyWizardPage() {
  return <ApplyWizardContent />;
}