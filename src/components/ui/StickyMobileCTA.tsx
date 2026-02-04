'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Calendar, Phone, MessageCircle } from 'lucide-react'
import type { BusinessInfo } from '@/lib/payload'

interface StickyMobileCTAProps {
  businessInfo?: BusinessInfo
}

export function StickyMobileCTA({ businessInfo }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Dati dal CMS con fallback
  const phone = businessInfo?.phone || '+39 340 945 3175'
  const phoneLink = phone.replace(/\s/g, '')
  const whatsappLink = `https://wa.me/${phoneLink.replace('+', '')}?text=Ciao! Vorrei informazioni sui vostri servizi.`

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section
      const heroHeight = document.querySelector('section')?.offsetHeight || window.innerHeight
      setIsVisible(window.scrollY > heroHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="bg-white/95 backdrop-blur-md border-t border-[--color-border] shadow-lg px-4 py-3 safe-area-inset-bottom">
            <div className="flex gap-2">
              {/* Phone Button */}
              <a
                href={`tel:${phoneLink}`}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-lg border border-[--color-border] text-[--color-text-muted] hover:bg-[--color-bg-accent] hover:border-[--color-primary] hover:text-[--color-primary] transition-all active:scale-95"
                aria-label="Chiama"
              >
                <Phone className="w-5 h-5" />
                <span className="text-xs font-medium">Chiama</span>
              </a>

              {/* WhatsApp Button */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-lg border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 hover:border-[#25D366] transition-all active:scale-95"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-xs font-medium">WhatsApp</span>
              </a>

              {/* Main CTA - Prenota */}
              <Link
                href="/prenota"
                className="flex-[1.5] flex flex-col items-center justify-center gap-1 bg-[--color-accent] hover:bg-[--color-accent-dark] text-[--color-text] font-medium py-2 rounded-lg transition-all active:scale-[0.98] shadow-md"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-xs font-medium">Prenota</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
