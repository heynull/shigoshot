'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Loading() {
  const { prefersReducedMotion } = useReducedMotion()
  
  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: prefersReducedMotion ? 1 : 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 2.4 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : -60 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 2.4, ease: 'easeOut' }}
      >
        {/* Logo Text */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="font-garamond text-6xl md:text-7xl font-light text-cream tracking-widest"
        >
          ShigoShots
        </motion.h1>

        {/* Thin Gold Line that animates width */}
        <div className="mt-8 h-[1px] w-0 md:w-0 mx-auto bg-black relative overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 'clamp(12rem, 50vw, 16rem)' }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: 'easeOut', delay: prefersReducedMotion ? 0 : 0.3 }}
            className="h-full bg-gold"
          />
        </div>

        {/* Loading Dots */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{
                duration: prefersReducedMotion ? 0 : 2,
                repeat: prefersReducedMotion ? 0 : Infinity,
                delay: prefersReducedMotion ? 0 : i * 0.2,
                ease: 'easeInOut',
              }}
              className="w-2 h-2 rounded-full bg-gold"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
