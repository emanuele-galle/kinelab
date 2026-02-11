'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, Clock, Users, Flame, TrendingUp, Zap } from 'lucide-react'
import type { Service } from '@/data'
import { services as defaultServices } from '@/data'
import { RatingDisplay } from '@/components/ui/RatingDisplay'
import { PricingPanel } from '@/components/ui/PricingPanel'
import { useMagneticCursor } from '@/hooks/useMagneticCursor'

// ============================================
// CATEGORY COLOR ACCENTS (Premium Brand Differentiation)
// ============================================
const categoryColors: Record<string, {
  accent: string        // Left border color
  badgeBg: string      // Badge background
  glow: string         // Hover glow effect
}> = {
  pilates: {
    accent: '#7A8B6E',     // Soft sage green - calming, wellness
    badgeBg: 'rgba(122, 139, 110, 0.1)',
    glow: 'rgba(122, 139, 110, 0.3)',
  },
  functional: {
    accent: '#E87722',     // Vibrant orange - energetic, powerful
    badgeBg: 'rgba(232, 119, 34, 0.1)',
    glow: 'rgba(232, 119, 34, 0.3)',
  },
  personal: {
    accent: '#2C3E50',     // Deep navy - professional, exclusive
    badgeBg: 'rgba(44, 62, 80, 0.1)',
    glow: 'rgba(44, 62, 80, 0.3)',
  },
}

// ============================================
// SOCIAL PROOF DATA (Ratings, Reviews, Bookings)
// ============================================
const socialProofData: Record<string, {
  rating: number
  reviews: number
  bookings: number
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzato'
  difficultyColor: string
}> = {
  pilates: {
    rating: 4.9,
    reviews: 142,
    bookings: 23,
    difficulty: 'Principiante',
    difficultyColor: '#00C853', // Green
  },
  functional: {
    rating: 4.8,
    reviews: 98,
    bookings: 17,
    difficulty: 'Intermedio',
    difficultyColor: '#FF9800', // Orange
  },
  personal: {
    rating: 5.0,
    reviews: 67,
    bookings: 8,
    difficulty: 'Avanzato',
    difficultyColor: '#FF5252', // Red
  },
}

// ============================================
// URGENCY BADGES (Enhanced with animation)
// ============================================
const urgencyBadges: Record<string, {
  text: string
  icon: 'flame' | 'trending' | 'zap'
  color: string
  pulse: boolean
} | null> = {
  pilates: {
    text: 'Più richiesto',
    icon: 'flame',
    color: 'bg-orange-500',
    pulse: true,
  },
  personal: {
    text: 'Posti limitati',
    icon: 'trending',
    color: 'bg-red-500',
    pulse: true,
  },
  functional: {
    text: 'Nuovo',
    icon: 'zap',
    color: 'bg-blue-500',
    pulse: false,
  },
}

// ============================================
// MEDIA ASSETS (Image + Video)
// ============================================
const categoryMedia: Record<string, {
  image: { src: string; alt: string }
  video: { src: string; poster: string }
}> = {
  pilates: {
    image: {
      src: '/images/reformer-gruppo-1.jpg',
      alt: 'Lezione Pilates Reformer di gruppo - KineLab Milano',
    },
    video: {
      src: '',
      poster: '/images/reformer-gruppo-1.jpg',
    },
  },
  functional: {
    image: {
      src: '/images/studio-functional-area.jpg',
      alt: 'Area Functional Training con power rack - KineLab Milano',
    },
    video: {
      src: '',
      poster: '/images/studio-functional-area.jpg',
    },
  },
  personal: {
    image: {
      src: '/images/personal-training-1.jpg',
      alt: 'Sessione Personal Training con trainer - KineLab Milano',
    },
    video: {
      src: '',
      poster: '/images/personal-training-1.jpg',
    },
  },
}


// ============================================
// FEATURE BADGES
// ============================================
const categoryFeatures: Record<string, string[]> = {
  pilates: ['Mat Pilates', 'Reformer', 'Small Group'],
  functional: ['Bodyweight', 'Kettlebell', 'TRX'],
  personal: ['1-to-1', 'Programma su misura', 'Monitoraggio'],
}

