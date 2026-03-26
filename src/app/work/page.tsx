import { client } from '@/lib/sanity'
import { getFeaturedPhotos } from '@/lib/queries'
import type { Photo } from '@/types'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WorkGallery from '@/components/sections/WorkGallery'

export const revalidate = 3600

export default async function WorkPage() {
  const photos = await client.fetch<Photo[]>(getFeaturedPhotos)

  const placeholders = [
    {
      _id: 'placeholder-1',
      title: 'Portrait Session',
      category: 'portrait',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80' },
        alt: 'Portrait photography'
      }
    },
    {
      _id: 'placeholder-2',
      title: 'Wedding Moments',
      category: 'wedding',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80' },
        alt: 'Wedding photography'
      }
    },
    {
      _id: 'placeholder-3',
      title: 'Editorial Shoot',
      category: 'editorial',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80' },
        alt: 'Editorial photography'
      }
    },
    {
      _id: 'placeholder-4',
      title: 'Commercial Brand',
      category: 'commercial',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80' },
        alt: 'Commercial photography'
      }
    },
    {
      _id: 'placeholder-5',
      title: 'Fine Art Print',
      category: 'fineart',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80' },
        alt: 'Fine art photography'
      }
    },
    {
      _id: 'placeholder-6',
      title: 'Urban Landscape',
      category: 'urban',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80' },
        alt: 'Urban photography'
      }
    },
    {
      _id: 'placeholder-7',
      title: 'Golden Hour',
      category: 'portrait',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&q=80' },
        alt: 'Golden hour portrait'
      }
    },
    {
      _id: 'placeholder-8',
      title: 'Street Life',
      category: 'documentary',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1512850183-6d7990f42385?w=800&q=80' },
        alt: 'Street photography'
      }
    },
    {
      _id: 'placeholder-9',
      title: 'Nature Study',
      category: 'fineart',
      image: {
        asset: { url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80' },
        alt: 'Nature photography'
      }
    },
  ]

  const displayPhotos = photos?.length > 0 ? photos : placeholders

  return (
    <>
      <Navbar />
      <main style={{ backgroundColor: '#080808', minHeight: '100vh' }}>
        <WorkGallery photos={displayPhotos as any} />
      </main>
      <Footer />
    </>
  )
}
