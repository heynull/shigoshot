'use client'

import dynamic from 'next/dynamic'
import SectionSkeleton from '@/components/ui/SectionSkeleton'

// Lazy load with ssr: false in client component
const ContactContent = dynamic(
  () => import('@/components/sections/Contact'),
  { ssr: false, loading: () => <SectionSkeleton type="contact" height="h-[600px]" /> }
)

export default function ContactWrapper() {
  return <ContactContent />
}
