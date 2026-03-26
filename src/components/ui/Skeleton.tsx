import React from 'react'

interface SkeletonProps {
  className?: string
}

export default function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`bg-skeleton animate-shimmer ${className}`}
      style={{
        background: 'linear-gradient(90deg, #141414 25%, #1e1e1e 50%, #141414 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.8s infinite',
      }}
    />
  )
}
