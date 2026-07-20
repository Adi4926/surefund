"use client";

import Link from "next/link";
import { CheckCircle2, CreditCard, Home, Car, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const services = [
    {
      title: "Personal Loan",
      description: "Quick personal loans for all your needs",
      icon: <CreditCard className="w-8 h-8 text-blue-700" />,
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
      title: "Home Loan",
      description: "Affordable home loans for your dream house",
      icon: <Home className="w-8 h-8 text-blue-700" />,
      stats: [
        { label: "Loan Amount:", value: "Up to ₹5 Crores" },
        { label: "Interest Rate:", value: "Starting from 8.75%" },
        { label: "Tenure:", value: "5-30 years" }
      ],
      features: [
        "Low Interest Rates",
        "High Loan Amount",
        "Tax Benefits",
        "Balance Transfer Option"
      ],
      link: "/home-loan"
    },
    {
      title: "Car Loan & Used Car Loan",
      description: "Drive your dream car with easy financing",
      icon: <Car className="w-8 h-8 text-blue-700" />,
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
      title: "Loan Against Property (LAP)",
      description: "Unlock the value of your property for financial needs",
      icon: <Building2 className="w-8 h-8 text-blue-700" />,
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
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-24 pb-20 font-sans overflow-hidden">
      
      {/* --- OUR SERVICES HEADER SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }} // once: false kar diya
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Our <span className="text-blue-700">Services</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          At SureFund, we provide a wide range of financial services to meet your personal and business needs. Whether you are looking for a personal loan, home loan, business loan, or loan against property, our expert team is here to guide you at every step.
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
              viewport={{ once: false, margin: "-50px" }} // once: false kar diya
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full" // Sirf motion ke liye outer div
            >
              {/* Inner div jis par ab hover animation theek se kaam karega */}
              <div className="h-full group bg-white/90 backdrop-blur-md border border-gray-200/80 rounded-2xl p-7 flex flex-col transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(29,78,216,0.2)] hover:border-blue-300 hover:bg-white">
                
                {/* Icon & Header */}
                <div className="mb-4">
                  <div className="w-16 h-16 bg-blue-50/80 rounded-2xl flex items-center justify-center border border-blue-100/50 mb-6 group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm h-10 mb-4">{service.description}</p>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  {service.stats.map((stat, i) => (
                    <div key={i} className="flex justify-between text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                      <span className="text-gray-500">{stat.label}</span>
                      <span className="text-blue-700 font-semibold text-right max-w-[120px]">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* Key Features */}
                <div className="mb-8 flex-grow">
                  <h4 className="font-bold text-gray-900 mb-4">Key Features:</h4>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Apply Button */}
                <Link 
                  href={service.link} 
                  className="w-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 font-semibold py-3.5 rounded-xl text-center transition-all duration-300 mt-auto"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- SIMPLE APPLICATION PROCESS SECTION --- */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-gray-200 pt-20">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} // once: false
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
        >
          Simple <span className="text-blue-700">Application Process</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }} // once: false
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-600 max-w-3xl mx-auto mb-16 text-lg"
        >
          Get your loan approved in just 4 easy steps. Our streamlined process ensures quick approval and hassle-free experience.
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-gray-200 -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }} // once: false
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center group"
              >
                {/* Number Circle with Hover Effect */}
                <div className="w-24 h-24 bg-blue-600 text-white text-2xl font-bold rounded-full flex items-center justify-center mb-6 shadow-md z-10 border-4 border-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-700">
                  {step.num}
                </div>
                
                {/* Text Content */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm px-4">
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