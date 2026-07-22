import LegalPageLayout from "@/components/site/LegalPageLayout";

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title="Disclaimer" updatedDate="July 2026">
      <div className="space-y-8 text-white/80">
        
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <p className="leading-relaxed text-sm md:text-base text-white/70">
            SureFund Financial Services Pvt. Ltd. is a loan Direct Selling Agent (DSA)
            and is not a bank or NBFC. We do not sanction, disburse, or service loans or
            credit cards directly — all such decisions rest solely with our partner
            banks and NBFCs (including but not limited to HDFC Bank, ICICI Bank, Axis
            Bank, SBI, Kotak Mahindra Bank, IDFC First Bank, IndusInd Bank, Bajaj
            Finserv, and Tata Capital).
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <p className="leading-relaxed text-sm md:text-base text-white/70">
            Interest rates, processing fees, tenure, and eligibility criteria mentioned
            on this website are indicative and subject to change at the discretion of
            the respective lending partner. Actual terms offered to you may vary based
            on your credit profile and the lender's internal policies at the time of
            application.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <p className="leading-relaxed text-sm md:text-base text-white/70">
            The free CIBIL check offered on this website is intended to give you an
            indicative view of your credit standing and does not guarantee loan or card
            approval. A soft inquiry does not impact your credit score; however, any
            subsequent formal application by a lender may involve a hard inquiry as per
            that lender's process.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <p className="leading-relaxed text-sm md:text-base text-white/70">
            The EMI calculator on this website provides an illustrative estimate only,
            based on the values you enter, and should not be treated as a formal loan
            offer or quote.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <p className="leading-relaxed text-sm md:text-base text-white/70">
            For any grievance regarding a loan or credit card sanctioned through
            SureFund, please contact us at{" "}
            <span className="text-yellow-400 font-medium">info@surefund.in</span> and we will assist in
            escalating the matter to the concerned lending partner.
          </p>
        </section>

      </div>
    </LegalPageLayout>
  );
}