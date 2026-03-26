'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  
  // Create a smooth spring animation from the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })
  
  // Transform spring progress to width percentage
  const width = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  return (
    <motion.div
      className="fixed top-0 left-0 h-0.5 bg-gold z-[1001]"
      style={{ width }}
    />
  )
}
