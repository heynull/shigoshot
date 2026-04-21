'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Testimonial } from '@/types'
import { urlFor } from '@/lib/sanity'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAvatarLoading, setIsAvatarLoading] = useState(true)

  return (
    <motion.div
      variants={CARD_VARIANTS}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-full"
    >
      <motion.div
        className="relative p-5 sm:p-6 md:p-8 overflow-hidden h-full flex flex-col"
        animate={{
          background: isHovered ? '#1c1c1c' : '#0e0e0e',
          borderColor: isHovered ? '#2a2a2a' : '#1a1a1a',
          y: isHovered ? -3 : 0,
          boxShadow: isHovered ? '0 15px 35px rgba(0,0,0,0.4)' : 'none',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          border: '1px solid',
          borderRadius: '20px',
          height: '100%',
        }}
      >
        {/* Quote Mark */}
        <div className="absolute top-3 left-4 text-gold opacity-10 pointer-events-none">
          <p className="font-garamond text-[55px] sm:text-[70px] md:text-[85px] leading-none">"</p>
        </div>

        {/* Quote Text */}
        <blockquote 
          className="relative z-10 font-garamond text-[15px] sm:text-[16px] md:text-[17px] italic text-cream mb-3 pt-5 leading-relaxed flex-1"
          style={{ wordBreak: 'break-word', hyphens: 'auto' }}
        >
          "{testimonial.quote}"
        </blockquote>

        {/* Author Info - Fixed width to prevent text break */}
        <div className="flex items-center gap-3 sm:gap-4 mt-2 pt-3 border-t border-muted/20">
          {testimonial.avatar && (
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden flex-shrink-0">
              {isAvatarLoading && (
                <div className="absolute inset-0 bg-[#2a2a2a] animate-pulse rounded-full" />
              )}
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
          <div className="flex-1 min-w-0">
            <p className="font-garamond text-[14px] sm:text-[15px] md:text-[16px] font-semibold text-cream leading-tight">
              {testimonial.name}
            </p>
            <p className="text-[8px] sm:text-[9px] md:text-[10px] text-muted tracking-wide uppercase leading-tight break-words" style={{ whiteSpace: 'normal', wordBreak: 'keep-all' }}>
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  if (!testimonials || testimonials.length === 0) {
    return (
      <section className="w-full py-16 md:py-24 px-4 sm:px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted text-xs tracking-wider uppercase">
            Add testimonials in Sanity Studio
          </p>
        </div>
      </section>
    )
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide()
    }
    if (touchStart - touchEnd < -50) {
      prevSlide()
    }
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 bg-[#080808]">
      <div className="w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="flex items-center justify-center gap-2 md:gap-3 mb-3">
            <div className="w-6 h-px bg-gradient-to-r from-transparent to-[#c9a84c]" />
            <span className="text-[9px] sm:text-[10px] text-[#c9a84c] tracking-[0.25em] uppercase font-semibold">
              Client Reviews
            </span>
            <div className="w-6 h-px bg-gradient-to-l from-transparent to-[#c9a84c]" />
          </div>

          <h2 className="text-white text-[clamp(22px,5vw,36px)] font-bold mb-2 whitespace-normal break-words max-w-[90%] mx-auto">
            What Our Clients Say
          </h2>
          <p className="text-[#888] text-[14px] sm:text-[15px] italic font-garamond max-w-md mx-auto">
            You can't go wrong with ShigoShot
          </p>
        </motion.div>

        {/* DESKTOP & TABLET VIEW — Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 w-full">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>

        {/* MOBILE VIEW — Carousel */}
        <div className="md:hidden relative px-0">
          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ width: '100%' }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="w-full flex-shrink-0 px-0"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-1.5 mt-5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all ${
                  currentIndex === index ? 'w-4 bg-[#c9a84c]' : 'w-1 bg-white/40'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}