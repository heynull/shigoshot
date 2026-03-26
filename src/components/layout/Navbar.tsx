"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Track window size
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Simple scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
  }, [mobileOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Smooth scroll to section
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    const navHeight = 72;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.pushState(null, "", href);
  };

  const navBg = scrolled ? "rgba(8, 8, 8, 0.95)" : "#f0f0ee";
  const textColor = scrolled ? "#ccc" : "#333";
  const hoverColor = scrolled ? "#fff" : "#000";

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        style={{
          display: isMobile ? "none" : "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          height: "72px",
          backgroundColor: navBg,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "background-color 0.3s ease",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}
      >
        {/* Logo */}
        <Link href="#" className="flex items-center gap-3 flex-shrink-0">
          <div style={{ width: "32px", height: "32px", backgroundColor: "#c9a84c", borderRadius: "4px" }} />
          <span style={{ fontSize: "18px", fontWeight: 700, color: "#c9a84c", letterSpacing: "0.5px" }}>
            ShigoShots
          </span>
        </Link>

        {/* Center Nav Links */}
        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "48px" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                color: textColor,
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                cursor: "pointer",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = hoverColor)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = textColor)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={(e) => handleNavClick(e, "#contact")}
          style={{
            background: "#c9a84c",
            color: "#000",
            border: "none",
            borderRadius: "50px",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 0.2s ease",
            display: isMobile ? "none" : "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#b8962e")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#c9a84c")}
        >
          Book a session <span>→</span>
        </button>
      </nav>

      {/* Mobile Navbar */}
      <div
        style={{
          display: isMobile ? "block" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
        }}
      >
        {/* Background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            height: "80px",
            background: mobileOpen ? "rgba(8,8,8,0.98)" : scrolled ? "rgba(8,8,8,0.95)" : "rgba(8,8,8,0)",
            transition: "background 0.3s ease",
          }}
        />

        {/* Content */}
        <div className="relative flex items-center justify-between px-6 h-20">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2 z-20">
            <div
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: "#c9a84c",
                borderRadius: "3px",
              }}
            />
            <span style={{ fontSize: "16px", fontWeight: 700, color: scrolled ? "#fff" : "#333" }}>ShigoShots</span>
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: isMobile ? 'flex' : 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              position: 'relative',
              zIndex: 1001,
            }}
          >
            {mobileOpen ? (
              /* X icon when menu is open */
              <span style={{
                color: '#ffffff',
                fontSize: '28px',
                lineHeight: 1,
                fontWeight: 300,
                opacity: 1,
              }}>
                ×
              </span>
            ) : (
              /* Hamburger lines when menu is closed */
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{
                    display: 'block',
                    width: '24px',
                    height: '2px',
                    background: scrolled ? 'white' : '#1a1a1a',
                    transition: 'background 0.3s ease',
                  }} />
                ))}
              </div>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center pt-20"
              onClick={() => setMobileOpen(false)}
            >
              <div className="flex flex-col gap-6 text-center" onClick={(e) => e.stopPropagation()}>
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-2xl font-bold text-white hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="mt-6 px-8 py-3 bg-gold text-black rounded-full font-bold"
                >
                  Book a session
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

