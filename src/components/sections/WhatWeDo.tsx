'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Photo } from '@/types'
import { urlFor } from '@/lib/sanity'

const placeholders: Photo[] = [
  {
    _id: 'placeholder-1',
    title: 'Portrait Session',
    category: 'portrait',
    image: { 
      asset: { url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80' },
      alt: 'Portrait photography'
    }
  },
  {
    _id: 'placeholder-2', 
    title: 'Wedding Moments',
    category: 'wedding',
    image: {
      asset: { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80' },
      alt: 'Wedding photography'
    }
  },
  {
    _id: 'placeholder-3',
    title: 'Editorial Shoot',
    category: 'editorial',
    image: {
      asset: { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80' },
      alt: 'Editorial photography'
    }
  },
  {
    _id: 'placeholder-4',
    title: 'Commercial Brand',
    category: 'commercial',
    image: {
      asset: { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80' },
      alt: 'Commercial photography'
    }
  },
  {
    _id: 'placeholder-5',
    title: 'Fine Art Print',
    category: 'fineart',
    image: {
      asset: { url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80' },
      alt: 'Fine art photography'
    }
  },
  {
    _id: 'placeholder-6',
    title: 'Urban Landscape',
    category: 'urban',
    image: {
      asset: { url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80' },
      alt: 'Urban photography'
    }
  },
]

const services = [
  {
    tag: 'Portraiture',
    title: 'Portrait & Editorial',
    description: 'We create striking portraits and editorial images that define your brand identity. Every session is crafted with intention, light, and emotion.',
  },
  {
    tag: 'Events',
    title: 'Wedding & Events',
    description: 'Timeless wedding photography capturing every stolen glance and joyful tear. We document your day so nothing is forgotten.',
  },
  {
    tag: 'Commercial',
    title: 'Commercial & Brand',
    description: 'Professional photography for businesses and campaigns. We deliver images that communicate your brand value and stop the scroll.',
  },
  {
    tag: 'Fine Art',
    title: 'Fine Art & Prints',
    description: 'Limited edition fine art photography as museum-quality prints. Hand-edited and personally signed — made to live on your walls forever.',
  },
]

const gradients = [
  'linear-gradient(135deg, #1a1a2e 0%, #2a1a2e 100%)',
  'linear-gradient(135deg, #1a2a1a 0%, #1a1a2a 100%)',
  'linear-gradient(135deg, #2a1a1a 0%, #1a2a2a 100%)',
  'linear-gradient(135deg, #1a2a2a 0%, #2a2a1a 100%)',
]

interface WhatWeDoProps {
  photos?: Photo[]
}

export default function WhatWeDo({ photos = [] }: WhatWeDoProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const displayPhotos = photos?.length > 0 ? photos : placeholders

  return (
    <section style={{
      backgroundColor: '#0e0e0e',
      borderTopLeftRadius: '40px',
      borderTopRightRadius: '40px',
      padding: '80px 24px',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '48px' }}
      >
        <h2 style={{
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: '16px',
          lineHeight: 1.2,
        }}>
          What We Do
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#888',
          maxWidth: '460px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          From intimate portraits to grand editorial campaigns, every 
          frame we shoot is crafted with purpose and beauty.
        </p>
      </motion.div>

      {/* 2-column card grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
      className="whatwedo-grid"
      >
        {services.map((service, index) => {
          const photo = displayPhotos[index]
          const isHovered = hoveredIndex === index
          const imageUrl = photo?.image?.asset?.url
            ? photo.image.asset.url.startsWith('http')
              ? photo.image.asset.url
              : urlFor(photo.image).width(800).format('webp').url()
            : null

          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                aspectRatio: '3/4',
                cursor: 'pointer',
                background: gradients[index],
              }}
            >
              {/* Background Image */}
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={service.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    filter: isHovered
                      ? 'brightness(0.3) saturate(0.7)'
                      : 'brightness(0.5) saturate(0.85)',
                    transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                    transition: 'all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
                  }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                /* Placeholder when no Sanity image */
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: gradients[index],
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" 
                    fill="none" stroke="#c9a84c" strokeWidth="1" 
                    opacity="0.4">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <p style={{
                    color: '#555',
                    fontSize: '10px',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                  }}>
                    Add photo in Sanity
                  </p>
                </div>
              )}

              {/* Gradient overlay - always visible */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                transition: 'opacity 0.5s ease',
              }} />

              {/* Card Content */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '28px',
                transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
                transition: 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
              }}>
                {/* Gold tag */}
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(201,168,76,0.15)',
                  border: '1px solid rgba(201,168,76,0.35)',
                  color: '#c9a84c',
                  fontSize: '9px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  padding: '5px 12px',
                  borderRadius: '50px',
                  marginBottom: '10px',
                }}>
                  {service.tag}
                </div>

                {/* Title - always visible */}
                <h3 style={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 'clamp(18px, 2vw, 26px)',
                  lineHeight: 1.2,
                  marginBottom: '10px',
                }}>
                  {service.title}
                </h3>

                {/* Description - reveals on hover */}
                <p style={{
                  color: 'rgba(255,255,255,0.72)',
                  fontSize: '13px',
                  lineHeight: 1.7,
                  marginBottom: '16px',
                  maxHeight: isHovered ? '100px' : '0',
                  overflow: 'hidden',
                  opacity: isHovered ? 1 : 0,
                  transition: 'max-height 0.5s ease, opacity 0.4s ease 0.1s',
                }}>
                  {service.description}
                </p>

                {/* Learn more link - reveals on hover */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#c9a84c',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s',
                }}>
                  Learn more
                  <span style={{
                    display: 'inline-block',
                    transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'transform 0.3s ease',
                  }}>→</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Mobile responsive style */}
      <style jsx>{`
        @media (max-width: 768px) {
          .whatwedo-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
