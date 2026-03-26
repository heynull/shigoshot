import { Metadata } from 'next'
import { client } from '@/lib/sanity'
import {
  getFeaturedPhotos,
  getSiteSettings,
  getTestimonials,
} from '@/lib/queries'
import type { Photo, SanityImage, Testimonial } from '@/types'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import WhatWeDo from '@/components/sections/WhatWeDo'
import PortfolioGrid from '@/components/sections/PortfolioGrid'
import StatsRow from '@/components/sections/StatsRow'
import Testimonials from '@/components/sections/Testimonials'
import CTABanner from '@/components/sections/CTABanner'
import ContactWrapper from '@/components/sections/ContactWrapper'
import Footer from '@/components/layout/Footer'

interface SiteSettings {
  _id: string
  title?: string
  yearsExperience?: number
  projectsCompleted?: number
  countriesVisited?: number
  awardsCount?: number
  photographerImage?: SanityImage
  heroImage?: SanityImage
}

export const revalidate = 3600 // ISR: revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  try {
    const siteSettings = await client.fetch<SiteSettings>(getSiteSettings)

    return {
      title: siteSettings?.title || 'ShigoShots — Photography',
      description:
        siteSettings?.description ||
        'Professional photography portfolio — portraits, weddings, editorial and fine art photography based in Lagos, Nigeria.',
      openGraph: {
        title: siteSettings?.title || 'ShigoShots — Photography',
        description:
          siteSettings?.description ||
          'Professional photography portfolio — portraits, weddings, editorial and fine art photography based in Lagos, Nigeria.',
        type: 'website',
        url: 'https://elenaram.com',
        images: siteSettings?.heroImage?.asset?.url
          ? [
              {
                url: siteSettings.heroImage.asset.url,
                width: siteSettings.heroImage.asset.metadata?.dimensions?.width || 1200,
                height: siteSettings.heroImage.asset.metadata?.dimensions?.height || 630,
                alt: siteSettings.heroImage.alt || 'Elena Maris Portfolio',
              },
            ]
          : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: siteSettings?.title || 'ShigoShots — Photography',
        description:
          siteSettings?.description ||
          'Professional photography portfolio — portraits, weddings, editorial and fine art photography based in Lagos, Nigeria.',
        images: siteSettings?.heroImage?.asset?.url
          ? [siteSettings.heroImage.asset.url]
          : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'ShigoShots — Photography',
      description: 'Editorial and fine art photography portfolio.',
    }
  }
}

export default async function Home() {
  try {
    // Fetch all data in parallel
    const [featuredPhotos, siteSettings, testimonials] = await Promise.all([
      client.fetch<Photo[]>(getFeaturedPhotos),
      client.fetch<SiteSettings>(getSiteSettings),
      client.fetch<Testimonial[]>(getTestimonials),
    ])

    // Debug logging to verify data from Sanity
    console.log('Featured photos count:', featuredPhotos?.length)
    console.log('Testimonials count:', testimonials?.length)
    console.log('SiteSettings:', siteSettings?.photographerName)

    return (
      <>
        <Navbar />

        <main style={{ overflowX: 'hidden', width: '100%' }}>
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About photographerImage={siteSettings?.photographerImage} />

          {/* What We Do Section */}
          <section id="services">
            <WhatWeDo photos={featuredPhotos} />
          </section>

          {/* Portfolio Grid Section */}
          <section id="portfolio">
            <PortfolioGrid photos={featuredPhotos} />
          </section>

          {/* Stats Row Section */}
          <StatsRow
            yearsExperience={siteSettings?.yearsExperience}
            projectsCompleted={siteSettings?.projectsCompleted}
            countriesVisited={siteSettings?.countriesVisited}
            awardsCount={siteSettings?.awardsCount}
          />

          {/* Testimonials Section */}
          {testimonials && testimonials.length > 0 && (
            <section id="testimonials">
              <Testimonials testimonials={testimonials} />
            </section>
          )}

          {/* CTA Banner Section */}
          <CTABanner />

          {/* Contact Section - Lazy loaded */}
          <section id="contact">
            <ContactWrapper />
          </section>
        </main>

        <Footer />
      </>
    )
  } catch (error) {
    console.error('Error fetching page data:', error)

    // Fallback render with placeholder UI
    return (
      <>
        <Navbar />

        <main className="w-full">
          <div className="min-h-[100svh] flex items-center justify-center bg-black">
            <div className="text-center">
              <h1 className="font-montserrat text-5xl text-white mb-4">
                ShigoShots
              </h1>
              <p className="font-montserrat text-gray-500">
                Please refresh the page.
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </>
    )
  }
}
