import { defineQuery } from 'next-sanity'

/**
 * Fetch all featured photos ordered by display order
 * Used for portfolio showcase sections
 */
export const getFeaturedPhotos = defineQuery(`
  *[_type == "photo" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    category,
    featured,
    order,
    year,
    image {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt,
      hotspot,
      crop
    },
    "series": series->{
      _id,
      title,
      slug,
      number
    }
  }
`)

/**
 * Fetch all photo series ordered by series number
 * Each series is a collection of related photos
 */
export const getAllSeries = defineQuery(`
  *[_type == "series"] | order(number asc) {
    _id,
    title,
    slug,
    number,
    description,
    year,
    photoCount,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt,
      hotspot,
      crop
    }
  }
`)

/**
 * Fetch all testimonials for client reviews section
 */
export const getTestimonials = defineQuery(`
  *[_type == "testimonial"] {
    _id,
    name,
    role,
    company,
    quote,
    avatar {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt,
      hotspot,
      crop
    }
  }
`)

/**
 * Fetch complete site settings
 * Single document that stores global site configuration, hero image, and stats
 */
export const getSiteSettings = defineQuery(`
  *[_type == "siteSettings"][0] {
    _id,
    title,
    yearsExperience,
    projectsCompleted,
    countriesVisited,
    awardsCount,
    photographerImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt,
      hotspot,
      crop
    },
    heroImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      alt,
      hotspot,
      crop
    }
  }
`)

/**
 * Fetch hero image from site settings
 * Alias for getSiteSettings for backwards compatibility
 */
export const getHeroImage = getSiteSettings
