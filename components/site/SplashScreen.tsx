"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SUBHEADING = "Financial Services Pvt. Ltd.";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [lettersShown, setLettersShown] = useState(0);

  useEffect(() => {
    // Reveal subheading letter by letter
    const letterInterval = setInterval(() => {
      setLettersShown((prev) => {
        if (prev >= SUBHEADING.length) {
          clearInterval(letterInterval);
          // Typing finished — give a brief pause to let it register, then hide
          setTimeout(() => setVisible(false), 400);
          return prev;
        }
        return prev + 1;
      });
    }, 45);

    return () => {
      clearInterval(letterInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-baseline font-extrabold tracking-tight text-4xl md:text-5xl leading-none">
              <motion.span
                initial={{ x: -120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-white"
              >
                sure
              </motion.span>
              <motion.span
                initial={{ x: 120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-secondary"
              >
                fund
              </motion.span>
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
                className="ml-1 text-lg font-semibold text-white/40 md:text-xl"
              >
                .in
              </motion.span>
            </div>
          </div>

          <p className="mt-4 text-sm font-medium uppercase tracking-[0.25em] text-white/60">
            {SUBHEADING.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={
                  i < lettersShown
                    ? { opacity: 1, filter: "blur(0px)" }
                    : { opacity: 0, filter: "blur(6px)" }
                }
                transition={{ duration: 0.25 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
