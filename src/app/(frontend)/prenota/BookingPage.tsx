'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { CalendarDays, Clock, UserCheck, MessageCircle } from 'lucide-react'
import { useState } from 'react'

interface BookingPageProps {
  bookingUrl: string
  phone: string
  whatsapp: string
}

const steps = [
  {
    icon: CalendarDays,
    title: 'Scegli il servizio',
    description: 'Pilates, Personal Training o Kinè Method',
  },
  {
    icon: Clock,
    title: 'Seleziona data e ora',
    description: 'Consulta le disponibilità in tempo reale',
  },
  {
    icon: UserCheck,
    title: 'Conferma',
    description: 'Ricevi conferma immediata via email',
  },
]

export function BookingPage({ bookingUrl, phone, whatsapp }: BookingPageProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const phoneLink = phone.replace(/\s/g, '')
  const whatsappLink = whatsapp.replace('+', '')

  return (
    <>
      {/* Hero Header con sfondo studio */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/studio-main-room.jpg"
            alt="Studio KineLab Milano"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1714]/80 via-[#1a1714]/70 to-[#1a1714]/90" />
        </div>

        <div className="relative z-10 container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-12 h-[1px] bg-[--color-accent] mx-auto mb-8" />
            <h1 className="text-white drop-shadow-lg">
              Prenota il Tuo Appuntamento
            </h1>
            <p className="text-white/85 text-lg md:text-xl mt-6 leading-relaxed drop-shadow-md">
              Scegli il trattamento e l&apos;orario che preferisci.
              La prenotazione online è semplice e immediata.
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 max-w-3xl mx-auto"
          >
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-3 px-4"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-[--color-accent]" />
                </div>
                <h3 className="text-white text-base font-medium font-[family-name:var(--font-sans)]">
                  {step.title}
                </h3>
                <p className="text-white/65 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sezione Iframe */}
      <section className="py-12 md:py-16 bg-[--color-bg]">
        <div className="container">
          {bookingUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative max-w-4xl mx-auto"
            >
              {/* Loading skeleton */}
              {!iframeLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[--color-bg-accent] rounded-[--radius-lg]">
                  <div className="text-center">
                    <div className="w-10 h-10 border-2 border-[--color-primary] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[--color-text-muted] text-sm">
                      Caricamento sistema di prenotazione...
                    </p>
                  </div>
                </div>
              )}

              {/* Iframe container con ombra e bordi arrotondati */}
              <div className="rounded-[--radius-lg] overflow-hidden shadow-[var(--shadow-lg)] border border-[--color-border]">
                <iframe
                  src={bookingUrl}
                  title="Prenota appuntamento KineLab"
                  className="w-full border-0 bg-white"
                  style={{ height: '750px' }}
                  allow="payment"
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-20 px-8 bg-[--color-bg-accent] rounded-[--radius-lg] max-w-2xl mx-auto">
              <CalendarDays className="w-12 h-12 text-[--color-primary] mx-auto mb-6 opacity-50" />
              <p className="text-lg text-[--color-text-muted] mb-2">
                Il sistema di prenotazione online sarà disponibile a breve.
              </p>
              <p className="text-[--color-text-light]">
                Nel frattempo puoi prenotare contattandoci direttamente.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contatto alternativo */}
      <section className="py-12 md:py-16 bg-[--color-bg-accent]">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl mb-3">
              Preferisci il contatto diretto?
            </h2>
            <p className="text-[--color-text-muted] mb-8">
              Siamo a tua disposizione per qualsiasi informazione
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${whatsappLink}?text=Ciao! Vorrei prenotare una lezione.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary gap-3 min-w-[220px]"
              >
                <MessageCircle className="w-4 h-4" />
                Scrivici su WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
