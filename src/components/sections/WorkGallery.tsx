'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const categories = ['All', 'Portrait', 'Wedding', 'Editorial', 'Commercial', 'Fine Art', 'Urban', 'Documentary']

export default function WorkGallery({ photos }: { photos: any[] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = activeCategory === 'All'
    ? photos
    : photos.filter(p => 
        p.category?.toLowerCase() === activeCategory.toLowerCase() ||
        p.category?.toLowerCase().includes(activeCategory.toLowerCase())
      )

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    document.body.style.overflow = ''
  }

  const goNext = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filtered.length)
  }

  const goPrev = () => {
    if (lightboxIndex === null) return
    setLightboxIndex(
      lightboxIndex === 0 ? filtered.length - 1 : lightboxIndex - 1
    )
  }

  // Keyboard navigation
  if (typeof window !== 'undefined') {
    window.onkeydown = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'Escape') closeLightbox()
    }
  }

  return (
    <section style={{ padding: '120px 80px 80px' }} className="work-section">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '60px' }}
      >
        {/* Back link */}
        <a
          href="/"
          style={{
            color: '#c9a84c',
            fontSize: '12px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
          }}
        >
          ← Back to Home
        </a>

        <h1 style={{
          color: 'white',
          fontSize: 'clamp(36px, 5vw, 72px)',
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: '16px',
        }}>
          Our Work
        </h1>
        <p style={{
          color: '#888',
          fontSize: '16px',
          maxWidth: '480px',
          lineHeight: 1.7,
        }}>
          A complete collection of our photography work across 
          all categories and styles.
        </p>
      </motion.div>

      {/* Category filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '48px',
        }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              background: activeCategory === cat ? '#c9a84c' : 'transparent',
              color: activeCategory === cat ? '#000' : '#888',
              border: `1px solid ${activeCategory === cat ? '#c9a84c' : '#333'}`,
              borderRadius: '50px',
              padding: '8px 20px',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              fontWeight: activeCategory === cat ? 600 : 400,
            }}
            onMouseEnter={e => {
              if (activeCategory !== cat) {
                e.currentTarget.style.borderColor = '#c9a84c'
                e.currentTarget.style.color = '#c9a84c'
              }
            }}
            onMouseLeave={e => {
              if (activeCategory !== cat) {
                e.currentTarget.style.borderColor = '#333'
                e.currentTarget.style.color = '#888'
              }
            }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Photo count */}
      <p style={{
        color: '#555',
        fontSize: '12px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: '32px',
      }}>
        {filtered.length} {filtered.length === 1 ? 'Photo' : 'Photos'}
      </p>

      {/* Masonry-style grid */}
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}
        className="work-grid"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((photo, index) => {
            const imageUrl = photo?.image?.asset?.url
            const isHovered = hoveredId === photo._id

            return (
              <motion.div
                key={photo._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredId(photo._id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => openLightbox(index)}
                style={{
                  position: 'relative',
                  aspectRatio: index % 3 === 1 ? '3/4' : '1/1',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  backgroundColor: '#1a1a1a',
                }}
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={photo.image?.alt || photo.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                      filter: isHovered
                        ? 'brightness(0.4) saturate(0.8)'
                        : 'brightness(0.9)',
                      transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease',
                    }}
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                )}

                {/* Hover overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)',
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }} />

                {/* Category tag */}
                <div style={{
                  position: 'absolute',
                  top: '14px', left: '14px',
                  background: 'rgba(201,168,76,0.15)',
                  border: '1px solid rgba(201,168,76,0.4)',
                  color: '#c9a84c',
                  fontSize: '9px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  padding: '4px 10px',
                  borderRadius: '50px',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(-10px)',
                  transition: 'opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s',
                }}>
                  {photo.category || 'Photography'}
                </div>

                {/* Bottom info */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  padding: '18px',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.3s ease 0.1s, transform 0.3s ease 0.1s',
                }}>
                  <p style={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}>
                    {photo.title}
                  </p>
                  <p style={{
                    color: '#c9a84c',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}>
                    Click to view →
                  </p>
                </div>

                {/* Corner brackets */}
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  width: isHovered ? '20px' : '0px', height: '1px',
                  background: '#c9a84c',
                  transition: 'width 0.3s ease 0.2s',
                }} />
                <div style={{
                  position: 'absolute', top: '12px', right: '12px',
                  width: '1px', height: isHovered ? '20px' : '0px',
                  background: '#c9a84c',
                  transition: 'height 0.3s ease 0.2s',
                }} />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.96)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute', top: '24px', right: '24px',
                background: 'none', border: 'none',
                color: 'white', fontSize: '32px',
                cursor: 'pointer', zIndex: 10,
                padding: '8px', lineHeight: 1,
              }}
            >
              ×
            </button>

            {/* Counter */}
            <div style={{
              position: 'absolute', top: '28px', left: '50%',
              transform: 'translateX(-50%)',
              color: '#888', fontSize: '12px',
              letterSpacing: '0.3em',
            }}>
              {lightboxIndex + 1} / {filtered.length}
            </div>

            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev() }}
              style={{
                position: 'absolute', left: '24px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white', fontSize: '20px',
                cursor: 'pointer', borderRadius: '50%',
                width: '48px', height: '48px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              ←
            </button>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); goNext() }}
              style={{
                position: 'absolute', right: '24px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white', fontSize: '20px',
                cursor: 'pointer', borderRadius: '50%',
                width: '48px', height: '48px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              →
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '85vh',
                width: '800px',
                height: '600px',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              {filtered[lightboxIndex]?.image?.asset?.url && (
                <Image
                  src={filtered[lightboxIndex].image.asset.url}
                  alt={filtered[lightboxIndex].title}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="90vw"
                  priority
                />
              )}
            </motion.div>

            {/* Photo info */}
            <div style={{
              position: 'absolute', bottom: '32px',
              left: '50%', transform: 'translateX(-50%)',
              textAlign: 'center',
            }}>
              <p style={{
                color: 'white', fontSize: '16px',
                fontWeight: 600, marginBottom: '4px',
              }}>
                {filtered[lightboxIndex]?.title}
              </p>
              <p style={{
                color: '#c9a84c', fontSize: '10px',
                letterSpacing: '0.3em', textTransform: 'uppercase',
              }}>
                {filtered[lightboxIndex]?.category}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .work-section {
            padding: 100px 24px 60px !important;
          }
          .work-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .work-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
