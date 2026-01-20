'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Giulia M.',
    role: 'Cliente da 2 anni',
    quote: 'KineLab ha completamente trasformato il mio approccio al benessere. Le sessioni di Pilates mi hanno aiutato a ritrovare equilibrio e serenita nella vita di tutti i giorni.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    service: 'Pilates',
  },
  {
    id: 2,
    name: 'Marco R.',
    role: 'Cliente da 1 anno',
    quote: 'Dopo anni di mal di schiena, il Functional Training con il team KineLab mi ha dato una nuova vita. Professionalita e attenzione alla persona sono uniche.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    service: 'Functional Training',
  },
  {
    id: 3,
    name: 'Sara L.',
    role: 'Cliente da 6 mesi',
    quote: 'L\'ambiente e accogliente e rilassante. Ogni sessione e un momento di cura per me stessa. Non potrei chiedere di meglio per il mio percorso di benessere.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    service: 'Personal Training',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? 'fill-[--color-accent] text-[--color-accent]'
              : 'fill-[--color-border] text-[--color-border]'
          }`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goTo = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    goTo(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    goTo((currentIndex + 1) % testimonials.length)
  }

  return (
    <section className="section bg-gradient-to-b from-[--color-bg] to-[--color-surface-warm] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 decorative-blob opacity-30" />
      <div className="absolute bottom-10 left-10 w-48 h-48 decorative-circle opacity-20" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[--color-accent-sage] text-sm tracking-widest uppercase mb-4 block">
            Testimonianze
          </span>
          <h2 className="section-title section-title-center">Cosa Dicono di Noi</h2>
          <div className="divider divider-sage" />
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto relative">
          {/* Decorative quote marks */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-[--color-accent-sage] opacity-20 font-serif">
            &ldquo;
          </div>

          <div className="relative min-h-[320px] pt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="text-center"
              >
                {/* Rating */}
                <div className="flex justify-center mb-6">
                  <StarRating rating={testimonials[currentIndex].rating} />
                </div>

                {/* Quote */}
                <p className="text-xl md:text-2xl text-[--color-text] leading-relaxed mb-8 italic font-light max-w-2xl mx-auto">
                  {testimonials[currentIndex].quote}
                </p>

                {/* Service badge */}
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 bg-[--color-accent-sage]/10 text-[--color-accent-sage] text-xs rounded-full uppercase tracking-wide">
                    {testimonials[currentIndex].service}
                  </span>
                </div>

                {/* Author */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-[--color-surface-sage] shadow-lg">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[--color-primary]">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-sm text-[--color-text-muted]">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full border border-[--color-border] flex items-center justify-center text-[--color-text-muted] hover:border-[--color-accent-sage] hover:text-[--color-accent-sage] hover:bg-[--color-surface-sage] transition-all duration-300"
              aria-label="Precedente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[--color-accent-sage] w-8'
                      : 'bg-[--color-border] hover:bg-[--color-text-muted] w-2.5'
                  }`}
                  aria-label={`Vai alla testimonianza ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full border border-[--color-border] flex items-center justify-center text-[--color-text-muted] hover:border-[--color-accent-sage] hover:text-[--color-accent-sage] hover:bg-[--color-surface-sage] transition-all duration-300"
              aria-label="Successivo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-[--color-border-light]"
          >
            <div className="text-center">
              <p className="text-2xl font-medium text-[--color-primary]">100+</p>
              <p className="text-xs text-[--color-text-muted] uppercase tracking-wide">Clienti Soddisfatti</p>
            </div>
            <div className="w-px bg-[--color-border-light] hidden sm:block" />
            <div className="text-center">
              <p className="text-2xl font-medium text-[--color-primary]">5.0</p>
              <p className="text-xs text-[--color-text-muted] uppercase tracking-wide">Rating Medio</p>
            </div>
            <div className="w-px bg-[--color-border-light] hidden sm:block" />
            <div className="text-center">
              <p className="text-2xl font-medium text-[--color-primary]">3+</p>
              <p className="text-xs text-[--color-text-muted] uppercase tracking-wide">Anni di Esperienza</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
