import Link from 'next/link'
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react'
import type { BusinessInfo } from '@/lib/payload'

const footerLinks = {
  esplora: [
    { name: 'Home', href: '/' },
    { name: 'Chi Siamo', href: '/#chi-siamo' },
    { name: 'Servizi', href: '/#servizi' },
    { name: 'Galleria', href: '/#gallery' },
    { name: 'Team', href: '/#team' },
    { name: 'Prenota', href: '/prenota' },
  ],
  servizi: [
    { name: 'Pilates', href: '/#servizi' },
    { name: 'Functional Training', href: '/#servizi' },
    { name: 'Personal Training', href: '/#servizi' },
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
  const phoneLink = phone.replace(/\s/g, '').replace('+39', '+39')

  return (
    <footer className="bg-[--color-bg-dark] text-white">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block text-2xl font-medium tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              KineLab
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Uno spazio dedicato al benessere del corpo e della mente,
              con un approccio curato e personalizzato.
            </p>
            {/* Social links - mostrati solo se configurati nel CMS */}
            {(instagram || facebook) && (
              <div className="flex gap-3">
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[--color-bg-dark] transition-colors"
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
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[--color-bg-dark] transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-6 text-white text-sm tracking-wider uppercase">
              Esplora
            </h4>
            <ul className="space-y-3">
              {footerLinks.esplora.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-medium mb-6 text-white text-sm tracking-wider uppercase">
              Servizi
            </h4>
            <ul className="space-y-3">
              {footerLinks.servizi.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-6 text-white text-sm tracking-wider uppercase">
              Contatti
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[--color-accent] flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  {address}
                  <br />
                  {postalCode} {city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[--color-accent] flex-shrink-0" />
                <a
                  href={`tel:${phoneLink}`}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[--color-accent] flex-shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            &copy; {currentYear} {companyName}. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-white/40 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie"
              className="text-white/40 hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
          <p className="text-white/40 text-xs">P.IVA {vatNumber}</p>
        </div>
      </div>
    </footer>
  )
}
