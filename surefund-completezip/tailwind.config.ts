import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A2540",
          light: "#123a63",
        },
        secondary: {
          DEFAULT: "#2563EB",
          light: "#3b82f6",
        },
        accent: {
          DEFAULT: "#FBBF24",
          light: "#fcd34d",
        },
        background: "#F8FAFC",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(135deg, #0A2540 0%, #123a63 60%, #2563EB 100%)",
        "gradient-accent": "linear-gradient(135deg, #FBBF24 0%, #f59e0b 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(37, 99, 235, 0.35)",
        "glow-accent": "0 0 40px rgba(251, 191, 36, 0.35)",
        card: "0 10px 30px rgba(10, 37, 64, 0.08)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-reverse": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(16px)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-reverse": "float-reverse 8s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
