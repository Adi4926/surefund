import type { Metadata } from "next";
import SplashScreen from "@/components/site/SplashScreen";
import "./globals.css";

export const metadata: Metadata = {
  title: "SureFund Financial Services | Funding Dreams. Building Futures.",
  description:
    "SureFund Financial Services — Personal Loans, Business Loans & Credit Cards with fast processing and trusted assistance. Based in Lucknow, Uttar Pradesh.",
  keywords: [
    "personal loan Lucknow",
    "business loan Lucknow",
    "credit card DSA",
    "SureFund Financial Services",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
