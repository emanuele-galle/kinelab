'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Calendar, MapPin } from 'lucide-react'

// Nomi italiani comuni
const names = [
  'Maria', 'Giulia', 'Francesca', 'Sara', 'Alessia',
  'Marco', 'Luca', 'Andrea', 'Paolo', 'Matteo',
  'Elena', 'Chiara', 'Anna', 'Valentina', 'Sofia',
  'Giovanni', 'Alessandro', 'Davide', 'Simone', 'Federico'
]

// Servizi disponibili
const services = [
  'Pilates Mat',
  'Pilates Reformer',
  'Functional Training',
  'Personal Training',
  'Consulenza iniziale'
]

// Tempo fa (realistico)
const timeAgo = [
  '2 minuti fa',
  '5 minuti fa',
  '8 minuti fa',
  '12 minuti fa',
  '15 minuti fa',
  '20 minuti fa',
]

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

interface Notification {
  id: number
  name: string
  service: string
  time: string
}

export function SocialProofNotification() {
  const [notification, setNotification] = useState<Notification | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Don't show on mobile for better UX
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    // Initial delay before first notification
    const initialDelay = setTimeout(() => {
      showNotification()
    }, 8000) // 8 seconds after page load

    // Show notifications periodically
    const interval = setInterval(() => {
      showNotification()
    }, 25000) // Every 25 seconds

    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
    }
  }, [])

  const showNotification = () => {
    const newNotification: Notification = {
      id: Date.now(),
      name: getRandomItem(names),
      service: getRandomItem(services),
      time: getRandomItem(timeAgo),
    }

    setNotification(newNotification)
    setIsVisible(true)

    // Hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false)
    }, 5000)
  }

  return (
    <AnimatePresence>
      {isVisible && notification && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-24 left-4 z-30 max-w-xs hidden md:block"
        >
          <div className="bg-white rounded-xl shadow-lg border border-[--color-border] p-4 flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[--color-accent]/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[--color-accent]" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[--color-text]">
                <span className="font-medium">{notification.name}</span>
                {' '}ha prenotato
              </p>
              <p className="text-sm text-[--color-primary] font-medium truncate">
                {notification.service}
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs text-[--color-text-muted]">
                <MapPin className="w-3 h-3" />
                <span>Milano</span>
                <span className="mx-1">·</span>
                <span>{notification.time}</span>
              </div>
            </div>

            {/* Close button (optional, for accessibility) */}
            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 text-[--color-text-light] hover:text-[--color-text-muted] transition-colors"
              aria-label="Chiudi notifica"
            >
              <span className="sr-only">Chiudi</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Subtle verified badge */}
          <div className="flex items-center gap-1 mt-2 ml-2 text-xs text-[--color-text-light]">
            <svg className="w-3 h-3 text-[--color-accent-sage]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Prenotazione verificata</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
