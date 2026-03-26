export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

/**
 * Sanity Types
 */

/**
 * Image type used across multiple document types
 * Matches Sanity's built-in image field with asset resolution
 */
export interface SanityImage {
  _type: 'image'
  asset: {
    _id: string
    _type: 'reference'
    url: string
    metadata: {
      lqip: string
      dimensions: {
        aspectRatio: number
        height: number
        width: number
      }
    }
  }
  hotspot?: {
    _type: 'sanity.imageHotspot'
    height: number
    width: number
    x: number
    y: number
  }
  crop?: {
    _type: 'sanity.imageCrop'
    bottom: number
    left: number
    right: number
    top: number
  }
  alt: string
}

/**
 * Photo document type
 * Represents individual photographs in the portfolio
 */
export interface Photo {
  _id: string
  _type: 'photo'
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  category: 'portrait' | 'editorial' | 'landscape' | 'urban' | 'fineArt' | 'documentary' | 'fashion'
  image: SanityImage
  series?: {
    _id: string
    title: string
    slug: {
      current: string
    }
    number: number
  }
  featured: boolean
  order: number
  year: number
}

/**
 * Series document type
 * Represents collections of related photos
 */
export interface Series {
  _id: string
  _type: 'series'
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  number: number
  coverImage: SanityImage
  description?: string
  year: number
  photoCount: number
}

/**
 * Testimonial document type
 * Represents client reviews and feedback
 */
export interface Testimonial {
  _id: string
  _type: 'testimonial'
  name: string
  role: string
  company: string
  quote: string
  avatar: SanityImage
}

/**
 * Site settings document type
 * Global site configuration (singleton document)
 */
export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  title: string
  description?: string
  heroImage: SanityImage
}
