'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Photo } from '@/types'
import { urlFor } from '@/lib/sanity'

interface LightboxProps {
  isOpen: boolean
  photos: Photo[]
  currentIndex: number
  onClose: () => void
  onNavigate: (direction: 'prev' | 'next') => void
}

export default function Lightbox({
  isOpen,
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const currentPhoto = photos[currentIndex]

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onNavigate('prev')
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        onNavigate('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNavigate])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gold hover:text-cream transition-colors duration-200 z-10"
            aria-label="Close lightbox"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Main lightbox container */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full max-w-6xl flex flex-col items-center justify-center"
          >
            {/* Image container */}
            <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center mb-6">
              <div className="relative w-full h-full">
                <Image
                  src={urlFor(currentPhoto.image).width(1600).format('webp').url()}
                  alt={currentPhoto.image.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 90vw"
                  priority
                />
              </div>
            </div>

            {/* Photo info */}
            <div className="text-center mb-8 w-full">
              <p className="text-fluid-label text-gold mb-2">
                {currentPhoto.category}
              </p>
              <h2 className="font-cormorant text-fluid-subheading font-light text-cream mb-3">
                {currentPhoto.title}
              </h2>
              <p className="text-fluid-body text-gray-400">
                {currentIndex + 1} / {photos.length}
              </p>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center gap-8 justify-center w-full">
              {/* Left arrow */}
              <button
                onClick={() => onNavigate('prev')}
                className="p-2 text-gold hover:text-cream transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentIndex === 0}
                aria-label="Previous photo"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Counter */}
              <div className="font-montserrat text-sm text-gray-400 min-w-[60px] text-center">
                {currentIndex + 1} of {photos.length}
              </div>

              {/* Right arrow */}
              <button
                onClick={() => onNavigate('next')}
                className="p-2 text-gold hover:text-cream transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentIndex === photos.length - 1}
                aria-label="Next photo"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Keyboard hint */}
            <p className="absolute bottom-6 text-xs text-gray-500 text-center">
              Use arrow keys to navigate • Press ESC to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
