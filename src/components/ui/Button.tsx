"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-black px-10 min-h-[52px] font-medium transition-all flex items-center justify-center relative",
  ghost:
    "transparent text-muted hover:text-gold relative px-0 min-h-[52px] group border-b border-transparent hover:border-gold transition-colors flex items-center justify-center",
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  isLoading = false,
}: ButtonProps) {
  const { prefersReducedMotion } = useReducedMotion()
  
  const baseClasses = cn(
    "inline-flex items-center justify-center text-sm font-montserrat transition-all min-h-[44px]",
    variantClasses[variant],
    className
  );

  if (href) {
    return (
      <motion.div
        whileHover={!prefersReducedMotion && variant === "primary" ? { y: -3 } : {}}
        transition={{ duration: 0.2 }}
      >
        <Link href={href} className={baseClasses}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      className={baseClasses}
      onClick={onClick}
      disabled={isLoading}
      initial={{ boxShadow: "0px 0px 0px rgba(201, 168, 76, 0)" }}
      whileHover={!prefersReducedMotion && variant === "primary" ? { 
        y: -3,
        boxShadow: "0px 8px 16px rgba(201, 168, 76, 0.4)"
      } : {}}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2 }}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
        />
      ) : (
        children
      )}
    </motion.button>
  );
}
