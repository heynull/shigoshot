import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl text-center">
        {/* 404 Number */}
        <h1 className="font-garamond text-9xl md:text-[200px] font-light text-cream leading-none mb-4">
          4
          <span className="text-gold">0</span>
          4
        </h1>

        {/* Title */}
        <h2 className="font-garamond text-4xl md:text-5xl font-light text-cream mb-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="font-montserrat text-base font-light text-muted mb-12 leading-relaxed max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 bg-gold text-black rounded-sm font-montserrat text-sm font-light uppercase tracking-widest hover:shadow-lg transition-all"
          >
            Return Home
          </Link>

          <Link
            href="/#work"
            className="px-8 py-3 border border-gold text-gold rounded-sm font-montserrat text-sm font-light uppercase tracking-widest hover:bg-gold/10 transition-all"
          >
            View Portfolio
          </Link>
        </div>

        {/* Contact Link */}
        <p className="font-montserrat text-sm text-muted mt-12">
          Need help?{' '}
          <Link href="/#contact" className="text-gold hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  )
}
