'use client'

import { useReducedMotion } from '@/hooks/useReducedMotion'

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  className?: string
}

export function Skeleton({
  variant = 'rectangular',
  width,
  height,
  className = ''
}: SkeletonProps) {
  const prefersReducedMotion = useReducedMotion()

  const baseClasses = 'bg-[--color-bg-accent]'
  const animationClasses = prefersReducedMotion ? '' : 'animate-pulse'

  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${animationClasses}
        ${className}
      `}
      style={style}
    />
  )
}

// Preset components
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-[--color-border] p-4 space-y-4">
      <Skeleton variant="rectangular" height={200} />
      <div className="space-y-2">
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  )
}

export function SkeletonAvatar({ size = 48 }: { size?: number }) {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
    />
  )
}
