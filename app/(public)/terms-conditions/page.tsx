import LegalPageLayout from "@/components/site/LegalPageLayout";

export default function TermsConditionsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions" updatedDate="July 2026">
      <div className="space-y-8 text-white/80">
        
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <h2 className="mb-3 text-lg font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">1.</span> About SureFund
          </h2>
          <p className="leading-relaxed text-sm md:text-base text-white/70">
            SureFund Financial Services Pvt. Ltd. (&quot;SureFund&quot;) operates as a
            loan Direct Selling Agent (DSA), connecting applicants with partner banks and
            NBFCs for personal loans, business loans, and credit cards. SureFund does not
            itself lend money or issue credit cards.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <h2 className="mb-3 text-lg font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">2.</span> Eligibility
          </h2>
          <p className="leading-relaxed text-sm md:text-base text-white/70">
            Eligibility criteria displayed on this website (income, CIBIL score, business
            age, turnover, etc.) are indicative guidelines used for initial screening.
            Final approval, loan amount, interest rate, and terms are solely at the
            discretion of the lending bank or NBFC.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <h2 className="mb-3 text-lg font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">3.</span> Accuracy of Information
          </h2>
          <p className="leading-relaxed text-sm md:text-base text-white/70">
            By submitting an application, you confirm that all information and documents
            provided are true, accurate, and belong to you. Providing false information
            may result in rejection of your application and, where applicable, legal
            consequences.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <h2 className="mb-3 text-lg font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">4.</span> Fees
          </h2>
          <p className="leading-relaxed text-sm md:text-base text-white/70">
            SureFund does not charge applicants for its advisory or application-assistance
            services. Any processing fees, foreclosure charges, or other costs are levied
            directly by the lending partner as per their policy, and disclosed to you by
            that lender.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <h2 className="mb-3 text-lg font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">5.</span> Limitation of Liability
          </h2>
          <p className="leading-relaxed text-sm md:text-base text-white/70">
            SureFund facilitates the application process but is not responsible for the
            lending decision, disbursal timelines, or servicing of the loan/card once
            sanctioned — these remain the responsibility of the respective bank or NBFC.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <h2 className="mb-3 text-lg font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">6.</span> Governing Law
          </h2>
          <p className="leading-relaxed text-sm md:text-base text-white/70">
            These terms are governed by the laws of India, and any disputes shall be
            subject to the jurisdiction of the courts of{" "}
            <span className="text-yellow-400 font-medium">Lucknow, Uttar Pradesh</span>.
          </p>
        </section>

      </div>
    </LegalPageLayout>
  );
}