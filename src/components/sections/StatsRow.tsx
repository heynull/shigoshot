'use client'
import { useEffect, useRef, useState } from 'react'

interface StatsRowProps {
  yearsExperience?: number
  projectsCompleted?: number
  countriesVisited?: number
  awardsCount?: number
}

export default function StatsRow({ 
  yearsExperience,
  projectsCompleted,
  countriesVisited,
  awardsCount
}: StatsRowProps) {
  const stats = [
    { label: 'Years Experience', suffix: '+', value: yearsExperience ?? 12 },
    { label: 'Projects Completed', suffix: '+', value: projectsCompleted ?? 340 },
    { label: 'Countries', suffix: '', value: countriesVisited ?? 28 },
    { label: 'Awards Won', suffix: '×', value: awardsCount ?? 4 },
  ]

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])

  return count
}

function StatItem({ 
  label, 
  suffix, 
  value,
  index,
  borderClasses,
}: { 
  label: string
  suffix: string
  value: number
  index: number
  borderClasses: string
}) {
  const [hovered, setHovered] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const count = useCountUp(value, 2000, inView)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={borderClasses}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '40px 16px',
        textAlign: 'center',
        cursor: 'default',
        position: 'relative',
        transition: 'background 0.3s ease',
        background: hovered ? 'rgba(201,168,76,0.04)' : 'transparent',
      }}
    >
      {/* Top gold line on hover */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        height: '2px',
        width: hovered ? '60%' : '0%',
        background: 'linear-gradient(to right, transparent, #c9a84c, transparent)',
        transition: 'width 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }} />

      {/* Number */}
      <div style={{
        fontSize: 'clamp(28px, 5vw, 60px)',
        fontWeight: 700,
        color: hovered ? '#c9a84c' : 'white',
        lineHeight: 1,
        marginBottom: '10px',
        transition: 'color 0.3s ease',
        letterSpacing: '-0.02em',
      }}>
        {count}
        <span style={{
          color: '#c9a84c',
          fontSize: '0.45em',
          marginLeft: '2px',
          verticalAlign: 'super',
        }}>
          {suffix}
        </span>
      </div>

      {/* Label */}
      <div style={{
        fontSize: 'clamp(8px, 1.5vw, 10px)',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: hovered ? '#aaa' : '#666',
        transition: 'color 0.3s ease',
      }}>
        {label}
      </div>

      {/* Bottom gold line on hover */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        height: '2px',
        width: hovered ? '60%' : '0%',
        background: 'linear-gradient(to right, transparent, #c9a84c, transparent)',
        transition: 'width 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
      }} />
    </div>
  )
}

  return (
    <section style={{
      backgroundColor: '#080808',
      borderTop: '1px solid #1a1a1a',
      borderBottom: '1px solid #1a1a1a',
      width: '100%',
    }}>
      {/* Use Tailwind grid — 2 cols mobile, 4 cols desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 w-full">
        {stats.map((stat, index) => {
          // Border logic using Tailwind
          // Mobile 2x2: right border on col 1, bottom border on row 1
          // Desktop 4col: right border on all except last
          const borderClasses = `
            ${index % 2 === 0 ? 'border-r border-r-[#1e1e1e]' : ''}
            ${index < 2 ? 'border-b border-b-[#1e1e1e]' : ''}
            lg:border-b-0
            ${index < 3 ? 'lg:border-r lg:border-r-[#1e1e1e]' : 'lg:border-r-0'}
          `

          return (
            <StatItem
              key={stat.label}
              label={stat.label}
              suffix={stat.suffix}
              value={Number(stat.value)}
              index={index}
              borderClasses={borderClasses}
            />
          )
        })}
      </div>
    </section>
  )
}
