'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Photo } from '@/types'
import SectionLabel from '@/components/ui/SectionLabel'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { urlFor } from '@/lib/sanity'

interface ProcessProps {
  photos?: Photo[]
}

const EASING = { type: 'tween', ease: [0.25, 0.46, 0.45, 0.94] } as const

interface ProcessStep {
  number: number
  title: string
  description: string
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: 'Discovery & Consultation',
    description: 'We begin by understanding your vision, goals, and unique story. Through in-depth conversations, we uncover what makes your narrative compelling.',
  },
  {
    number: 2,
    title: 'Conceptual Planning',
    description: 'Our creative team develops a comprehensive shot list, mood boards, and timeline to ensure every moment is perfectly orchestrated.',
  },
  {
    number: 3,
    title: 'Production & Capture',
    description: 'Using state-of-the-art equipment and our refined artistic eye, we capture stunning visuals in carefully curated environments.',
  },
  {
    number: 4,
    title: 'Curation & Delivery',
    description: 'We meticulously edit, color grade, and deliver your final collection—a timeless body of work that tells your story.',
  },
]

const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const STEP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

function ProcessStepItem({ step }: { step: ProcessStep }) {
  return (
    <motion.div
      variants={STEP_VARIANTS}
      className="py-5 md:py-6 border-b border-muted/20 last:border-b-0"
    >
      <div className="flex gap-4">
        {/* Number */}
        <div className="flex-shrink-0 pt-1">
          <p className="font-garamond text-fluid-subheading font-light text-gold opacity-60">
            {String(step.number).padStart(2, '0')}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4 className="font-garamond text-fluid-process-step font-light text-cream mb-2">
            {step.title}
          </h4>
          <p className="text-fluid-body text-muted">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Process({ photos }: ProcessProps) {
  // Return null if no photos to avoid showing empty placeholder images
  if (!photos?.length) return null

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Main image parallax: moves up at 0.3x scroll speed
  const mainImageY = useTransform(scrollY, [0, 800], [0, -240])
  
  // Accent image parallax: moves down at 0.15x scroll speed (opposite direction)
  const accentImageY = useTransform(scrollY, [0, 800], [0, 120])

  return (
    <section ref={containerRef} className="w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid grid-gap-standard" style={{ gridTemplateColumns: '45% 55%' }}>
          {/* Images: Desktop | Tablet | Mobile layouts */}
          {/* Desktop: Left column with parallax + overlay */}
          <div className="hidden lg:block relative h-full">
            {/* Vertical Gold Tag — Desktop only */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
              <div className="bg-gold h-32 w-1 flex items-center justify-center">
                <p
                  className="font-garamond text-sm font-light text-black -rotate-90 whitespace-nowrap origin-center"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                >
                  The Process
                </p>
              </div>
            </div>

            {/* Main Image with Parallax */}
            <motion.div
              className="relative w-full aspect-[3/4] rounded-sm overflow-hidden bg-gradient-to-br from-black via-surface to-deep"
              style={{ y: mainImageY }}
            >
              {photos?.[0]?.image?.asset?.url ? (
                <Image
                  src={photos[0].image.asset.url}
                  alt={photos[0].image.alt || 'Process main visual'}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="50vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-black via-surface to-deep" />
              )}
            </motion.div>

            {/* Overlapping Square Image — Desktop only */}
            <motion.div
              className="absolute bottom-0 right-0 -translate-x-12 -translate-y-12 w-40 h-40 lg:w-48 lg:h-48 rounded-sm overflow-hidden border-4 border-black z-5 bg-gradient-to-br from-black via-surface to-deep"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              style={{ y: accentImageY }}
            >
              {photos?.[1]?.image?.asset?.url ? (
                <Image
                  src={photos[1].image.asset.url}
                  alt={photos[1].image.alt || 'Process overlay visual'}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="200px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-black via-surface to-deep" />
              )}
            </motion.div>
          </div>

          {/* Tablet: Side-by-side images (50/50) */}
          <div className="hidden tablet:flex lg:hidden flex-col gap-6 lg:hidden">
            <div className="grid grid-cols-2 gap-4">
              {/* Main Image */}
              <motion.div
                className="relative w-full aspect-[3/4] rounded-sm overflow-hidden bg-gradient-to-br from-black via-surface to-deep"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              >
                {photos?.[0]?.image?.asset?.url ? (
                  <Image
                    src={photos[0].image.asset.url}
                    alt={photos[0].image.alt || 'Process main visual'}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-black via-surface to-deep" />
                )}
              </motion.div>

              {/* Overlay Image */}
              <motion.div
                className="relative w-full aspect-[1/1] rounded-sm overflow-hidden bg-gradient-to-br from-black via-surface to-deep"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              >
                {photos?.[1]?.image?.asset?.url ? (
                  <Image
                    src={photos[1].image.asset.url}
                    alt={photos[1].image.alt || 'Process overlay visual'}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-black via-surface to-deep" />
                )}
              </motion.div>
            </div>
          </div>

          {/* Mobile: Stacked Images */}
          <div className="tablet:hidden flex flex-col gap-6">
            {/* Main Image */}
            <motion.div
              className="relative w-full aspect-[3/4] rounded-sm overflow-hidden bg-gradient-to-br from-black via-surface to-deep"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            >
              {photos?.[0]?.image?.asset?.url ? (
                <Image
                  src={photos[0].image.asset.url}
                  alt={photos[0].image.alt || 'Process main visual'}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="100vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-black via-surface to-deep" />
              )}
            </motion.div>

            {/* Stacked Square Image */}
            <motion.div
              className="relative w-32 h-32 rounded-sm overflow-hidden bg-gradient-to-br from-black via-surface to-deep"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            >
              {photos?.[1]?.image?.asset?.url ? (
                <Image
                  src={photos[1].image.asset.url}
                  alt={photos[1].image.alt || 'Process overlay visual'}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="128px"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-black via-surface to-deep" />
              )}
            </motion.div>
          </div>

          {/* Right: Content */}
          <RevealOnScroll>
            <motion.div
              variants={CONTAINER_VARIANTS}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              className="lg:pl-20"
            >
              {/* Section Label */}
              <motion.div variants={STEP_VARIANTS}>
                <SectionLabel>Our Approach</SectionLabel>
              </motion.div>

              {/* Heading */}
              <motion.h2
                variants={STEP_VARIANTS}
                className="font-garamond text-4xl tablet:text-5xl lg:text-6xl font-light text-cream mt-6 mb-12 leading-tight"
              >
                A Refined
                <span className="text-gold italic"> Creative</span>
                <br />
                Process
              </motion.h2>

              {/* Process Steps */}
              <motion.div
                variants={CONTAINER_VARIANTS}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px 0px -100px 0px' }}
              >
                {PROCESS_STEPS.map((step) => (
                  <ProcessStepItem key={step.number} step={step} />
                ))}
              </motion.div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
