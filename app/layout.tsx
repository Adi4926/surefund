import type { Metadata } from "next";
import SplashScreen from "@/components/site/SplashScreen";
import Script from "next/script";
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
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialServices",
              name: "SureFund",
              legalName: "SureFund Financial Services Pvt Ltd",
              url: "https://surefund.in",
              logo: "https://surefund.in/logo.svg",
              description:
                "SureFund Financial Services Pvt Ltd is a registered financial consultant in India providing personal loans, business loans, and credit cards.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
            }),
          }}
        />
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
