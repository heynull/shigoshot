'use client'

import { motion } from 'framer-motion'

export default function CTABanner() {
  return (
    <section className="bg-[#111111] px-6 py-24 tablet:px-12 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-3xl">
        {/* Fade + Scale In */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Headline */}
          <h2 className="text-white text-4xl tablet:text-5xl lg:text-6xl font-bold font-[Montserrat] mb-6 tablet:mb-8 leading-tight">
            Ready to tell your story?
          </h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#999999] text-sm tablet:text-base leading-relaxed mb-10 tablet:mb-12 max-w-2xl mx-auto"
          >
            Whether you're planning a wedding, brand campaign, or fine art commission — we'd love to create
            something extraordinary together.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="
              px-9 py-4 rounded-full
              bg-[#1a1a1a] text-[#ffffff]
              border border-[#1a1a1a]
              font-[Montserrat] font-bold text-sm
              transition-all duration-300 ease-out
              hover:bg-[#2a2a2a] hover:border-[#2a2a2a]
              flex items-center gap-2 mx-auto
            "
          >
            Start your project <span>→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
