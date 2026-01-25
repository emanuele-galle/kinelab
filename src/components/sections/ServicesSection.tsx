'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Users, Flame, TrendingUp } from 'lucide-react'
import type { Service } from '@/lib/payload'

// Urgency badges per categoria (scarcity + popularity)
const urgencyBadges: Record<string, { text: string; icon: 'flame' | 'trending'; color: string } | null> = {
  pilates: { text: 'Piu richiesto', icon: 'flame', color: 'bg-orange-500' },
  personal: { text: 'Posti limitati', icon: 'trending', color: 'bg-red-500' },
  functional: null, // No badge per questo
}

// Media assets per categoria (immagine + video)
const categoryMedia: Record<string, {
  image: { src: string; alt: string }
  video: { src: string; poster: string }
}> = {
  pilates: {
    image: {
      src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
      alt: 'Pilates training session',
    },
    video: {
      src: 'https://videos.pexels.com/video-files/6740304/6740304-uhd_2560_1440_25fps.mp4',
      poster: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    },
  },
  functional: {
    image: {
      src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
      alt: 'Functional training workout',
    },
    video: {
      src: 'https://videos.pexels.com/video-files/4662346/4662346-uhd_2560_1440_25fps.mp4',
      poster: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    },
  },
  personal: {
    image: {
      src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
      alt: 'Personal training one-on-one',
    },
    video: {
      src: 'https://videos.pexels.com/video-files/4662389/4662389-uhd_2560_1440_25fps.mp4',
      poster: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80',
    },
  },
}

// Fallback servizi se il CMS non ne ha
const defaultServices: Service[] = [
  {
    id: '1',
    name: 'Pilates',
    slug: 'pilates',
    category: 'pilates',
    shortDescription: 'Migliora postura, flessibilita e forza del core attraverso movimenti controllati e consapevoli.',
    duration: 55,
    price: 50,
  },
  {
    id: '2',
    name: 'Functional Training',
    slug: 'functional',
    category: 'functional',
    shortDescription: 'Allenamento funzionale per migliorare la qualita dei movimenti quotidiani.',
    duration: 50,
    price: 45,
  },
  {
    id: '3',
    name: 'Personal Training',
    slug: 'personal',
    category: 'personal',
    shortDescription: 'Sessioni individuali personalizzate per raggiungere i tuoi obiettivi specifici.',
    duration: 60,
    price: 70,
  },
]

// Features per categoria (hardcoded per ora, potrebbero venire dal CMS)
const categoryFeatures: Record<string, string[]> = {
  pilates: ['Mat Pilates', 'Reformer', 'Small Group'],
  functional: ['Bodyweight', 'Kettlebell', 'TRX'],
  personal: ['1-to-1', 'Programma su misura', 'Monitoraggio'],
}

// Tipo sessione per categoria
const categoryType: Record<string, string> = {
  pilates: 'Individuale / Gruppo',
  functional: 'Individuale / Gruppo',
  personal: 'Solo individuale',
}

interface ServicesSectionProps {
  services?: Service[]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  // Usa servizi dal CMS o fallback
  const displayServices = services && services.length > 0 ? services : defaultServices

  return (
    <section id="servizi" className="section section-accent">
      <div className="container">
        {/* Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-[--color-primary] text-sm tracking-[0.15em] uppercase mb-4">
            I Nostri Servizi
          </p>
          <h2 className="mb-4">Il Metodo KineLab</h2>
          <div className="w-12 h-[1px] bg-[--color-primary] mx-auto mb-6" />
          <p>
            Tre discipline integrate per il tuo benessere. Un approccio olistico
            al movimento, pensato per ogni esigenza.
          </p>
        </motion.div>

        {/* Services Grid - Video Hover Effect Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {displayServices.map((service, index) => {
            const mediaData = categoryMedia[service.category] || categoryMedia.pilates

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/servizi/${service.slug}`} className="group block">
                  <motion.div
                    className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]"
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    {/* Background Image (default) */}
                    <div className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-0">
                      <Image
                        src={mediaData.image.src}
                        alt={mediaData.image.alt}
                        fill
                        className="object-cover scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={index === 0}
                      />
                    </div>

                    {/* Video (appears on hover) */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={mediaData.video.poster}
                        className="w-full h-full object-cover"
                      >
                        <source src={mediaData.video.src} type="video/mp4" />
                      </video>
                    </div>

                    {/* Animated Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />

                    {/* Particles Effect (CSS only) */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float" />
                      <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-float-delayed" />
                      <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white/25 rounded-full animate-float-slow" />
                    </div>

                    {/* Urgency Badge (top right) */}
                    {urgencyBadges[service.category] && (
                      <div className={`absolute top-4 right-4 ${urgencyBadges[service.category]!.color} text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-sm`}>
                        {urgencyBadges[service.category]!.icon === 'flame' ? (
                          <Flame className="w-3.5 h-3.5" />
                        ) : (
                          <TrendingUp className="w-3.5 h-3.5" />
                        )}
                        {urgencyBadges[service.category]!.text}
                      </div>
                    )}

                    {/* Content (bottom) */}
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      {/* Category label */}
                      <p className="text-xs font-semibold tracking-widest uppercase mb-2 opacity-90">
                        {service.category}
                      </p>

                      {/* Service name */}
                      <h3 className="text-2xl font-bold mb-3 tracking-tight">
                        {service.name}
                      </h3>

                      {/* Meta info */}
                      <div className="flex items-center gap-4 text-sm mb-3 opacity-90">
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {service.duration || 60} min
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          {categoryType[service.category] || 'Individuale'}
                        </span>
                      </div>

                      {/* Price */}
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

                        {/* CTA Arrow (appears on hover) */}
                        <motion.div
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm"
                          initial={{ opacity: 0, x: -10 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      </div>

                      {/* Hover: Show description */}
                      <motion.div
                        className="mt-3 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ height: 0 }}
                        whileHover={{ height: 'auto' }}
                      >
                        <p className="line-clamp-2">
                          {service.shortDescription || 'Sessioni professionali per il tuo benessere.'}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-[--color-text-muted] text-sm mb-4">
            Non sai quale servizio scegliere?
          </p>
          <Link
            href="/prenota"
            className="btn btn-outline px-6 py-3"
          >
            Prenota una consulenza gratuita
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
