"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const headlineRows = [
  [
    { text: "We capture the", color: "#999999", weight: 400 },
    { text: "moments,", color: "#1a1a1a", weight: 700 }
  ],
  [
    { text: "stories,", color: "#1a1a1a", weight: 700 },
    { text: "and emotions", color: "#999999", weight: 400 }
  ],
  [
    { text: "that last", color: "#999999", weight: 400 },
    { text: "forever", color: "#1a1a1a", weight: 700 }
  ]
];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.3 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.4 } },
  };

  return (
    <section
      id="home"
      style={{
        width: '100%',
        minWidth: '100%',
        minHeight: '100svh',
        backgroundColor: '#f0f0ee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflowX: 'hidden',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        left: 0,
        right: 0,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full px-6 md:px-20"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "900px",
          margin: "0 auto",
          
        }}
      >
        {/* Headline */}
        <motion.div variants={containerVariants} className="w-full">
          {headlineRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.3em",
                fontSize: "clamp(36px, 5.5vw, 80px)",
                lineHeight: "0.95",
                fontFamily: "Montserrat, sans-serif",
                marginBottom: "0.15em",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              {row.map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  variants={wordVariants}
                  style={{ color: word.color, fontWeight: word.weight }}
                >
                  {word.text}
                </motion.span>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={subtitleVariants}
          style={{
            marginTop: "clamp(16px, 4vh, 32px)",
            fontSize: "clamp(14px, 2.5vw, 16px)",
            color: "#666666",
            maxWidth: "600px",
            lineHeight: "1.65",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textAlign: "center",
            margin: "clamp(16px, 4vh, 32px) auto 0",
          }}
        >
          Light is our toolkit. Emotion is our compass. Your story is the outcome.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={buttonVariants} style={{ marginTop: "clamp(24px, 5vh, 40px)", margin: "clamp(24px, 5vh, 40px) auto 0" }}>
          <Link
            href="#contact"
            style={{
              display: "inline-block",
              padding: "clamp(12px, 3vw, 16px) clamp(24px, 4vw, 32px)",
              borderRadius: "50px",
              backgroundColor: "#1a1a1a",
              color: "white",
              fontSize: "14px",
              fontWeight: "600",
              textDecoration: "none",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#000";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1a1a1a";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Start your project →
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
