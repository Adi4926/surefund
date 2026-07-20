import LegalPageLayout from "@/components/site/LegalPageLayout";

export default function TermsConditionsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions" updatedDate="July 2026">
      <section>
        <h2 className="mb-2 text-lg font-semibold text-primary">1. About SureFund</h2>
        <p>
          SureFund Financial Services Pvt. Ltd. (&quot;SureFund&quot;) operates as a
          loan Direct Selling Agent (DSA), connecting applicants with partner banks and
          NBFCs for personal loans, business loans, and credit cards. SureFund does not
          itself lend money or issue credit cards.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold text-primary">2. Eligibility</h2>
        <p>
          Eligibility criteria displayed on this website (income, CIBIL score, business
          age, turnover, etc.) are indicative guidelines used for initial screening.
          Final approval, loan amount, interest rate, and terms are solely at the
          discretion of the lending bank or NBFC.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold text-primary">3. Accuracy of Information</h2>
        <p>
          By submitting an application, you confirm that all information and documents
          provided are true, accurate, and belong to you. Providing false information
          may result in rejection of your application and, where applicable, legal
          consequences.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold text-primary">4. Fees</h2>
        <p>
          SureFund does not charge applicants for its advisory or application-assistance
          services. Any processing fees, foreclosure charges, or other costs are levied
          directly by the lending partner as per their policy, and disclosed to you by
          that lender.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold text-primary">5. Limitation of Liability</h2>
        <p>
          SureFund facilitates the application process but is not responsible for the
          lending decision, disbursal timelines, or servicing of the loan/card once
          sanctioned — these remain the responsibility of the respective bank or NBFC.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold text-primary">6. Governing Law</h2>
        <p>
          These terms are governed by the laws of India, and any disputes shall be
          subject to the jurisdiction of the courts of Lucknow, Uttar Pradesh.
        </p>
      </section>
    </LegalPageLayout>
  );
}
