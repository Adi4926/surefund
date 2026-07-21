import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import FloatingWidgets from "@/components/site/FloatingWidgets";
import BankPartners from "@/components/site/BankPartners";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-primary" />
      <Navbar />
      {children}
      <BankPartners />
      <Footer />
      <FloatingWidgets />
    </>
  );
}