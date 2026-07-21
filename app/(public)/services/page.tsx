"use client";

import Link from "next/link";
import { CheckCircle2, CreditCard, Briefcase, Car, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const services = [
    {
      title: "Personal Loan",
      description: "Quick personal loans for all your needs",
      icon: <CreditCard className="w-8 h-8 text-accent" />,
      stats: [
        { label: "Loan Amount:", value: "Up to ₹5 Crores" },
        { label: "Interest Rate:", value: "Starting from 9.99%" },
        { label: "Tenure:", value: "12-60 months" }
      ],
      features: [
        "Instant Approval",
        "Minimal Documentation",
        "Flexible EMI",
        "No Collateral Required"
      ],
      link: "/personal-loan"
    },
    {
      title: "Business Loan",
      description: "Collateral-free working capital to fuel your business growth",
      icon: <Briefcase className="w-8 h-8 text-accent" />,
      stats: [
        { label: "Business Age:", value: "1 year+" },
        { label: "Annual Turnover:", value: "₹5 Lakh+" },
        { label: "Tenure:", value: "12-60 months" }
      ],
      features: [
        "Flexible loan amounts based on turnover",
        "Support for self-employed & owners",
        "Faster approvals through partner network",
        "Guidance on right documentation"
      ],
      link: "/business-loan"
    },
    {
      title: "Car Loan & Used Car",
      description: "Drive your dream car with easy financing",
      icon: <Car className="w-8 h-8 text-accent" />,
      stats: [
        { label: "Loan Amount:", value: "Up to ₹1 Crore" },
        { label: "Interest Rate:", value: "Starting from 7.50%" },
        { label: "Tenure:", value: "12-84 months" }
      ],
      features: [
        "Up to 90% Financing",
        "Quick Processing",
        "New & Used Cars",
        "Insurance Assistance"
      ],
      link: "/car-loan"
    },
    {
      title: "Loan Against Property",
      description: "Unlock the value of your property for financial needs",
      icon: <Building2 className="w-8 h-8 text-accent" />,
      stats: [
        { label: "Loan Amount:", value: "Up to ₹5 Crores" },
        { label: "Interest Rate:", value: "Starting from 8.75%" },
        { label: "Tenure:", value: "5-20 years" }
      ],
      features: [
        "Low Interest Rates",
        "High Loan Amount",
        "Flexible Repayment",
        "Quick Processing"
      ],
      link: "/lap"
    }
  ];

  const steps = [
    { num: "01", title: "Apply Online", desc: "Fill Out Our Simple Online Application Form" },
    { num: "02", title: "Document Upload", desc: "Upload Required Documents Through Our Secure Portal" },
    { num: "03", title: "Verification", desc: "Our Team Verifies Your Application and Documents" },
    { num: "04", title: "Approval", desc: "Get Instant Approval and Loan Amount in Your Account" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-20 font-sans text-white">
      
      {/* --- OUR SERVICES HEADER SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
          Our <span className="text-accent">Services</span>
        </h1>
        <p className="text-lg md:text-xl text-white/70 leading-relaxed">
          At SureFund, we provide a wide range of financial services to meet your personal and business needs. Whether you are looking for a personal loan, business loan, car loan, or loan against property, our expert team is here to guide you at every step.
        </p>
      </motion.div>

      {/* --- SERVICES GRID SECTION --- */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              {/* Premium Glassmorphism Card */}
              <div className="h-full group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-7 flex flex-col transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_25px_50px_-12px_rgba(124,58,237,0.3)] hover:border-accent/40 hover:bg-white/10">
                
                {/* Icon & Header */}
                <div className="mb-4">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 mb-6 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-sm h-10 mb-4">{service.description}</p>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  {service.stats.map((stat, i) => (
                    <div key={i} className="flex justify-between text-sm border-b border-white/10 pb-2 last:border-0 last:pb-0">
                      <span className="text-white/50">{stat.label}</span>
                      <span className="text-accent font-semibold text-right max-w-[120px]">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* Key Features */}
                <div className="mb-8 flex-grow">
                  <h4 className="font-bold text-white mb-4">Key Features:</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-white/70 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-accent mr-3 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Apply Button */}
                <Link 
                  href={service.link} 
                  className="w-full bg-white/5 text-white border border-white/20 hover:bg-accent hover:border-accent font-semibold py-3.5 rounded-xl text-center transition-all duration-300 mt-auto shadow-lg hover:shadow-accent/25"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- SIMPLE APPLICATION PROCESS SECTION --- */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-white/10 pt-20">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-white"
        >
          Simple <span className="text-accent">Application Process</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-white/60 max-w-3xl mx-auto mb-16 text-lg"
        >
          Get your loan approved in just 4 easy steps. Our streamlined process ensures quick approval and hassle-free experience.
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-white/10 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center group"
              >
                {/* Premium Glow Number Circle */}
                <div className="w-24 h-24 bg-accent/10 text-accent text-2xl font-bold rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(124,58,237,0.2)] z-10 border border-accent/30 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/20">
                  {step.num}
                </div>
                
                {/* Text Content */}
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-white/60 text-sm px-4">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}