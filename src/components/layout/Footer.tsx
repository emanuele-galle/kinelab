import Link from 'next/link'
import { Mail, Phone, MapPin, Instagram, Facebook, Clock, ArrowRight } from 'lucide-react'
import type { BusinessInfo } from '@/lib/payload'

const footerLinks = {
  esplora: [
    { name: 'Home', href: '/' },
    { name: 'Chi Siamo', href: '/#chi-siamo' },
    { name: 'Servizi', href: '/#servizi' },
    { name: 'Team', href: '/#team' },
  ],
  servizi: [
    { name: 'Pilates', href: '/servizi/pilates' },
    { name: 'Functional Training', href: '/servizi/functional' },
    { name: 'Personal Training', href: '/servizi/personal' },
  ],
}

interface FooterProps {
  businessInfo?: BusinessInfo
}

export function Footer({ businessInfo }: FooterProps) {
  const currentYear = new Date().getFullYear()

  // Usa dati dal CMS o fallback
  const address = businessInfo?.address || 'Via Pascoli 15'
  const postalCode = businessInfo?.postalCode || '20129'
  const city = businessInfo?.city || 'Milano'
  const phone = businessInfo?.phone || '+39 340 945 3175'
  const email = businessInfo?.email || 'kinelabmilano@gmail.com'
  const companyName = businessInfo?.companyName || 'KINELAB SSD'
  const vatNumber = businessInfo?.vatNumber || '14460620967'
  const instagram = businessInfo?.instagram
  const facebook = businessInfo?.facebook

  // Formatta telefono per link tel:
  const phoneLink = phone.replace(/\s/g, '')

  return (
    <footer className="bg-[#2C2825] text-white relative overflow-hidden">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B39650] to-transparent" />

      {/* Main Footer Content */}
      <div className="container">
        {/* Top Section - Logo + CTA */}
        <div className="py-16 lg:py-20 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Brand */}
            <div>
              <Link
                href="/"
                className="inline-block text-5xl lg:text-6xl font-bold tracking-tight mb-6 hover:text-[#B39650] transition-colors"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                KineLab
              </Link>
              <p className="text-white/80 text-xl leading-relaxed max-w-md">
                Il tuo spazio per il benessere del corpo e della mente
              </p>
            </div>

            {/* Right: CTA */}
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Link
                href="/prenota"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#B39650] text-[#2C2825] text-lg font-bold rounded-xl hover:bg-[#9A8043] transition-all hover:scale-105 hover:shadow-xl shadow-lg"
              >
                Prenota Ora
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${phoneLink}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-semibold rounded-xl hover:bg-white/20 transition-all border-2 border-white/20"
              >
                <Phone className="w-5 h-5" />
                Chiamaci
              </a>
            </div>

          </div>
        </div>

        {/* Middle Section - Links Grid */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

            {/* Column 1: Navigation */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wide">
                Navigazione
              </h3>
              <ul className="space-y-4">
                {footerLinks.esplora.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-[#B39650] text-base transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-4 h-[2px] bg-[#B39650] transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Services */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wide">
                Servizi
              </h3>
              <ul className="space-y-4">
                {footerLinks.servizi.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-[#B39650] text-base transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-4 h-[2px] bg-[#B39650] transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contacts */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wide">
                Contatti
              </h3>
              <ul className="space-y-5">
                <li>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${postalCode} ${city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-white/70 hover:text-white transition-colors group"
                  >
                    <MapPin className="w-5 h-5 text-[#B39650] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-base">
                      {address}, {postalCode} {city}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${phoneLink}`}
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                  >
                    <Phone className="w-5 h-5 text-[#B39650] flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-base">{phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                  >
                    <Mail className="w-5 h-5 text-[#B39650] flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-base break-all">{email}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Opening Hours + Social */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-wide">
                Orari
              </h3>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-base">
                  <span className="text-white/70">Lun - Ven</span>
                  <span className="text-white font-semibold">7:00 - 21:00</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-white/70">Sabato</span>
                  <span className="text-white font-semibold">9:00 - 13:00</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-white/70">Domenica</span>
                  <span className="text-white/50">Chiuso</span>
                </div>
              </div>

              {/* Social Links */}
              {(instagram || facebook) && (
                <div>
                  <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
                    Seguici
                  </h4>
                  <div className="flex gap-3">
                    {instagram && (
                      <a
                        href={instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-[#B39650] hover:border-[#B39650] hover:scale-110 transition-all"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {facebook && (
                      <a
                        href={facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-[#B39650] hover:border-[#B39650] hover:scale-110 transition-all"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Bottom Section - Legal */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">

            {/* Copyright */}
            <p className="text-white/50 text-center md:text-left">
              &copy; {currentYear} {companyName}. Tutti i diritti riservati.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/privacy"
                className="text-white/50 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookie"
                className="text-white/50 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href="/termini"
                className="text-white/50 hover:text-white transition-colors"
              >
                Termini e Condizioni
              </Link>
            </div>

            {/* VAT */}
            <p className="text-white/50 text-center md:text-right">
              P.IVA {vatNumber}
            </p>

          </div>
        </div>

      </div>
    </footer>
  )
}
