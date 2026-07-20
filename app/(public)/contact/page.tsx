import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import ContactForm from "@/components/site/ContactForm";

export default function ContactPage() {
  return (
    <main className="section">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">Contact Us</h1>
        <p className="mt-3 text-primary/60">
          Have a question about a loan or credit card? Reach out — we're happy to help.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2">
        <ContactForm />

        <div className="space-y-5">
          <div className="glass-card flex items-start gap-3 p-5">
            <MapPin className="mt-0.5 shrink-0 text-secondary" size={22} />
            <div>
              <p className="font-semibold text-primary">Office Address</p>
              <p className="text-sm text-primary/60">
                2nd Floor, Hazratganj, Lucknow, Uttar Pradesh 226001, India
              </p>
            </div>
          </div>
          <div className="glass-card flex items-start gap-3 p-5">
            <Phone className="mt-0.5 shrink-0 text-secondary" size={22} />
            <div>
              <p className="font-semibold text-primary">Phone</p>
              <a href="tel:+911234567890" className="text-sm text-primary/60">
                +91 1234567890
              </a>
            </div>
          </div>
          <div className="glass-card flex items-start gap-3 p-5">
            <MessageCircle className="mt-0.5 shrink-0 text-secondary" size={22} />
            <div>
              <p className="font-semibold text-primary">WhatsApp</p>
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary/60"
              >
                +91 1234567890
              </a>
            </div>
          </div>
          <div className="glass-card flex items-start gap-3 p-5">
            <Mail className="mt-0.5 shrink-0 text-secondary" size={22} />
            <div>
              <p className="font-semibold text-primary">Email</p>
              <a href="mailto:info@surefund.in" className="text-sm text-primary/60">
                info@surefund.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
