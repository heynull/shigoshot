'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href)
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Portfolio', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ]

  const navBg = scrolled 
    ? 'rgba(8,8,8,0.95)' 
    : mobileOpen 
    ? 'rgba(8,8,8,0.98)'
    : 'rgba(248,246,242,0.98)'

  const linkColor = scrolled ? '#cccccc' : '#333333'

  return (
    <>
      {/* NAVBAR */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: '72px',
          background: navBg,
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          transition: 'background 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
        }}
        className="navbar-container"
      >
        {/* LOGO */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            flexShrink: 0,
            zIndex: 10,
          }}
        >
          <Image
            src="/logo.png"
            alt="ShigoShots"
            width={120}
            height={40}
            style={{
              objectFit: 'contain',
              filter: scrolled || mobileOpen ? 'none' : 'brightness(0)',
            }}
            priority
          />
        </Link>

        {/* DESKTOP NAV LINKS - hidden on mobile */}
        <div
          className="hidden md:flex"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {navLinks.map(link => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: linkColor,
                fontSize: '14px',
                fontWeight: 400,
                padding: '4px 0',
                transition: 'color 0.2s ease',
                fontFamily: 'Montserrat, sans-serif',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
              onMouseLeave={e => e.currentTarget.style.color = linkColor}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* DESKTOP CTA - hidden on mobile */}
        <button
          className="hidden md:block"
          onClick={() => handleNavClick('#contact')}
          style={{
            background: scrolled ? 'transparent' : '#000000',
            color: '#ffffff',
            border: scrolled ? '1px solid rgba(255,255,255,0.4)' : 'none',
            borderRadius: '50px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'Montserrat, sans-serif',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#c9a84c'
            e.currentTarget.style.color = '#000'
            e.currentTarget.style.border = '1px solid #c9a84c'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = scrolled ? 'transparent' : '#000000'
            e.currentTarget.style.color = '#ffffff'
            e.currentTarget.style.border = scrolled ? '1px solid rgba(255,255,255,0.4)' : 'none'
          }}
        >
          Book a session →
        </button>

        {/* HAMBURGER - shown on mobile only */}
        <button
          className="flex md:hidden"
          onClick={() => setMobileOpen(prev => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            zIndex: 1001,
            flexShrink: 0,
          }}
        >
          {mobileOpen ? (
            <span style={{
              color: 'white',
              fontSize: '28px',
              lineHeight: 1,
              display: 'block',
            }}>
              ×
            </span>
          ) : (
            <>
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: scrolled ? 'white' : '#1a1a1a',
                transition: 'background 0.3s ease',
              }} />
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: scrolled ? 'white' : '#1a1a1a',
                transition: 'background 0.3s ease',
              }} />
              <span style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: scrolled ? 'white' : '#1a1a1a',
                transition: 'background 0.3s ease',
              }} />
            </>
          )}
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(8,8,8,0.97)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '40px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '42px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '-0.02em',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                onMouseLeave={e => e.currentTarget.style.color = 'white'}
              >
                {link.label}
              </motion.button>
            ))}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              onClick={() => handleNavClick('#contact')}
              style={{
                background: '#c9a84c',
                color: '#000',
                border: 'none',
                borderRadius: '50px',
                padding: '16px 40px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: '16px',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              Book a session →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RESPONSIVE STYLES */}
      <style jsx global>{`
        @media (max-width: 767px) {
          .navbar-container {
            padding: 0 24px !important;
          }
        }
      `}</style>
    </>
  )
}

