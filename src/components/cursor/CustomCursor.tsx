"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isOverInteractive, setIsOverInteractive] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  // Mount on client side only
  useEffect(() => {
    setMounted(true);
    document.body.style.cursor = "none";

    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  // Track mouse movement
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsOverInteractive(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsOverInteractive(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mounted, cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          width: 10,
          height: 10,
          backgroundColor: "#c9a84c",
          borderRadius: "50%",
          left: cursorX,
          top: cursorY,
          x: "-50%",
          y: "-50%",
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed pointer-events-none z-50 border-2 rounded-full"
        style={{
          width: 36,
          height: 36,
          borderColor: isOverInteractive ? "#e8c97e" : "#c9a84c",
          left: ringX,
          top: ringY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isOverInteractive ? 1.5 : 1,
        }}
        transition={{
          scale: { duration: 0.3, ease: "easeOut" },
        }}
      />
    </>
  );
}
