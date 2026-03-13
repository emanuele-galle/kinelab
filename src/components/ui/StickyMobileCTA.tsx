'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { MessageCircle, ArrowRight } from 'lucide-react'
import type { BusinessInfo } from '@/data'

interface StickyMobileCTAProps {
  businessInfo?: BusinessInfo
}

export function StickyMobileCTA({ businessInfo }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Dati dal CMS con fallback
  const whatsapp = businessInfo?.whatsapp || '+390282337048'
  const whatsappLink = `https://wa.me/${whatsapp.replace('+', '')}?text=Ciao! Vorrei informazioni sui vostri servizi.`

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
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="fixed bottom-5 left-3 right-3 z-40 md:hidden"
        >
          <div className="bg-[#2C2825]/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] px-3 py-2.5 safe-area-inset-bottom">
            <div className="flex items-center gap-2">
              {/* Quick actions */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] active:bg-[#25D366]/30 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Divider */}
              <div className="w-px h-6 bg-white/15 mx-0.5" />

              {/* Main CTA */}
              <Link
                href="/prenota"
                className="flex-1 flex items-center justify-center gap-2 bg-[--color-accent] text-white font-medium py-2.5 px-4 rounded-xl transition-all active:scale-[0.97] shadow-[0_2px_12px_rgba(179,150,80,0.3)]"
              >
                <span className="text-sm font-semibold tracking-wide">Prenota Ora</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
