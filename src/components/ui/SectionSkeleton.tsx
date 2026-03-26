'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SectionSkeletonProps {
  type?: 'testimonials' | 'contact'
  height?: string
}

export default function SectionSkeleton({ type = 'testimonials', height = 'h-96' }: SectionSkeletonProps) {
  const { prefersReducedMotion } = useReducedMotion()

  const shimmer = {
    animate: prefersReducedMotion
      ? {}
      : {
          backgroundPosition: ['200% 0', '-200% 0'],
        },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  }

  return (
    <div className={`w-full ${height} bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-800`}>
      <motion.div
        className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{
          backgroundSize: '200% 100%',
          backgroundPosition: '200% 0',
        }}
        variants={shimmer}
        animate={prefersReducedMotion ? 'animate' : 'animate'}
      />
    </div>
  )
}
