'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { SanityImage } from '@/types'
import { urlFor } from '@/lib/sanity'

interface AboutProps {
  photographerImage?: SanityImage
}

export default function About({ photographerImage }: AboutProps) {
  const [imageHovered, setImageHovered] = useState(false)
  return (
    <section style={{ backgroundColor: '#080808' }} className="py-12 md:py-20 px-6 md:px-10 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 max-w-6xl mx-auto items-center">
        
        {/* IMAGE — Photographer portrait (appears FIRST on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="aspect-square md:aspect-[3/4] relative rounded-2xl overflow-hidden"
          style={{
            backgroundColor: '#1a1a1a',
            position: 'relative',
          }}
          onMouseEnter={() => setImageHovered(true)}
          onMouseLeave={() => setImageHovered(false)}
        >
          {photographerImage?.asset?.url ? (
            <>
              <Image
                src={urlFor(photographerImage).url()}
                alt={photographerImage.alt || 'Photographer portrait'}
                fill
                className="object-cover"
                style={{
                  transform: imageHovered ? 'scale(1.03)' : 'scale(1)',
                  transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
                }}
                priority
              />

              {/* Dark overlay - fades in on hover */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.15)',
                opacity: imageHovered ? 1 : 0,
                transition: 'opacity 0.4s ease',
                pointerEvents: 'none',
              }} />

              {/* Gold label slides up from bottom */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                background: 'rgba(201, 168, 76, 0.9)',
                color: '#000',
                fontSize: '10px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                padding: '8px 16px',
                opacity: imageHovered ? 1 : 0,
                transform: imageHovered ? 'translateY(0)' : 'translateY(10px)',
                transition: 'all 0.4s ease 0.1s',
                pointerEvents: 'none',
                fontWeight: 600,
              }}>
                <div>ShigoShot</div>
                <div style={{ fontSize: '9px', letterSpacing: '0.25em' }}>Photographer</div>
              </div>
            </>
          ) : (
            /* Placeholder — shown when image is not available */
            <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.4">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <p style={{ color: '#555', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Add photo
              </p>
            </div>
          )}

          {/* Gold outline border - appears on hover */}
          <div style={{
            position: 'absolute',
            inset: 0,
            outline: imageHovered ? '2px solid rgba(201,168,76,0.4)' : '2px solid transparent',
            outlineOffset: '8px',
            borderRadius: 'inherit',
            transition: 'outline 0.4s ease',
            pointerEvents: 'none',
          }} />
        </motion.div>

        {/* TEXT — Photographer bio content (appears SECOND on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
        >
          {/* Gold eyebrow label */}
          <p className="text-xs md:text-sm mb-3 md:mb-4 text-[#c9a84c] flex items-center gap-3" style={{ letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <span className="inline-block w-8 h-px bg-[#c9a84c]"/>
            About the Photographer
          </p>

          {/* Headline */}
          <h2 style={{
            fontSize: 'clamp(24px, 6vw, 52px)',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: 'clamp(12px, 3vw, 24px)',
          }}>
            Capturing Life's<br />
            <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>
              Most Precious
            </span>{' '}
            Moments
          </h2>

          {/* Bio paragraph 1 */}
          <p style={{
            color: '#888',
            fontSize: 'clamp(14px, 2vw, 15px)',
            lineHeight: 1.8,
            marginBottom: 'clamp(12px, 2vw, 20px)',
          }}>
            With over a decade behind the lens, I've developed 
            a visual language rooted in authenticity and emotion. 
            My work spans intimate portraits, grand editorial 
            campaigns, and everything in between.
          </p>

          {/* Bio paragraph 2 */}
          <p style={{
            color: '#666',
            fontSize: 'clamp(13px, 1.8vw, 14px)',
            lineHeight: 1.8,
            marginBottom: 'clamp(20px, 3vw, 36px)',
          }}>
            Based in Lagos, Nigeria — working worldwide. Every 
            session is a collaboration, every frame a conversation 
            between light, subject, and story.
          </p>

          {/* Signature line */}
          <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6 border-t border-[#1e1e1e]">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid #2a2a2a',
              position: 'relative',
              flexShrink: 0,
            }}>
              <Image
                src="/logo.png"
                alt="ShigoShots"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <p style={{ color: 'white', fontSize: 'clamp(13px, 2vw, 14px)', fontWeight: 600 }}>
                ShigoShots
              </p>
              <p style={{ color: '#666', fontSize: 'clamp(11px, 1.5vw, 12px)', letterSpacing: '0.15em' }}>
                Lead Photographer
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
