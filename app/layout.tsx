import type { Metadata, Viewport } from "next";
import Script from "next/script";
import SplashScreen from "@/components/site/SplashScreen";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://surefund.in"),

  title: {
    default:
      "SureFund Financial Services - Personal Loan, Business Loan & Credit Card Assistance",
    template: "%s | SureFund",
  },

  description:
    "Get Personal Loans, Business Loans, Home Loans and Credit Card assistance with fast processing, expert guidance and and 25+ bank partners.",

  keywords: [
    "Personal Loan",
    "Business Loan",
    "Home Loan",
    "Credit Card",
    "Loan Consultant",
    "Financial Services",
    "Loan Agency",
    "Personal Loan Lucknow",
    "Business Loan Lucknow",
    "SureFund",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://surefund.in",
    siteName: "SureFund",

    title:
      "SureFund Financial Services | Personal Loans, Business Loans & Credit Cards",

    description:
      "Get fast Personal Loans, Business Loans, Home Loans and Credit Card assistance with trusted financial experts.",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SureFund Financial Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SureFund Financial Services",
    description:
      "Personal Loans, Business Loans, Home Loans & Credit Card Assistance.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "Finance",
};

// ── मोबाइल पर अनचाहे ज़ूम-इन/ज़ूम-आउट और साइड स्क्रॉल को रोकने के लिए ──
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0F172A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",

    name: "SureFund",

    legalName: "SureFund Financial Services Pvt. Ltd.",

    url: "https://surefund.in",

    logo: "https://surefund.in/logo.png",

    image: "https://surefund.in/og-image.jpg",

    description:
      "SureFund Financial Services Pvt. Ltd. provides Personal Loans, Business Loans, Home Loans and Credit Card assistance.",

    telephone: "+91-6306757612", // ⚠️ apna actual business number daal do

    email: "support@surefund.in", // ⚠️ apna actual support email confirm kar lo

    priceRange: "₹₹",

    areaServed: {
      "@type": "Country",
      name: "India",
    },

    address: {
      "@type": "PostalAddress",
      streetAddress: "2/26, 2nd Floor, Ruchi Khand 1, Sharda Nagar, Lucknow, Uttar Pradesh 226012", // ⚠️ actual address daal do
      addressLocality: "Lucknow",
      addressRegion: "Uttar Pradesh",
      postalCode: "226012",
      addressCountry: "IN",
    },

    openingHours: "Mo-Sa 09:00-18:00",

    sameAs: [
      // ⚠️ jo active na ho use hata do
      "https://www.instagram.com/surefund.in",
      "https://www.linkedin.com/company/surefund-financial-services-pvt-ltd/",
     
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",

    name: "SureFund",

    url: "https://surefund.in",

    publisher: {
      "@type": "Organization",
      name: "SureFund Financial Services Pvt. Ltd.",
    },
  };

  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden max-w-[100vw] relative bg-background text-white font-body antialiased">
        <Script
          id="financial-service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(financialServiceSchema),
          }}
        />

        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        <SplashScreen />

        {children}
      </body>
    </html>
  );
}