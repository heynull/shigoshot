'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <>
      {/* Overlay that slides up on page load */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: '100%' }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
        className="fixed inset-0 bg-black z-50 pointer-events-none"
        aria-hidden="true"
      />
      {/* Content */}
      {children}
    </>
  )
}
