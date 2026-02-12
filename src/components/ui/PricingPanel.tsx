'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Star } from 'lucide-react'
import type { PricingMode } from '@/data/types'

interface PricingPanelProps {
  pricingModes: PricingMode[]
  isVisible: boolean
  className?: string
}

export function PricingPanel({ pricingModes, isVisible, className = '' }: PricingPanelProps) {
  const [activeMode, setActiveMode] = useState(0)
  const mode = pricingModes[activeMode]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className={`absolute inset-x-0 bottom-0 rounded-t-2xl p-4 md:p-5 ${className}`}
          style={{
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          }}
          onClick={(e) => e.preventDefault()}
        >
          {/* Mode Tabs */}
          {pricingModes.length > 1 && (
            <div className="flex gap-1.5 mb-3">
              {pricingModes.map((m, i) => (
                <button
                  key={m.name}
                  onClick={(e) => { e.preventDefault(); setActiveMode(i) }}
                  className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    i === activeMode
                      ? 'bg-[#B39650] text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          )}

          {/* Mode description */}
          {mode.description && (
            <p className="text-white/50 text-[10px] mb-2 text-center">{mode.description}</p>
          )}

          {/* Packages */}
          <div className="space-y-2">
            {/* Single session */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/10">
              <span className="text-white text-sm">Seduta singola</span>
              <span className="text-white font-bold">{mode.singlePrice}€</span>
            </div>

            {/* Package deals */}
            {mode.packages.map((pkg) => (
              <div
                key={pkg.sessions}
                className={`relative flex items-center justify-between p-2.5 rounded-lg transition-all ${
                  pkg.badge
                    ? 'bg-white/15 border border-[#B39650]/60'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-2 -right-1 flex items-center gap-0.5 px-1.5 py-0.5 bg-[#B39650] text-white text-[9px] font-bold rounded-full">
                    <Star className="w-2 h-2 fill-current" />
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <span className="text-white text-sm font-medium">{pkg.sessions} lezioni</span>
                  <span className="text-white/50 text-xs ml-2">{pkg.validity}</span>
                </div>

                <div className="text-right">
                  <span className="text-white font-bold">{pkg.totalPrice.toLocaleString('it-IT')}€</span>
                  <span className="text-white/50 text-xs ml-1">
                    ({Math.floor(pkg.totalPrice / pkg.sessions)}€/sed.)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
