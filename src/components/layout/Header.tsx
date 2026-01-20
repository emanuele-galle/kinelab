'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Phone, MapPin, Clock, ChevronRight } from 'lucide-react'
import type { BusinessInfo } from '@/lib/payload'

const navigation = [
  { name: 'Servizi', href: '/#servizi' },
  { name: 'Chi Siamo', href: '/#chi-siamo' },
  { name: 'Galleria', href: '/#gallery' },
  { name: 'Team', href: '/#team' },
  { name: 'Contatti', href: '/#contatti' },
]

interface HeaderProps {
  businessInfo?: BusinessInfo
}

export function Header({ businessInfo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Dati dal CMS con fallback
  const phone = businessInfo?.phone || '+39 340 945 3175'
  const phoneShort = phone.replace('+39 ', '').replace('+39', '')
  const phoneLink = phone.replace(/\s/g, '')
  const address = businessInfo?.address || 'Via Pascoli 15'
  const postalCode = businessInfo?.postalCode || '20129'
  const city = businessInfo?.city || 'Milano'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className={`text-2xl font-medium tracking-tight transition-colors duration-300 ${
                isScrolled ? 'text-[--color-text]' : 'text-white'
              }`}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              KineLab
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-300 relative group ${
                    isScrolled
                      ? 'text-[--color-text-muted] hover:text-[--color-primary]'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-[--color-primary]' : 'bg-white'
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href={`tel:${phoneLink}`}
                className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                  isScrolled
                    ? 'text-[--color-text-muted] hover:text-[--color-primary]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden lg:inline">{phoneShort}</span>
              </a>
              <Link
                href="/prenota"
                className={`btn text-sm py-2.5 px-6 transition-all duration-300 ${
                  isScrolled
                    ? 'btn-primary'
                    : 'bg-white text-[--color-text] hover:bg-white/90'
                }`}
              >
                Prenota
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors duration-300 ${
                isScrolled ? 'text-[--color-text]' : 'text-white'
              }`}
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Drawer from Left */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 md:hidden overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[--color-border-light]">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="text-2xl font-medium text-[--color-text]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  KineLab
                </Link>
                <p className="text-[--color-text-muted] text-sm mt-1">
                  Studio Pilates Milano
                </p>
              </div>

              {/* Navigation Links */}
              <nav className="p-6">
                <div className="space-y-1">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="flex items-center justify-between py-3 text-[--color-text] font-medium hover:text-[--color-primary] transition-colors group"
                      >
                        {item.name}
                        <ChevronRight className="w-4 h-4 text-[--color-text-muted] group-hover:text-[--color-primary] group-hover:translate-x-1 transition-all" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <Link
                    href="/prenota"
                    onClick={closeMobileMenu}
                    className="btn btn-accent w-full py-4 text-base"
                  >
                    Prenota la Tua Lezione
                  </Link>
                </motion.div>
              </nav>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-6 mt-auto border-t border-[--color-border-light] bg-[--color-bg-accent]"
              >
                <h4 className="text-sm font-medium text-[--color-text] mb-4">Contatti</h4>
                <div className="space-y-3 text-sm text-[--color-text-muted]">
                  <a
                    href={`tel:${phoneLink}`}
                    className="flex items-center gap-3 hover:text-[--color-primary] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[--color-accent]" />
                    {phone}
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[--color-accent]" />
                    {address}, {postalCode} {city}
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[--color-accent]" />
                    Lun-Ven: 7:00-21:00
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
