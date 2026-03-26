import { useEffect, useState } from 'react'

/**
 * Hook to detect if user has "reduce motion" preference enabled in OS
 * Returns animation configuration that respects user preferences
 * If reduce motion is enabled, returns zero durations for instant display
 */
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return {
    prefersReducedMotion,
    // Helper function to apply reduced motion duration
    duration: prefersReducedMotion ? 0 : 1,
    // Disabled animations object for Framer Motion
    motionConfig: prefersReducedMotion
      ? { duration: 0, transition: {} }
      : { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }
}
