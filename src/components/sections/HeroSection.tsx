'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { ChevronDown, Star } from 'lucide-react'
import { useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Parallax effect for background - rispetta prefers-reduced-motion
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '30%']
  )
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85svh] md:min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-0"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        <Image
          src="/images/studio-panoramic.jpg"
          alt="Studio Pilates KineLab Milano - Sala Reformer con attrezzature professionali"
          fill
          priority
          className="object-cover"
        />
        {/* Multi-layer Gradient Overlay - più scuro per leggibilità */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1714]/70 via-[#1a1714]/60 to-[#1a1714]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1714]/60 via-transparent to-[#1a1714]/50" />

        {/* Decorative Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 border border-white/10 rounded-full opacity-40 hidden lg:block" />
      <div className="absolute bottom-1/3 right-16 w-48 h-48 border border-[--color-accent]/20 rounded-full opacity-30 hidden lg:block" />

      {/* Content */}
      <motion.div
        className="relative z-10 container text-center text-white px-4"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-3xl mx-auto"
        >
          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[1px] bg-[--color-accent] mx-auto mb-8"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm tracking-[0.15em] md:tracking-[0.2em] uppercase text-white mb-4 drop-shadow-md"
          >
            Pilates · Functional Training · Personal Training
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white mb-6 drop-shadow-lg"
          >
            Il Tuo Laboratorio
            <br />
            <span className="text-[--color-accent]">del Movimento</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-white font-light mb-6 leading-relaxed drop-shadow-md"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Dove consapevolezza corporea e benessere si incontrano
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-white/90 text-base md:text-lg max-w-lg md:max-w-xl mx-auto mb-10 leading-relaxed drop-shadow-md"
          >
            Uno spazio intimo a Milano dedicato alla trasformazione del tuo corpo
            attraverso metodi scientifici e attenzione personalizzata.
          </motion.p>

          {/* Trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="flex items-center justify-center gap-1 mb-10"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#C9A962] text-[#C9A962] drop-shadow" />
            ))}
            <span className="text-white text-sm ml-2 drop-shadow-md">Recensioni eccellenti</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/prenota"
              className="btn bg-[--color-accent] text-[--color-text] hover:bg-[--color-accent-dark] px-8 py-4 text-base font-medium shadow-lg"
            >
              Prenota la Tua Prima Lezione
            </Link>
            <Link
              href="/#servizi"
              className="btn btn-outline-white px-8 py-4 text-base"
            >
              Scopri i Nostri Servizi
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white"
      >
        <span className="text-xs tracking-wider uppercase">Scroll</span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
