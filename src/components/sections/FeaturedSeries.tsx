'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Series } from '@/types'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import Skeleton from '@/components/ui/Skeleton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { urlFor } from '@/lib/sanity'

interface FeaturedSeriesProps {
  series: Series[]
}

const EASING = { type: 'tween', ease: [0.25, 0.46, 0.45, 0.94] } as const

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

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
}

export default function FeaturedSeries({ series }: FeaturedSeriesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>(
    series.reduce((acc, item) => ({ ...acc, [item._id]: true }), {})
  )
  const { prefersReducedMotion } = useReducedMotion()

  const formatNumber = (num: number) => String(num).padStart(2, '0')

  const handleImageLoad = (itemId: string) => {
    setLoadingImages((prev) => ({
      ...prev,
      [itemId]: false,
    }))
  }

  // Return null if no series data
  if (!series || series.length === 0) return null

  return (
    <RevealOnScroll>
      <motion.div
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        className="w-full"
      >
        {/* Desktop Grid: 3 columns */}
        <div className="hidden lg:grid grid-cols-3 gap-3">
          {series.map((item, index) => (
            <motion.div
              key={item._id}
              variants={ITEM_VARIANTS}
              className="relative overflow-hidden rounded-sm"
              onMouseEnter={() => setHoveredId(item._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container with portrait ratio 3:4 */}
              <motion.div
                className="relative w-full aspect-[3/4]"
                animate={{ scale: !prefersReducedMotion && hoveredId === item._id ? 1.04 : 1 }}
                transition={{ duration: 0.6, ...EASING }}
              >
                {loadingImages[item._id] && <Skeleton className="absolute inset-0 z-10" />}
                <Image
                  src={urlFor(item.coverImage).width(800).format('webp').url()}
                  alt={item.coverImage.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onLoad={() => handleImageLoad(item._id)}
                />
              </motion.div>

              {/* Bottom Overlay */}
              <div className="series-card-overlay absolute inset-0 flex flex-col justify-end p-7" style={{ backgroundImage: 'linear-gradient(to top, rgba(8,8,8,0.88) 0%, transparent 55%)' }}>
                {/* View Series Text - Fades In */}
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{
                    opacity: !prefersReducedMotion && hoveredId === item._id ? 1 : 0,
                    y: !prefersReducedMotion && hoveredId === item._id ? 0 : 5,
                  }}
                  transition={{
                    duration: 0.6,
                    ...EASING,
                  }}
                >
                  <p className="text-fluid-label text-gold">
                    View Series →
                  </p>
                </motion.div>

                {/* Large Italic Number - Opacity Transition */}
                <motion.div
                  className="mb-4"
                  animate={{
                    opacity: !prefersReducedMotion && hoveredId === item._id ? 0.8 : 0.4,
                  }}
                  transition={{
                    duration: 0.6,
                    ...EASING,
                  }}
                >
                  <p className="font-garamond text-fluid-stat-number italic text-gold">
                    {formatNumber(item.number)}
                  </p>
                </motion.div>

                {/* Series Name */}
                <h3 className="font-garamond text-fluid-card-title font-light text-cream mb-2">
                  {item.title}
                </h3>

                {/* Photo Count + Year */}
                <p className="text-fluid-label text-muted">
                  {item.photoCount} {item.photoCount === 1 ? 'Photo' : 'Photos'} • {item.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tablet Grid: 2 columns + full-width 3rd */}
        <div className="hidden tablet:grid lg:hidden gap-3">
          {/* Top: 2-column layout */}
          <div className="grid grid-cols-2 gap-3">
            {series.slice(0, 2).map((item, index) => (
              <motion.div
                key={item._id}
                variants={ITEM_VARIANTS}
                className="relative overflow-hidden rounded-sm"
                onMouseEnter={() => setHoveredId(item._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Container with portrait ratio 3:4 */}
                <motion.div
                  className="relative w-full aspect-[3/4]"
                  animate={{ scale: hoveredId === item._id ? 1.04 : 1 }}
                  transition={{ duration: 0.6, ...EASING }}
                >
                  {loadingImages[item._id] && <Skeleton className="absolute inset-0 z-10" />}
                  <Image
                    src={urlFor(item.coverImage).width(800).format('webp').url()}
                    alt={item.coverImage.alt}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    onLoad={() => handleImageLoad(item._id)}
                  />
                </motion.div>

                {/* Bottom Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
                  {/* View Series Text - Fades In */}
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{
                      opacity: hoveredId === item._id ? 1 : 0,
                      y: hoveredId === item._id ? 0 : 5,
                    }}
                    transition={{
                      duration: 0.6,
                      ...EASING,
                    }}
                  >
                    <p className="text-fluid-label text-gold">
                      View Series →
                    </p>
                  </motion.div>

                  {/* Large Italic Number - Opacity Transition */}
                  <motion.div
                    className="mb-4"
                    animate={{
                      opacity: hoveredId === item._id ? 0.8 : 0.4,
                    }}
                    transition={{
                      duration: 0.6,
                      ...EASING,
                    }}
                  >
                    <p className="font-garamond text-fluid-stat-number italic text-gold">
                      {formatNumber(item.number)}
                    </p>
                  </motion.div>

                  {/* Series Name */}
                  <h3 className="font-garamond text-fluid-card-title font-light text-cream mb-2">
                    {item.title}
                  </h3>

                  {/* Photo Count + Year */}
                  <p className="text-fluid-label text-muted">
                    {item.photoCount} {item.photoCount === 1 ? 'Photo' : 'Photos'} • {item.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom: Full-width 3rd card */}
          {series.length > 2 && (
            <motion.div
              key={series[2]._id}
              variants={ITEM_VARIANTS}
              className="relative overflow-hidden rounded-sm"
              onMouseEnter={() => setHoveredId(series[2]._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container with portrait ratio 3:4 */}
              <motion.div
                className="relative w-full aspect-[3/4]"
                animate={{ scale: hoveredId === series[2]._id ? 1.04 : 1 }}
                transition={{ duration: 0.6, ...EASING }}
              >
                {loadingImages[series[2]._id] && <Skeleton className="absolute inset-0 z-10" />}
                <Image
                  src={urlFor(series[2].coverImage).width(800).format('webp').url()}
                  alt={series[2].coverImage.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  onLoad={() => handleImageLoad(series[2]._id)}
                />
              </motion.div>

              {/* Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5">
                {/* View Series Text - Fades In */}
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{
                    opacity: hoveredId === series[2]._id ? 1 : 0,
                    y: hoveredId === series[2]._id ? 0 : 5,
                  }}
                  transition={{
                    duration: 0.6,
                    ...EASING,
                  }}
                >
                  <p className="text-fluid-label text-gold">
                    View Series →
                  </p>
                </motion.div>

                {/* Large Italic Number - Opacity Transition */}
                <motion.div
                  className="mb-4"
                  animate={{
                    opacity: hoveredId === series[2]._id ? 0.8 : 0.4,
                  }}
                  transition={{
                    duration: 0.6,
                    ...EASING,
                  }}
                >
                  <p className="font-garamond text-fluid-stat-number italic text-gold">
                    {formatNumber(series[2].number)}
                  </p>
                </motion.div>

                {/* Series Name */}
                <h3 className="font-garamond text-fluid-card-title font-light text-cream mb-2">
                  {series[2].title}
                </h3>

                {/* Photo Count + Year */}
                <p className="text-fluid-label text-muted">
                  {series[2].photoCount} {series[2].photoCount === 1 ? 'Photo' : 'Photos'} • {series[2].year}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Mobile Stack: Scroll-snap carousel */}
        <div className="tablet:hidden scroll-snap-carousel">
          {series.map((item, index) => (
            <motion.div
              key={item._id}
              variants={ITEM_VARIANTS}
              className="scroll-snap-item relative overflow-hidden rounded-sm flex-shrink-0"
              onMouseEnter={() => setHoveredId(item._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Container with portrait ratio 3:4 */}
              <motion.div
                className="relative w-full aspect-[3/4]"
                animate={{ scale: !prefersReducedMotion && hoveredId === item._id ? 1.04 : 1 }}
                transition={{ duration: 0.6, ...EASING }}
              >
                {loadingImages[item._id] && <Skeleton className="absolute inset-0 z-10" />}
                <Image
                  src={urlFor(item.coverImage).width(800).format('webp').url()}
                  alt={item.coverImage.alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 85vw, (max-width: 1200px) 100vw, 33vw"
                  onLoad={() => handleImageLoad(item._id)}
                />
              </motion.div>

              {/* Bottom Overlay */}
              <div className="series-card-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
                {/* View Series Text - Always visible on mobile, fades on desktop hover */}
                <motion.div
                  className="mb-3"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{
                    opacity: !prefersReducedMotion && hoveredId === item._id ? 1 : prefersReducedMotion ? 1 : 0,
                    y: !prefersReducedMotion && hoveredId === item._id ? 0 : 5,
                  }}
                  transition={{
                    duration: 0.6,
                    ...EASING,
                  }}
                >
                  <p className="text-fluid-label text-gold">
                    View Series →
                  </p>
                </motion.div>

                {/* Large Italic Number - Opacity Transition */}
                <motion.div
                  className="mb-3"
                  animate={{
                    opacity: !prefersReducedMotion && hoveredId === item._id ? 0.8 : 0.4,
                  }}
                  transition={{
                    duration: 0.6,
                    ...EASING,
                  }}
                >
                  <p className="font-garamond text-fluid-stat-number italic text-gold">
                    {formatNumber(item.number)}
                  </p>
                </motion.div>
                {/* Large Italic Number */}
                <div className="mb-4">
                  <p className="font-garamond text-fluid-stat-number italic text-gold opacity-40">
                    {formatNumber(item.number)}
                  </p>
                </div>

                {/* Series Name */}
                <h3 className="font-garamond text-fluid-card-title font-light text-cream mb-2">
                  {item.title}
                </h3>

                {/* Photo Count + Year */}
                <p className="text-fluid-label text-muted">
                  {item.photoCount} {item.photoCount === 1 ? 'Photo' : 'Photos'} • {item.year}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </RevealOnScroll>
  )
}
