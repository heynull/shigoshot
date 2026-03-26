'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')

  const linkStyle = {
    color: '#aaa',
    fontSize: '14px',
    textDecoration: 'none',
    padding: '6px 0',
    display: 'block',
    transition: 'color 0.2s ease',
  }

  const headingStyle = {
    fontSize: '11px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase' as const,
    color: '#666',
    marginBottom: '12px',
    fontWeight: 500,
  }

  return (
    <footer style={{ backgroundColor: '#080808', width: '100%' }}>
      <div className="px-6 md:px-10 lg:px-20 pt-12 pb-4">
        
        {/* Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1 - Stay Updated */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <p style={headingStyle}>Stay Updated</p>
            <div className="flex w-full max-w-xs">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1, minWidth: 0,
                  background: '#1a1a1a',
                  border: '1px solid #2a2a2a',
                  borderRight: 'none',
                  color: 'white',
                  padding: '11px 14px',
                  fontSize: '13px',
                  borderRadius: '6px 0 0 6px',
                  outline: 'none',
                }}
              />
              <button style={{
                flexShrink: 0,
                background: '#c9a84c',
                color: '#000',
                border: 'none',
                padding: '11px 14px',
                fontSize: '12px',
                fontWeight: 600,
                borderRadius: '0 6px 6px 0',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}>
                Subscribe
              </button>
            </div>
            <div style={{ marginTop: '16px' }} className="text-center lg:text-left">
              {['Available Worldwide', 'Est. 2020', 'Lagos, Nigeria'].map(t => (
                <p key={t} style={{ color: '#555', fontSize: '12px', lineHeight: '1.8' }}>
                  {t}
                </p>
              ))}
            </div>
          </div>

          {/* Col 2 - Explore */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <p style={headingStyle}>Explore</p>
            <div className="flex flex-col">
              {['Home', 'Portfolio', 'Services', 'Contact'].map(item => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                  style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                  onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3 - Services */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <p style={headingStyle}>Services</p>
            <div className="flex flex-col">
              {['Portrait', 'Wedding', 'Commercial', 'Fine Art'].map(item => (
                <Link
                  key={item}
                  href="#work"
                  style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                  onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4 - Connect */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <p style={headingStyle}>Connect</p>
            <div className="flex flex-col">
              {[
                { label: 'Instagram', href: '#' },
                { label: 'LinkedIn', href: '#' },
                { label: 'Behance', href: '#' },
              ].map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'}
                  onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright — always visible */}
      <div style={{
        borderTop: '1px solid #2a2a2a',
        marginTop: '32px',
        padding: '20px 24px',
        textAlign: 'center',
        width: '100%',
        display: 'block',
      }}>
        <p style={{ color: '#666', fontSize: '12px', letterSpacing: '0.1em' }}>
          © 2026 ShigoShots. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
