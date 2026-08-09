import type { Metadata } from "next";
import SuccessContentWrapper from "./SuccessContent";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ApplySuccessPage() {
  return <SuccessContentWrapper />;
}