'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Check, Star } from 'lucide-react'

interface Package {
  sessions: number
  totalPrice: number
  pricePerSession: number
  savings: number
  savingsPercent: number
  badge?: string
}

interface PricingPanelProps {
  basePrice: number
  isVisible: boolean
  className?: string
}

export function PricingPanel({ basePrice, isVisible, className = '' }: PricingPanelProps) {
  // Calculate packages
  const packages: Package[] = [
    {
      sessions: 1,
      totalPrice: basePrice,
      pricePerSession: basePrice,
      savings: 0,
      savingsPercent: 0,
    },
    {
      sessions: 5,
      totalPrice: basePrice * 5 * 0.95, // 5% discount
      pricePerSession: basePrice * 0.95,
      savings: basePrice * 5 * 0.05,
      savingsPercent: 5,
    },
    {
      sessions: 10,
      totalPrice: basePrice * 10 * 0.9, // 10% discount
      pricePerSession: basePrice * 0.9,
      savings: basePrice * 10 * 0.1,
      savingsPercent: 10,
      badge: 'MIGLIOR VALORE',
    },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className={`absolute inset-x-0 bottom-0 glassmorphic-panel rounded-t-2xl p-6 ${className}`}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.18)',
          }}
        >
          <div className="space-y-3">
            {packages.map((pkg) => (
              <div
                key={pkg.sessions}
                className={`relative flex items-center justify-between p-3 rounded-lg transition-all ${
                  pkg.badge
                    ? 'bg-white/20 border-2 border-[#B39650]'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-0.5 bg-[#B39650] text-white text-[10px] font-bold rounded-full shadow-lg">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    {pkg.badge}
                  </div>
                )}

                {/* Left: Package Info */}
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-white font-semibold">
                      {pkg.sessions === 1 ? 'Sessione singola' : `Pacchetto ${pkg.sessions}`}
                    </span>
                    {pkg.sessions > 1 && (
                      <span className="text-white/60 text-sm">
                        ({pkg.sessions} sessioni)
                      </span>
                    )}
                  </div>

                  {/* Price Per Session */}
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-white text-lg font-bold">
                      €{pkg.pricePerSession.toFixed(2)}
                    </span>
                    <span className="text-white/60 text-xs">/ sessione</span>
                  </div>
                </div>

                {/* Right: Total & Savings */}
                <div className="text-right">
                  <div className="text-white font-semibold">
                    €{pkg.totalPrice.toFixed(2)}
                  </div>
                  {pkg.savings > 0 && (
                    <div className="text-[#B39650] text-sm font-medium mt-0.5">
                      Risparmi €{pkg.savings.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-start gap-2 text-white/70 text-xs">
              <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
              <p>I pacchetti hanno validità 3 mesi dall'acquisto</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
