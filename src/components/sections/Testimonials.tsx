'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Testimonial } from '@/types'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import Skeleton from '@/components/ui/Skeleton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { urlFor } from '@/lib/sanity'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAvatarLoading, setIsAvatarLoading] = useState(true)
  const { prefersReducedMotion } = useReducedMotion()

  return (
    <motion.div
      variants={CARD_VARIANTS}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.div
        className="relative bg-black/30 p-7 rounded-sm border-2 border-transparent overflow-hidden"
        animate={{ borderColor: !prefersReducedMotion && isHovered ? '#c9a84c' : 'transparent' }}
        transition={{ duration: 0.3 }}
        style={{ backgroundImage: 'linear-gradient(to top, rgba(8,8,8,0.88) 0%, transparent 55%)', backgroundBlendMode: 'multiply' }}
      >
        {/* Decorative Quote Mark */}
        <div className="absolute top-4 left-6 text-gold opacity-15 pointer-events-none">
          <p className="font-garamond text-[60px] md:text-[100px] leading-none">"</p>
        </div>

        {/* Quote Text */}
        <blockquote className="relative z-10 font-garamond text-fluid-quote italic text-cream mb-8 pt-8">
          {testimonial.quote}
        </blockquote>

        {/* Author Info */}
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-muted/20">
          {/* Avatar — Fixed 44×44px */}
          {testimonial.avatar && (
            <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
              {isAvatarLoading && <Skeleton className="absolute inset-0 z-10 rounded-full" />}
              <Image
                src={urlFor(testimonial.avatar).url()}
                alt={testimonial.name}
                fill
                className="object-cover grayscale"
                sizes="44px"
                style={{ filter: 'grayscale(70%)' }}
                onLoad={() => setIsAvatarLoading(false)}
              />
            </div>
          )}

          {/* Name, Role, Company */}
          <div>
            <p className="font-garamond text-fluid-card-title font-light text-cream">
              {testimonial.name}
            </p>
            <p className="text-fluid-label text-muted">
              {testimonial.role}
              {testimonial.company && ` • ${testimonial.company}`}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  // Show empty state if no testimonials data
  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="w-full">
        <div className="max-w-7xl mx-auto">
          <div style={{padding: '40px 24px', textAlign: 'center'}}>
            <p style={{color: '#6a6a6a', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase'}}>
              Add testimonials in Sanity Studio to display client reviews
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <motion.div
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className="w-full"
          >
            {/* Desktop & Tablet Grid: 2×2 */}
            <div className="hidden tablet:grid grid-cols-2 gap-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={testimonial}
                />
              ))}
            </div>

            {/* Mobile Grid: 1 column */}
            <div className="tablet:hidden flex flex-col gap-3">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
