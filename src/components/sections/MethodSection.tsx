'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'
import { services } from '@/data'

export function MethodSection() {
  const methodService = services.find(s => s.category === 'method')

  if (!methodService?.programs) return null

  return (
    <section className="section bg-[#1a1714] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B2252] to-transparent" />
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#8B2252]/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-[#B39650]/5 blur-3xl" />

      <div className="container relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B2252]/20 border border-[#8B2252]/30 text-[#8B2252] text-xs font-semibold tracking-widest uppercase mb-6">
            <Zap className="w-3.5 h-3.5" />
            Il Metodo
          </div>
          <h2 className="text-white text-3xl md:text-4xl mb-4">
            La forza incontra il controllo
          </h2>
          <div className="w-12 h-[1px] bg-[#8B2252] mx-auto mb-6" />
          <p className="text-white/60 leading-relaxed">
            Il Kinè Method unisce la potenza della sala funzionale con la precisione del
            Pilates Reformer in un percorso integrato, unico nel suo genere.
          </p>
        </motion.div>

        {/* Program Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {methodService.programs.map((program, index) => (
            <motion.div
              key={program.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-[#8B2252]/40 transition-colors"
            >
              {/* Card Header */}
              <div className="px-6 py-5 border-b border-white/10">
                <h3 className="text-xl font-bold text-white mb-1">{program.name}</h3>
                <p className="text-white/50 text-sm">{program.format}</p>
              </div>

              {/* Plans */}
              <div className="p-6 space-y-3">
                {program.plans.map((plan) => (
                  <div
                    key={plan.duration}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      plan.badge ? 'bg-[#8B2252]/10 border border-[#8B2252]/20' : 'bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium text-sm">{plan.duration}</span>
                        {plan.badge && (
                          <span className="px-2 py-0.5 bg-[#8B2252] text-white text-[10px] font-bold rounded-full uppercase">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-white/40 text-xs">€{plan.perSession}/sessione</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-[#B39650]">€{plan.monthlyPrice}</span>
                      <span className="text-white/40 text-xs ml-1">/mese</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/servizi/kine-method"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#8B2252] text-white font-medium rounded-lg hover:bg-[#6d1a40] transition-all hover:scale-105 shadow-lg shadow-[#8B2252]/20"
          >
            Scopri il Metodo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
