import type { Metadata } from "next";
import SplashScreen from "@/components/site/SplashScreen";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "SureFund Financial Services | Get instant Personal Loans, Business Loans",
  description:
    "SureFund Financial Services Pvt. Ltd. — Personal Loans, Business Loans & Credit Cards with fast processing and trusted assistance. Based in Lucknow, Uttar Pradesh.",
  keywords: [
    "personal loan Lucknow",
    "business loan Lucknow",
    "credit card DSA",
    "SureFund Financial Services",
  ],
  alternates: {
    canonical: "https://surefund.in",
  },
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
                addressLocality: "Lucknow",
                addressRegion: "Uttar Pradesh",
                postalCode: "226012",
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
