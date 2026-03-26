'use client'
import { useState } from 'react'
import Link from 'next/link'
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
      asset: { _id: 'placeholder', _type: 'sanity.imageAsset', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80' },
      alt: 'Portrait photography'
    }
  },
  {
    _id: 'placeholder-2', 
    title: 'Wedding Moments',
    category: 'portrait',
    image: {
      asset: { _id: 'placeholder', _type: 'sanity.imageAsset', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80' },
      alt: 'Wedding photography'
    }
  },
  {
    _id: 'placeholder-3',
    title: 'Editorial Shoot',
    category: 'editorial',
    image: {
      asset: { _id: 'placeholder', _type: 'sanity.imageAsset', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80' },
      alt: 'Editorial photography'
    }
  },
  {
    _id: 'placeholder-4',
    title: 'Commercial Brand',
    category: 'editorial',
    image: {
      asset: { _id: 'placeholder', _type: 'sanity.imageAsset', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80' },
      alt: 'Commercial photography'
    }
  },
  {
    _id: 'placeholder-5',
    title: 'Fine Art Print',
    category: 'fineArt',
    image: {
      asset: { _id: 'placeholder', _type: 'sanity.imageAsset', url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80' },
      alt: 'Fine art photography'
    }
  },
  {
    _id: 'placeholder-6',
    title: 'Urban Landscape',
    category: 'urban',
    image: {
      asset: { _id: 'placeholder', _type: 'sanity.imageAsset', url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80' },
      alt: 'Urban photography'
    }
  },
]

interface PortfolioGridProps {
  photos?: Photo[]
}

export default function PortfolioGrid({ photos = [] }: PortfolioGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const displayPhotos = (photos?.length > 0 
    ? photos.slice(0, 6)
    : placeholders) as Photo[]

  return (
    <section style={{
      backgroundColor: '#0a0a0a',
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
        <p style={{
          color: '#c9a84c',
          fontSize: '10px',
          letterSpacing: '0.4em',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Our Work
        </p>
        <h2 style={{
          color: 'white',
          fontSize: 'clamp(28px, 3vw, 42px)',
          fontWeight: 700,
          marginBottom: '16px',
        }}>
          Selected Work
        </h2>
        <p style={{
          color: '#888',
          fontSize: '14px',
          maxWidth: '400px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          A curated collection of our finest photography work
        </p>
      </motion.div>

      {/* 3-column grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          maxWidth: '1200px',
          margin: '0 auto 40px',
        }}
        className="portfolio-grid"
      >
        {displayPhotos.map((photo, index) => {
          const imageUrl = photo?.image?.asset?.url
            ? photo.image.asset.url.startsWith('http')
              ? photo.image.asset.url
              : urlFor(photo.image).width(600).format('webp').url()
            : null

          return (
            <motion.div
              key={photo._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onMouseEnter={() => setHoveredId(photo._id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                position: 'relative',
                aspectRatio: '1/1',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: '#1a1a1a',
              }}
            >
              {/* Image */}
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={photo.image?.alt || photo.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    transform: hoveredId === photo._id 
                      ? 'scale(1.08)' 
                      : 'scale(1)',
                    filter: hoveredId === photo._id
                      ? 'brightness(0.4) saturate(0.8)'
                      : 'brightness(0.85) saturate(0.9)',
                    transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease',
                  }}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c9a84c"
                    strokeWidth="1"
                    opacity="0.4"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p style={{
                    color: '#444',
                    fontSize: '9px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                  }}>
                    {photo.title}
                  </p>
                </div>
              )}

              {/* Gradient overlay - always present */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                opacity: hoveredId === photo._id ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }} />

              {/* Category tag - slides down from top on hover */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(201,168,76,0.15)',
                border: '1px solid rgba(201,168,76,0.4)',
                color: '#c9a84c',
                fontSize: '9px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                padding: '5px 12px',
                borderRadius: '50px',
                opacity: hoveredId === photo._id ? 1 : 0,
                transform: hoveredId === photo._id 
                  ? 'translateY(0)' 
                  : 'translateY(-12px)',
                transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s',
              }}>
                {photo.category || 'Photography'}
              </div>

              {/* Bottom content - slides up on hover */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px',
                opacity: hoveredId === photo._id ? 1 : 0,
                transform: hoveredId === photo._id 
                  ? 'translateY(0)' 
                  : 'translateY(16px)',
                transition: 'opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s',
              }}>
                {/* Title */}
                <h3 style={{
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  lineHeight: 1.2,
                }}>
                  {photo.title}
                </h3>

                {/* View button */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#c9a84c',
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}>
                  View Work
                  <span style={{
                    display: 'inline-block',
                    transform: hoveredId === photo._id 
                      ? 'translateX(4px)' 
                      : 'translateX(0)',
                    transition: 'transform 0.3s ease 0.2s',
                  }}>→</span>
                </div>
              </div>

              {/* Corner accent lines - draws on hover */}
              {/* Top right corner */}
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: hoveredId === photo._id ? '24px' : '0px',
                height: '1px',
                background: '#c9a84c',
                transition: 'width 0.4s ease 0.2s',
              }} />
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '1px',
                height: hoveredId === photo._id ? '24px' : '0px',
                background: '#c9a84c',
                transition: 'height 0.4s ease 0.2s',
              }} />

              {/* Bottom left corner */}
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                width: hoveredId === photo._id ? '24px' : '0px',
                height: '1px',
                background: '#c9a84c',
                transition: 'width 0.4s ease 0.2s',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                width: '1px',
                height: hoveredId === photo._id ? '24px' : '0px',
                background: '#c9a84c',
                transition: 'height 0.4s ease 0.2s',
              }} />
            </motion.div>
          )
        })}
      </div>

      {/* View All button */}
      <div style={{ textAlign: 'center' }}>
        <Link
          href="/work"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: '1px solid #333',
            color: 'white',
            padding: '12px 32px',
            borderRadius: '50px',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#c9a84c'
            e.currentTarget.style.color = '#c9a84c'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#333'
            e.currentTarget.style.color = 'white'
          }}
        >
          View All Work →
        </Link>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}

