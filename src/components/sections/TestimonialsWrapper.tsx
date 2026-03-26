'use client'

import dynamic from 'next/dynamic'
import type { Testimonial } from '@/types'
import SectionSkeleton from '@/components/ui/SectionSkeleton'

// Lazy load with ssr: false in client component
const TestimonialsContent = dynamic(
  () => import('@/components/sections/Testimonials'),
  { ssr: false, loading: () => <SectionSkeleton type="testimonials" height="h-96" /> }
)

interface TestimonialsWrapperProps {
  testimonials: Testimonial[]
}

export default function TestimonialsWrapper({ testimonials }: TestimonialsWrapperProps) {
  return <TestimonialsContent testimonials={testimonials} />
}
