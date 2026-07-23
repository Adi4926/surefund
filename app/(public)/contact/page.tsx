"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import ContactForm from "@/components/site/ContactForm";

const contactDetails = [
  {
    icon: MapPin,
    title: "Office Address",
    value: "infront of croma store, 2/26, 2nd Floor, Ruchi Khand 1, Sharda Nagar, Lucknow, Uttar Pradesh 226012",
    href: null,
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 1234567890",
    href: "tel:+911234567890",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+91 1234567890",
    href: "https://wa.me/911234567890",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@surefund.in",
    href: "mailto:info@surefund.in",
  },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-20 font-sans text-white">
      
      {/* --- HEADER SECTION --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-16 max-w-2xl px-4 text-center sm:px-6 lg:px-8"
      >
        <span className="mb-6 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-yellow-400 backdrop-blur-xl">
          Support & Queries
        </span>
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          Get In <span className="text-blue-400">Touch</span>
        </h1>
        <p className="text-lg leading-relaxed text-white/60">
          Have a question about a loan or credit card? Reach out — we're happy to help.
        </p>
      </motion.div>

      {/* --- CONTACT GRID SECTION --- */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          
          {/* Left Side: Contact Form Wrapper */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10 shadow-[0_0_40px_rgba(59,130,246,0.1)]"
          >
            {/* 
              Note: You might need to update your <ContactForm /> component internally 
              to match the dark theme (e.g., inputs with bg-white/10, text-white, etc.)
            */}
            <ContactForm />
          </motion.div>

          {/* Right Side: Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6"
          >
            {contactDetails.map((detail, index) => {
              const CardWrapper = detail.href ? "a" : "div";
              return (
                <CardWrapper
                  key={index}
                  href={detail.href || undefined}
                  target={detail.title === "WhatsApp" ? "_blank" : undefined}
                  rel={detail.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-white/10 hover:shadow-[0_15px_40px_-10px_rgba(59,130,246,0.25)]"
                >
                  {/* Icon Box */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/20 text-yellow-400 transition-colors duration-300 group-hover:bg-yellow-400 group-hover:text-blue-900">
                    <detail.icon size={24} />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <p className="mb-1 text-lg font-bold text-white transition-colors duration-300 group-hover:text-blue-400">
                      {detail.title}
                    </p>
                    <p className="text-sm leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/90">
                      {detail.value}
                    </p>
                  </div>
                </CardWrapper>
              );
            })}
          </motion.div>
          
        </div>
      </div>

    </div>
  );
}