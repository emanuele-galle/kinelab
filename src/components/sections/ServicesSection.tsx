'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight, Clock, Users, Activity, Dumbbell, User, Flame, TrendingUp } from 'lucide-react'
import type { Service } from '@/lib/payload'

// Urgency badges per categoria (scarcity + popularity)
const urgencyBadges: Record<string, { text: string; icon: 'flame' | 'trending'; color: string } | null> = {
  pilates: { text: 'Piu richiesto', icon: 'flame', color: 'bg-orange-500' },
  personal: { text: 'Posti limitati', icon: 'trending', color: 'bg-red-500' },
  functional: null, // No badge per questo
}

// Icone per categoria
const categoryIcons: Record<string, React.ReactNode> = {
  pilates: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12M6 12h12" />
    </svg>
  ),
  functional: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 12h16M12 4l8 8-8 8" />
    </svg>
  ),
  personal: (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" />
    </svg>
  ),
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/servizi/${service.slug}`} className="group block h-full">
                <div className="card card-bordered bg-white p-8 h-full flex flex-col relative overflow-hidden">
                  {/* Urgency Badge */}
                  {urgencyBadges[service.category] && (
                    <div className={`absolute top-4 right-4 ${urgencyBadges[service.category]!.color} text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm`}>
                      {urgencyBadges[service.category]!.icon === 'flame' ? (
                        <Flame className="w-3 h-3" />
                      ) : (
                        <TrendingUp className="w-3 h-3" />
                      )}
                      {urgencyBadges[service.category]!.text}
                    </div>
                  )}

                  {/* Decorative gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[--color-accent]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {/* Icon with animated background */}
                    <motion.div
                      className="icon-container mb-6 text-[--color-primary] group-hover:border-[--color-accent] group-hover:bg-[--color-accent]/10 transition-all duration-300"
                      whileHover={{ scale: 1.05, rotate: 3 }}
                    >
                      {categoryIcons[service.category] || <Activity className="w-7 h-7" />}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl mb-2 group-hover:text-[--color-primary] transition-colors">
                      {service.name}
                    </h3>

                    {/* Meta info */}
                    <div className="flex items-center gap-4 mb-4 text-xs text-[--color-text-muted]">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {service.duration || 60} min
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {categoryType[service.category] || 'Individuale'}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-[--color-text-muted] text-sm leading-relaxed mb-6 flex-grow">
                      {service.shortDescription || 'Sessioni professionali per il tuo benessere.'}
                    </p>

                    {/* Features tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(categoryFeatures[service.category] || ['Professionale']).map((feature) => (
                        <span
                          key={feature}
                          className="px-2.5 py-1 bg-[--color-bg-accent] rounded-full text-xs text-[--color-text-muted]"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-[--color-border-light]">
                      <div>
                        <span className="text-[--color-accent] font-medium text-lg">
                          da {service.price || '50'}
                        </span>
                        <span className="text-[--color-text-muted] text-sm">/sessione</span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-[--color-primary] text-sm font-medium group-hover:gap-3 transition-all">
                        Prenota
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
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
