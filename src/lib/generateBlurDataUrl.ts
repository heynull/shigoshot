import { urlFor } from './sanityImageUrl'
import type { SanityImage } from '@/types'

/**
 * Generates a base64 blurDataURL from a Sanity image
 * Uses a low-quality transform (20px width, 10px blur) for optimal performance
 */
export async function generateBlurDataUrl(image: SanityImage | undefined): Promise<string | undefined> {
  if (!image?.asset) return undefined

  try {
    const blurUrl = urlFor(image)
      .width(20)
      .blur(10)
      .format('webp')
      .url()

    // Fetch the low-quality image and convert to base64
    const response = await fetch(blurUrl)
    const buffer = await response.arrayBuffer()
    const base64 = Buffer.from(buffer).toString('base64')
    
    return `data:image/webp;base64,${base64}`
  } catch (error) {
    console.error('Failed to generate blur data URL:', error)
    return undefined
  }
}

/**
 * Synchronous version that returns the blur URL string
 * (useful for server components where we can't use async)
 */
export function getBlurUrl(image: SanityImage | undefined): string {
  if (!image?.asset) return ''
  
  return urlFor(image)
    .width(20)
    .blur(10)
    .format('webp')
    .url()
}
