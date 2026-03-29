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
        className="relative p-7 overflow-hidden"
        animate={{
          background: isHovered ? '#1c1c1c' : '#0e0e0e',
          borderColor: isHovered ? '#2a2a2a' : '#1a1a1a',
          y: isHovered ? -6 : 0,
          boxShadow: isHovered ? '0 20px 60px rgba(0,0,0,0.5)' : '0 0px 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          border: '1px solid',
          borderRadius: '16px',
        }}
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
      <section className="w-full" style={{ padding: '60px 24px', backgroundColor: '#080808' }}>
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
    <section className="w-full" style={{ padding: '60px 24px', backgroundColor: '#080808' }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          {/* Gold Eyebrow Label with decorative lines */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '16px',
            fontSize: '10px',
            color: '#c9a84c',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            <div style={{
              flex: '0 1 40px',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #c9a84c)',
            }} />
            <span>Client Reviews</span>
            <div style={{
              flex: '0 1 40px',
              height: '1px',
              background: 'linear-gradient(to left, transparent, #c9a84c)',
            }} />
          </div>

          {/* Main Title */}
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 48px)',
            color: 'white',
            fontWeight: 700,
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            What Our Clients Say About Us
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: '16px',
            fontStyle: 'italic',
            color: '#888',
            fontFamily: "'Cormorant Garamond', 'Garamond', serif",
            marginBottom: '60px',
          }}>
            You can't go wrong with ShigoShot
          </p>
        </motion.div>

        <RevealOnScroll>
          <motion.div
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            className="w-full"
          >
            {/* Desktop & Tablet Grid: 2×2 */}
            <div className="hidden tablet:grid grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} style={{ padding: '36px' }}>
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>

            {/* Mobile Grid: 1 column */}
            <div className="tablet:hidden flex flex-col gap-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} style={{ padding: '36px' }}>
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </motion.div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
