import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    screens: {
      // Mobile-first: mobile < 768px, tablet 768px-1024px, desktop 1024px+
      tablet: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        black: '#080808',
        deep: '#0e0e0e',
        surface: '#141414',
        gold: '#c9a84c',
        'gold-light': '#e8c97e',
        cream: '#f0ead8',
        muted: '#6a6a6a',
        text: '#d4cfc5',
      },
      fontFamily: {
        garamond: [
          'Cormorant Garamond',
          'serif',
        ],
        montserrat: [
          'Montserrat',
          'sans-serif',
        ],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        /* Fluid Typography */
        'fluid-display': 'clamp(44px, 8vw, 110px)',
        'fluid-section-title': 'clamp(32px, 5vw, 68px)',
        'fluid-subheading': 'clamp(22px, 3vw, 38px)',
        'fluid-card-title': 'clamp(18px, 2.2vw, 26px)',
        'fluid-body': 'clamp(13px, 1.2vw, 15px)',
        'fluid-label': 'clamp(8px, 0.9vw, 10px)',
        'fluid-stat-number': 'clamp(40px, 6vw, 72px)',
        'fluid-quote': 'clamp(16px, 1.8vw, 20px)',
        'fluid-process-step': 'clamp(16px, 2vw, 22px)',
      },
    },
  },
  plugins: [],
};

export default config;
