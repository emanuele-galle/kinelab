'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Gift, CheckCircle, Sparkles } from 'lucide-react'

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Only trigger when mouse leaves through top of viewport
    if (e.clientY <= 0) {
      // Check if popup was already shown in this session
      const hasSeenPopup = sessionStorage.getItem('exitIntentShown')
      if (!hasSeenPopup) {
        setIsOpen(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }
  }, [])

  useEffect(() => {
    // Check if user has already converted (localStorage for persistence)
    const hasConverted = localStorage.getItem('exitIntentConverted')
    if (hasConverted) return

    // Only add listener on desktop
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    // Small delay before enabling exit intent
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 5000) // Wait 5 seconds before enabling

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseLeave])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isLoading) return

    setIsLoading(true)

    // Simulate API call (replace with actual API endpoint)
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mark as converted
    localStorage.setItem('exitIntentConverted', 'true')
    setIsSubmitted(true)
    setIsLoading(false)

    // Auto close after showing success
    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
              aria-label="Chiudi"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            {/* Decorative header */}
            <div className="bg-gradient-to-br from-[--color-accent] to-[--color-accent-dark] px-6 py-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4"
              >
                <Gift className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-white mb-2">
                Aspetta!
              </h3>
              <p className="text-white/90">
                Non perdere questa opportunita
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-medium text-[--color-text] mb-2">
                      Prima Lezione Gratuita
                    </h4>
                    <p className="text-[--color-text-muted] text-sm">
                      Lascia la tua email e prenota una lezione di prova gratuita
                      per scoprire il metodo KinèLAB.
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2 mb-6">
                    {[
                      'Lezione individuale con trainer certificato',
                      'Valutazione posturale iniziale',
                      'Programma personalizzato consigliato',
                    ].map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-center gap-2 text-sm text-[--color-text-muted]"
                      >
                        <CheckCircle className="w-4 h-4 text-[--color-accent-sage] flex-shrink-0" />
                        {benefit}
                      </motion.div>
                    ))}
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="La tua email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[--color-border] bg-[--color-bg] focus:border-[--color-accent] focus:ring-2 focus:ring-[--color-accent]/20 outline-none transition-all text-[--color-text]"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 bg-[--color-accent] hover:bg-[--color-accent-dark] text-[--color-text] font-medium py-3 px-6 rounded-lg transition-all disabled:opacity-70"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Ottieni Offerta
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-center text-[--color-text-light] mt-4">
                    Niente spam, solo il tuo voucher gratuito.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[--color-accent-sage]/20 mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-[--color-accent-sage]" />
                  </motion.div>
                  <h4 className="text-xl font-medium text-[--color-text] mb-2">
                    Perfetto!
                  </h4>
                  <p className="text-[--color-text-muted]">
                    Controlla la tua email per il voucher della lezione gratuita.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
