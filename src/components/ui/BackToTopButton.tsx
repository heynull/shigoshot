'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)
  const { prefersReducedMotion } = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    if (prefersReducedMotion) {
      window.scrollTo({ top: 0 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.3,
            ease: 'easeOut',
          }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 tablet:bottom-10 tablet:right-10 w-14 tablet:w-16 h-14 tablet:h-16 bg-gold hover:bg-gold/90 transition-colors rounded-full shadow-lg z-40 flex items-center justify-center group"
          aria-label="Back to top"
        >
          <svg
            className="w-6 tablet:w-7 h-6 tablet:h-7 text-black/90 group-hover:text-black transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 19V5m-7 7l7-7 7 7"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
