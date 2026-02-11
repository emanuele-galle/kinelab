import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowRight } from 'lucide-react'
import type { BusinessInfo } from '@/data'

const links = [
  { name: 'Home', href: '/' },
  { name: 'Servizi', href: '/#servizi' },
  { name: 'Chi Siamo', href: '/#chi-siamo' },
  { name: 'Galleria', href: '/#gallery' },
  { name: 'Team', href: '/#team' },
  { name: 'Contatti', href: '/#contatti' },
]

const services = [
  { name: 'Pilates', href: '/servizi/pilates' },
  { name: 'Functional Training', href: '/servizi/functional' },
  { name: 'Personal Training', href: '/servizi/personal' },
]

interface FooterProps {
  businessInfo?: BusinessInfo
}

export function Footer({ businessInfo }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const address = businessInfo?.address || 'Via Pascoli 15'
  const postalCode = businessInfo?.postalCode || '20129'
  const city = businessInfo?.city || 'Milano'
  const phone = businessInfo?.phone || '+39 340 945 3175'
  const email = businessInfo?.email || 'kinelabmilano@gmail.com'
  const companyName = businessInfo?.companyName || 'KINELAB SSD'
  const vatNumber = businessInfo?.vatNumber || '14460620967'
  const instagram = businessInfo?.instagram
  const facebook = businessInfo?.facebook
  const phoneLink = phone.replace(/\s/g, '')

  return (
    <footer className="bg-[#2C2825] text-white relative overflow-hidden">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B39650] to-transparent" />

      <div className="container">
        {/* Hero Brand Section - Centered */}
        <div className="py-16 lg:py-20 flex flex-col items-center text-center border-b border-white/10">
          <Link
            href="/"
            className="relative h-56 w-[168px] sm:h-72 sm:w-[216px] lg:h-80 lg:w-[240px] mb-8 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logo-footer.png"
              alt="KinèLAB - Pilates & Funzionale"
              fill
              className="object-contain brightness-0 invert"
            />
          </Link>
          <p className="text-white/50 text-lg max-w-md mb-10">
            Il tuo spazio per il benessere del corpo e della mente
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/prenota"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#B39650] text-[#2C2825] font-bold rounded-lg hover:bg-[#9A8043] transition-all hover:scale-105"
            >
              Prenota Ora
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${phoneLink}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white font-medium rounded-lg border border-white/20 hover:bg-white/10 transition-all"
            >
              <Phone className="w-4 h-4" />
              Chiamaci
            </a>
          </div>
        </div>

        {/* Info Grid - 3 Columns */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">

            {/* Column 1: Links */}
            <div>
              <h3 className="text-[#B39650] font-semibold text-sm mb-5 uppercase tracking-widest">
                Esplora
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {links.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                {services.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Contacts */}
            <div>
              <h3 className="text-[#B39650] font-semibold text-sm mb-5 uppercase tracking-widest">
                Contatti
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${postalCode} ${city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-white/60 hover:text-white text-sm transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-[#B39650] flex-shrink-0 mt-0.5" />
                    {address}, {postalCode} {city}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${phoneLink}`}
                    className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#B39650] flex-shrink-0" />
                    {phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#B39650] flex-shrink-0" />
                    <span className="break-all">{email}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Hours + Social */}
            <div>
              <h3 className="text-[#B39650] font-semibold text-sm mb-5 uppercase tracking-widest">
                Orari
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Lun - Ven</span>
                  <span className="text-white font-medium">7:00 - 21:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Sabato</span>
                  <span className="text-white font-medium">9:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Domenica</span>
                  <span className="text-white/40">Chiuso</span>
                </div>
              </div>

              {(instagram || facebook) && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex gap-3">
                    {instagram && (
                      <a
                        href={instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#B39650] hover:border-[#B39650] transition-all"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {facebook && (
                      <a
                        href={facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#B39650] hover:border-[#B39650] transition-all"
                        aria-label="Facebook"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Legal Bar */}
        <div className="py-6 pb-24 md:pb-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>&copy; {currentYear} {companyName}. P.IVA {vatNumber}</p>
            <p className="text-white/30">Realizzato da{" "}
              <a href="https://www.fodisrl.it" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors">
                Fodi S.r.l.
              </a></p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white/70 transition-colors">
                Privacy
              </Link>
              <Link href="/cookie" className="hover:text-white/70 transition-colors">
                Cookie
              </Link>
              <Link href="/termini" className="hover:text-white/70 transition-colors">
                Termini
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
