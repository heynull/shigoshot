"use client";

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({
  children,
  className = "",
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-fluid-label text-gold mb-8",
        className
      )}
    >
      <div className="h-px w-8 bg-gold" />
      <span>{children}</span>
    </div>
  );
}
