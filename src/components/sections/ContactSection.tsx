'use client'

import { motion } from 'motion/react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import Link from 'next/link'
import type { BusinessInfo } from '@/data'

interface ContactSectionProps {
  businessInfo?: BusinessInfo
}

export function ContactSection({ businessInfo }: ContactSectionProps) {
  // Dati dal CMS con fallback
  const address = businessInfo?.address || 'Via Pascoli 15'
  const postalCode = businessInfo?.postalCode || '20129'
  const city = businessInfo?.city || 'Milano'
  const phone = businessInfo?.phone || '+39 02 8233 7048'
  const phoneLink = phone.replace(/\s/g, '')
  const email = businessInfo?.email || 'kinelabmilano@gmail.com'
  const whatsapp = businessInfo?.whatsapp || phone
  const fullAddress = `${address}, ${postalCode} ${city}`
  const mapsQuery = encodeURIComponent(`${address} ${city}`)

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Dove Siamo',
      content: fullAddress,
      link: `https://maps.google.com/?q=${mapsQuery}`,
      linkText: 'Apri in Maps',
    },
    {
      icon: Phone,
      title: 'Telefono',
      content: phone,
      link: `tel:${phoneLink}`,
      note: whatsapp ? 'Hai domande? Contattaci su WhatsApp' : undefined,
    },
    {
      icon: Mail,
      title: 'Email',
      content: email,
      link: `mailto:${email}`,
    },
    {
      icon: Clock,
      title: 'Orari',
      content: 'Lun - Ven: 7:00 - 21:00\nSabato: 9:00 - 13:00',
      note: 'Domenica: Chiuso',
    },
  ]
  return (
    <section id="contatti" className="section bg-[--color-bg]">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-[--color-primary] text-sm tracking-[0.15em] uppercase mb-4">
            Vieni a trovarci
          </p>
          <h2 className="mb-4">Contattaci</h2>
          <div className="w-12 h-[1px] bg-[--color-primary] mx-auto mb-6" />
          <p>
            Siamo a tua disposizione per qualsiasi informazione.
            Non esitare a contattarci.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          {/* Contact Info - 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  {/* Icon */}
                  <div className="icon-container flex-shrink-0">
                    <Icon className="w-5 h-5 text-[--color-primary]" />
                  </div>

                  {/* Content */}
                  <div>
                    <h4 className="font-medium mb-1 text-[--color-text]">
                      {item.title}
                    </h4>
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-[--color-text-muted] text-sm hover:text-[--color-primary] transition-colors whitespace-pre-line"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-[--color-text-muted] text-sm whitespace-pre-line">
                        {item.content}
                      </p>
                    )}
                    {item.linkText && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-[--color-primary] text-sm font-medium hover:text-[--color-primary-dark]"
                      >
                        {item.linkText}
                      </a>
                    )}
                    {item.note && (
                      <p className="text-[--color-text-light] text-xs mt-1">
                        {item.note}
                      </p>
                    )}
                  </div>
                </motion.div>
              )
            })}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="pt-4"
            >
              <Link href="/prenota" className="btn btn-primary w-full">
                Prenota la tua prima lezione
              </Link>
            </motion.div>
          </motion.div>

          {/* Map - 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="relative h-full min-h-[400px] lg:min-h-[500px] overflow-hidden rounded-[--radius-lg] bg-[--color-bg-accent] shadow-sm">
              {/* Google Maps Embed */}
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.8!2d9.2!3d45.47!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDI4JzEyLjAiTiA5wrAxMicwMC4wIkU!5e0!3m2!1sit!2sit!4v1704067200000!5m2!1sit!2sit&q=${mapsQuery}`}
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mappa KineLab - ${fullAddress}`}
                className="grayscale-[20%] contrast-[1.1]"
              />

              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg z-10">
                <p className="font-medium text-[--color-text] text-sm mb-0.5">KineLab Milano</p>
                <p className="text-[--color-text-muted] text-xs">{fullAddress}</p>
                <a
                  href={`https://maps.google.com/?q=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[--color-primary] text-xs font-medium mt-2 hover:text-[--color-primary-dark]"
                >
                  <MapPin className="w-3 h-3" />
                  Indicazioni stradali
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
