'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const isWorkPage = pathname === '/work'

  return (
    <footer style={{ backgroundColor: '#080808', width: '100%' }}>
      {/* Only show full footer on homepage (not on /work page) */}
      {!isWorkPage && (
        <div className="px-6 md:px-10 lg:px-20 pt-12 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1 — Location Info */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#888] mb-5 font-medium">
                Location
              </p>
              <div className="space-y-2">
                {['Available Worldwide', 'Est. 2020', 'Lagos, Nigeria'].map((item) => (
                  <p key={item} className="text-[#aaa] text-sm leading-relaxed">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Column 2 — Explore */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#888] mb-5 font-medium">
                Explore
              </p>
              <div className="flex flex-col gap-2">
                {['Portfolio', 'Services', 'Contact'].map((item) => (
                  <Link
                    key={item}
                    href={item === 'Portfolio' ? '/work' : `#${item.toLowerCase()}`}
                    className="text-[#aaa] text-sm py-1 hover:text-[#c9a84c] transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3 — Services */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#888] mb-5 font-medium">
                Services
              </p>
              <div className="flex flex-col gap-2">
                {['Portrait', 'Wedding', 'Commercial'].map((item) => (
                  <Link
                    key={item}
                    href="#services"
                    className="text-[#aaa] text-sm py-1 hover:text-[#c9a84c] transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 4 — Connect with icons */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#888] mb-5 font-medium">
                Connect
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.instagram.com/shigoshot/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#aaa] text-sm py-1 hover:text-[#c9a84c] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="17" y1="7" x2="17.01" y2="7"/>
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@shigoshot/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#aaa] text-sm py-1 hover:text-[#c9a84c] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                  </svg>
                  TikTok
                </a>
                <a
                  href="https://wa.me/2349160184596"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#aaa] text-sm py-1 hover:text-[#c9a84c] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Copyright bar — always visible on all pages */}
      <div className="border-t border-[#2a2a2a] px-6 py-5 text-center">
        <p className="text-[#666] text-xs tracking-wide">
          © 2026 ShigoShots. All rights reserved.
        </p>
      </div>
    </footer>
  )
}