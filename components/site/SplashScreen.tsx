"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SUBHEADING = "Financial Services Pvt. Ltd.";
const STORAGE_KEY = "surefund_splash_shown";

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [lettersShown, setLettersShown] = useState(0);
  const [checkedStorage, setCheckedStorage] = useState(false);

  useEffect(() => {
    // Check sessionStorage first — ye sirf browser mein chalta hai, server pe nahi
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);

    if (alreadyShown) {
      setVisible(false);
      setCheckedStorage(true);
      return;
    }

    // Pehli baar hai is session mein — mark kar do aur splash dikhao
    sessionStorage.setItem(STORAGE_KEY, "true");
    setVisible(true);
    setCheckedStorage(true);

    const letterInterval = setInterval(() => {
      setLettersShown((prev) => {
        if (prev >= SUBHEADING.length) {
          clearInterval(letterInterval);
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

  // Jab tak storage check nahi ho jata, kuch bhi render mat karo (flash avoid karne ke liye)
  if (!checkedStorage) return null;

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