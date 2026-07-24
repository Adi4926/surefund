import LegalPageLayout from "@/components/site/LegalPageLayout";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updatedDate="July 2026">
      <div className="space-y-8 text-white/80">
        
        {/* Intro Section */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <p className="leading-relaxed text-sm md:text-base text-white/70">
            SureFund Financial Services Pvt. Ltd. (&quot;SureFund&quot;, &quot;we&quot;, &quot;us&quot;) values your trust. This Privacy Policy outlines how we collect, use, and protect your personal data when you use our website or services.
          </p>
        </div>

        {/* Section 1 */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <h2 className="mb-4 text-lg font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">1.</span> Information We Collect
          </h2>
          <p className="text-sm md:text-base text-white/70 mb-3">
            We collect personal and financial information that you provide directly during loan, credit card, or CIBIL check requests:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-white/70 pl-2">
            <li><strong className="text-white">Personal Details:</strong> Name, date of birth, city, mobile number, and email address.</li>
            <li><strong className="text-white">Financial & Business Details:</strong> Income, employment status, turnover, and business information.</li>
            <li><strong className="text-white">Identity Documents:</strong> PAN card, Aadhaar card, and other verification documents required for loan processing.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <h2 className="mb-4 text-lg font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">2.</span> How We Use Your Information
          </h2>
          <p className="text-sm md:text-base text-white/70 mb-3">
            Your information is utilized solely for legitimate business and service delivery purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-white/70 pl-2">
            <li>Evaluating your loan or credit card eligibility across various financial products.</li>
            <li>Connecting you with our authorized banking and NBFC partners.</li>
            <li>Communicating application status updates and sending necessary service notifications.</li>
            <li>Improving our website performance, user experience, and customer service standards.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <h2 className="mb-4 text-lg font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">3.</span> Document Storage & Security
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-white/70 pl-2">
            <li>Uploaded identity and financial documents are stored securely using industry-standard cloud storage.</li>
            <li>Access is strictly restricted to authorized SureFund personnel and the specific lending partner handling your application.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <h2 className="mb-4 text-lg font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">4.</span> Sharing With Partners
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-white/70 pl-2">
            <li>To process your credit requests, relevant application details and documents are shared strictly with the matched bank or NBFC partner.</li>
            <li>These partner institutions operate under their own independent privacy and data protection policies.</li>
            <li>We <strong className="text-white">do not</strong> sell, trade, or rent your personal information to third-party marketers.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <h2 className="mb-4 text-lg font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">5.</span> Your Rights & Data Control
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-white/70 pl-2">
            <li>You have the right to request access to, correction of, or deletion of your personal data.</li>
            <li>Certain information may need to be retained to comply with legal, tax, or regulatory obligations.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl shadow-xl">
          <h2 className="mb-4 text-lg font-bold text-white flex items-center gap-2">
            <span className="text-blue-400">6.</span> Contact Us
          </h2>
          <p className="text-sm md:text-base text-white/70 mb-3">
            For any privacy-related inquiries, data requests, or grievances, you can reach out to us:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-white/70 pl-2">
            <li><strong className="text-white">Email:</strong> <span className="text-yellow-400">info@surefund.in</span></li>
            <li><strong className="text-white">Phone:</strong> <span className="text-yellow-400">+91 1234567890</span></li>
            <li><strong className="text-white">Address:</strong> 2/26, 2nd Floor, Ruchi Khand 1, Sharda Nagar, Lucknow, Uttar Pradesh 226012</li>
          </ul>
        </section>

      </div>
    </LegalPageLayout>
  );
}