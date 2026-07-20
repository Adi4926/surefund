import LegalPageLayout from "@/components/site/LegalPageLayout";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updatedDate="July 2026">
      <section>
        <h2 className="mb-2 text-lg font-semibold text-primary">1. Information We Collect</h2>
        <p>
          When you use SureFund Financial Services (&quot;SureFund&quot;, &quot;we&quot;,
          &quot;us&quot;), we collect information you provide directly, including your
          name, mobile number, email, date of birth, city, PAN, employment or business
          details, income, and identity documents (PAN card, Aadhaar card) submitted
          during a loan or credit card application, as well as free CIBIL check
          requests.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold text-primary">2. How We Use Your Information</h2>
        <p>
          We use your information to evaluate loan and credit card eligibility, connect
          you with our banking and NBFC partners, process your application, communicate
          updates on your application status, and improve our services. We do not sell
          your personal information to third parties.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold text-primary">3. Document Storage</h2>
        <p>
          Identity documents you upload (PAN, Aadhaar) are stored securely with our
          cloud storage provider and are accessible only to authorized SureFund
          personnel and the lending partner processing your specific application.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold text-primary">4. Sharing With Partners</h2>
        <p>
          To process your loan or credit card application, we share relevant
          application details and documents with the specific bank or NBFC partner you
          are being matched with. These partners are bound by their own privacy and
          data-protection obligations.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold text-primary">5. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal data
          by contacting us at info@surefund.in. Certain data may need to be retained to
          comply with regulatory or legal obligations.
        </p>
      </section>
      <section>
        <h2 className="mb-2 text-lg font-semibold text-primary">6. Contact Us</h2>
        <p>
          For any privacy-related questions, reach us at info@surefund.in or +91
          1234567890, or visit us at 2nd Floor, Hazratganj, Lucknow, Uttar Pradesh
          226001, India.
        </p>
      </section>
    </LegalPageLayout>
  );
}
