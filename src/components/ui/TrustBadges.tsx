'use client'

import { motion } from 'motion/react'
import { Star, Users, Award, Shield, MapPin } from 'lucide-react'

interface TrustBadgesProps {
  variant?: 'horizontal' | 'vertical' | 'compact'
  showAll?: boolean
  className?: string
}

const badges = [
  {
    icon: Star,
    value: '5.0',
    label: 'Rating Google',
    color: 'accent',
  },
  {
    icon: Users,
    value: '100+',
    label: 'Clienti Soddisfatti',
    color: 'primary',
  },
  {
    icon: Award,
    value: '3+',
    label: 'Anni Esperienza',
    color: 'sage',
  },
  {
    icon: Shield,
    value: '100%',
    label: 'Trainer Certificati',
    color: 'primary',
  },
  {
    icon: MapPin,
    value: 'Milano',
    label: 'Centro Città',
    color: 'accent',
  },
]

export function TrustBadges({
  variant = 'horizontal',
  showAll = false,
  className = '',
}: TrustBadgesProps) {
  const displayedBadges = showAll ? badges : badges.slice(0, 3)

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center gap-4 ${className}`}>
        {displayedBadges.map((badge, index) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="trust-badge"
          >
            <badge.icon className={`w-4 h-4 text-[--color-${badge.color}]`} />
            <span className="font-medium text-[--color-text]">{badge.value}</span>
            <span className="text-[--color-text-muted]">{badge.label}</span>
          </motion.div>
        ))}
      </div>
    )
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col gap-4 ${className}`}>
        {displayedBadges.map((badge, index) => (
          <motion.div
            key={badge.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-white rounded-lg border border-[--color-border-light] hover:border-[--color-primary] hover:shadow-sm transition-all group"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors
              ${badge.color === 'accent' ? 'bg-[--color-accent]/10 group-hover:bg-[--color-accent]/20' : ''}
              ${badge.color === 'primary' ? 'bg-[--color-primary]/10 group-hover:bg-[--color-primary]/20' : ''}
              ${badge.color === 'sage' ? 'bg-[--color-accent-sage]/10 group-hover:bg-[--color-accent-sage]/20' : ''}
            `}>
              <badge.icon className={`w-5 h-5
                ${badge.color === 'accent' ? 'text-[--color-accent]' : ''}
                ${badge.color === 'primary' ? 'text-[--color-primary]' : ''}
                ${badge.color === 'sage' ? 'text-[--color-accent-sage]' : ''}
              `} />
            </div>
            <div>
              <p className="font-medium text-[--color-text] text-lg">{badge.value}</p>
              <p className="text-[--color-text-muted] text-sm">{badge.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  // Default: horizontal
  return (
    <div className={`flex flex-wrap justify-center gap-6 ${className}`}>
      {displayedBadges.map((badge, index) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-[--color-border-light] hover:border-[--color-primary] hover:shadow-md transition-all min-w-[140px]"
        >
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3
            ${badge.color === 'accent' ? 'bg-[--color-accent]/10' : ''}
            ${badge.color === 'primary' ? 'bg-[--color-primary]/10' : ''}
            ${badge.color === 'sage' ? 'bg-[--color-accent-sage]/10' : ''}
          `}>
            <badge.icon className={`w-6 h-6
              ${badge.color === 'accent' ? 'text-[--color-accent]' : ''}
              ${badge.color === 'primary' ? 'text-[--color-primary]' : ''}
              ${badge.color === 'sage' ? 'text-[--color-accent-sage]' : ''}
            `} />
          </div>
          <p className="font-medium text-[--color-text] text-xl mb-1">{badge.value}</p>
          <p className="text-[--color-text-muted] text-xs uppercase tracking-wide">{badge.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

// Star Rating Component
interface StarRatingProps {
  rating: number
  maxStars?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
}

export function StarRating({
  rating,
  maxStars = 5,
  size = 'md',
  showValue = false,
}: StarRatingProps) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <div className="star-rating flex items-center gap-1">
      {[...Array(maxStars)].map((_, i) => (
        <Star
          key={i}
          className={`${sizes[size]} ${
            i < rating
              ? 'star fill-[--color-accent] text-[--color-accent]'
              : 'star-empty fill-[--color-border] text-[--color-border]'
          }`}
        />
      ))}
      {showValue && (
        <span className="ml-2 text-sm font-medium text-[--color-text]">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

// Counter Animation Component
interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
}: AnimatedCounterProps) {
  return (
    <motion.span
      className="counter-number"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {prefix}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration,
            ease: 'easeOut',
          }}
        >
          {value}
        </motion.span>
        {suffix}
      </motion.span>
    </motion.span>
  )
}