// ============================================
// SESSION TYPE
// ============================================
const categoryType: Record<string, string> = {
  pilates: 'Individuale / Gruppo',
  functional: 'Individuale / Gruppo',
  personal: 'Solo individuale',
}

// ============================================
// SERVICE CARD COMPONENT (with Magnetic CTA)
// ============================================
interface ServiceCardProps {
  service: Service
  index: number
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const [showPricing, setShowPricing] = useState(false)
  const [hasHover, setHasHover] = useState(false)
  const { elementRef, magneticStyle } = useMagneticCursor({ strength: 8, radius: 100 })

  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover)').matches)
  }, [])

  const mediaData = categoryMedia[service.category] || categoryMedia.pilates
  const socialProof = socialProofData[service.category]
  const categoryColor = categoryColors[service.category]
  const urgencyBadge = urgencyBadges[service.category]

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
    >
      <Link href={`/servizi/${service.slug}`} className="group block">
        <motion.div
          className="relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4] shadow-2xl"
          whileHover={{ scale: 1.05, y: -12 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          onHoverStart={() => setShowPricing(true)}
          onHoverEnd={() => setShowPricing(false)}
          style={{
            boxShadow: `0 20px 60px -15px rgba(0,0,0,0.3)`,
          }}
        >
          {/* Category Accent Bar (Left Edge) */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 z-10"
            style={{ backgroundColor: categoryColor.accent }}
          />

          {/* Background Image with hover zoom */}
          <div className="absolute inset-0 transition-all duration-800 group-hover:scale-110">
            <Image
              src={mediaData.image.src}
              alt={mediaData.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={index === 0}
            />
          </div>

          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />

          {/* Enhanced Particle System (12-15 particles) - hidden on mobile */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none hidden md:block">
            {/* Particle 1 */}
            <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-white/30 rounded-full animate-float" />
            <div className="absolute top-[35%] left-[25%] w-1.5 h-1.5 bg-white/25 rounded-full animate-float-delayed" />
            <div className="absolute top-[50%] left-[10%] w-1 h-1 bg-white/20 rounded-full animate-float-slow" />

            {/* Particle 2 */}
            <div className="absolute top-[25%] right-[20%] w-2.5 h-2.5 bg-white/35 rounded-full animate-float-slow" />
            <div className="absolute top-[40%] right-[30%] w-1 h-1 bg-white/20 rounded-full animate-float" />
            <div className="absolute top-[60%] right-[15%] w-1.5 h-1.5 bg-white/25 rounded-full animate-float-delayed" />

            {/* Particle 3 */}
            <div className="absolute top-[70%] left-[40%] w-2 h-2 bg-white/30 rounded-full animate-float" />
            <div className="absolute top-[80%] left-[60%] w-1 h-1 bg-white/20 rounded-full animate-float-slow" />
            <div className="absolute top-[65%] left-[50%] w-1.5 h-1.5 bg-white/25 rounded-full animate-float-delayed" />

            {/* Particle 4 */}
            <div className="absolute top-[15%] left-[70%] w-2 h-2 bg-white/30 rounded-full animate-float-delayed" />
            <div className="absolute top-[45%] left-[80%] w-1 h-1 bg-white/20 rounded-full animate-float" />
            <div className="absolute top-[55%] left-[90%] w-1.5 h-1.5 bg-white/25 rounded-full animate-float-slow" />
          </div>

          {/* Urgency Badge (top right) - Enhanced with pulse */}
          {urgencyBadge && (
            <div
              className={`absolute top-4 right-4 ${urgencyBadge.color} text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-sm z-10 ${
                urgencyBadge.pulse ? 'animate-pulse' : ''
              }`}
            >
              {urgencyBadge.icon === 'flame' && <Flame className="w-3.5 h-3.5" />}
              {urgencyBadge.icon === 'trending' && <TrendingUp className="w-3.5 h-3.5" />}
              {urgencyBadge.icon === 'zap' && <Zap className="w-3.5 h-3.5" />}
              {urgencyBadge.text}
            </div>
          )}

          {/* Main Content (bottom - Premium Hierarchy) */}
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-10 text-white">
            {/* TIER 1: Category + Service Name */}
            <div className="mb-4">
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-2 opacity-90"
                style={{ color: categoryColor.accent }}
              >
                {service.category}
              </p>
              <h3 className="text-2xl md:text-4xl font-bold mb-3 tracking-tight leading-tight">
                {service.name}
              </h3>
            </div>

            {/* TIER 2: Social Proof (Rating + Reviews + Bookings) */}
            {socialProof && (
              <div className="mb-3">
                <RatingDisplay
                  rating={socialProof.rating}
                  reviews={socialProof.reviews}
                  bookings={socialProof.bookings}
                  showBookings={true}
                />
              </div>
            )}

            {/* TIER 3: Feature Badges (chips) */}
            <div className="flex flex-wrap gap-2 mb-4">
              {categoryFeatures[service.category]?.map((feature) => (
                <span
                  key={feature}
                  className="px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/20"
                  style={{ backgroundColor: categoryColor.badgeBg }}
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* TIER 4: Meta Info (Duration, Type, Difficulty) */}
            <div className="flex items-center gap-2 md:gap-4 flex-wrap text-sm mb-4 opacity-90">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {service.duration || 60} min
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                {categoryType[service.category] || 'Individuale'}
              </span>
              {socialProof && (
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: `${socialProof.difficultyColor}20`,
                    color: socialProof.difficultyColor,
                  }}
                >
                  {socialProof.difficulty}
                </span>
              )}
            </div>

            {/* TIER 5: Price + CTA */}
            <div className="flex items-center justify-between">
              {service.originalPrice && service.originalPrice > 0 ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-white/60 text-sm line-through">
                    €{service.originalPrice}
                  </span>
                  <span className="text-xl font-bold">
                    {service.price === 0 ? 'GRATIS' : `€${service.price}`}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold">
                  da €{service.price || '50'}
                </span>
              )}

              {/* Magnetic CTA Button - magnetic effect only on hover-capable devices */}
              <motion.div
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm cursor-pointer"
                style={hasHover ? magneticStyle : undefined}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>

            {/* Description - always visible on mobile, hover on desktop */}
            <div className="mt-3 text-sm leading-relaxed md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              <p className="line-clamp-2">
                {service.shortDescription || 'Sessioni professionali per il tuo benessere.'}
              </p>
            </div>

            {/* Mobile pricing hint */}
            <div className="mt-3 md:hidden flex gap-2 text-xs text-white/60">
              <span>1 sed. €{service.price || 50}</span>
              <span>·</span>
              <span>5 sed. -{5}%</span>
              <span>·</span>
              <span>10 sed. -{10}%</span>
            </div>
          </div>

          {/* Glassmorphic Pricing Panel (appears on hover) */}
          <PricingPanel
            basePrice={service.price || 50}
            isVisible={showPricing}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}

// ============================================
// MAIN SECTION COMPONENT
// ============================================
interface ServicesSectionProps {
  services?: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const displayServices = services && services.length > 0 ? services : defaultServices

  return (
    <section id="servizi" className="section-premium">
      <div className="container">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20 max-w-2xl mx-auto"
        >
          <p className="text-[--color-primary] text-sm tracking-[0.15em] uppercase mb-4">
            I Nostri Servizi
          </p>
          <h2 className="mb-4">Il Metodo KineLab</h2>
          <div className="w-12 h-[1px] bg-[--color-primary] mx-auto mb-6" />
          <p className="text-[--color-text-muted] leading-relaxed">
            Tre discipline integrate per il tuo benessere. Un approccio olistico
            al movimento, pensato per ogni esigenza.
          </p>
        </motion.div>

        {/* Services Grid - Enhanced Spacing (40px gap, larger cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 relative max-w-7xl mx-auto">
          {displayServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-[--color-text-muted] text-sm mb-4">
            Non sai quale servizio scegliere?
          </p>
          <Link href="/prenota" className="btn btn-outline px-6 py-3">
            Prenota una consulenza gratuita
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
