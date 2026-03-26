'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md text-center"
      >
        <h1 className="font-garamond text-5xl md:text-6xl font-light text-cream mb-4">
          Oops
        </h1>

        <p className="font-montserrat text-base font-light text-muted mb-2">
          Something went wrong
        </p>

        <p className="font-montserrat text-sm font-light text-muted/60 mb-8">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>

        <motion.button
          onClick={reset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gold text-black px-8 py-3 rounded-sm font-montserrat text-sm font-light uppercase tracking-widest hover:shadow-lg transition-all"
        >
          Try Again
        </motion.button>
      </motion.div>
    </div>
  )
}
