import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import FloatingWidgets from "@/components/site/FloatingWidgets";
import BankPartners from "@/components/site/BankPartners";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <BankPartners />
      <Footer />
      <FloatingWidgets />
    </>
  );
}
