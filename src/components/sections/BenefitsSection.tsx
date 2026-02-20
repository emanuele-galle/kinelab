'use client'

import { motion } from 'motion/react'
import {
  Brain,
  Smile,
  Zap,
  Shield,
  Heart,
  Feather,
} from 'lucide-react'

const benefits = [
  {
    icon: Brain,
    title: 'Consapevolezza',
    description: 'Sviluppa una connessione profonda tra mente e corpo attraverso il movimento consapevole.',
    color: 'sage',
  },
  {
    icon: Smile,
    title: 'Benessere Mentale',
    description: 'Riduci lo stress e l\'ansia, trovando equilibrio e serenità nella pratica quotidiana.',
    color: 'accent',
  },
  {
    icon: Zap,
    title: 'Energia Vitale',
    description: 'Aumenta i livelli di energia e vitalità con allenamenti calibrati sulle tue esigenze.',
    color: 'sage',
  },
  {
    icon: Shield,
    title: 'Postura Corretta',
    description: 'Migliora la postura e previeni dolori con esercizi mirati e tecniche specifiche.',
    color: 'accent',
  },
  {
    icon: Heart,
    title: 'Salute del Cuore',
    description: 'Rafforza il sistema cardiovascolare con attività a basso impatto ma efficaci.',
    color: 'sage',
  },
  {
    icon: Feather,
    title: 'Flessibilità',
    description: 'Aumenta la mobilità articolare e la flessibilità muscolare in modo graduale e sicuro.',
    color: 'accent',
  },
]

export function BenefitsSection() {
  return (
    <section className="section bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 decorative-circle opacity-40" />
      <div className="absolute bottom-0 left-0 w-64 h-64 decorative-blob organic-shape-1 opacity-30" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-[--color-accent-sage] text-sm tracking-widest uppercase mb-4 block">
            Perché Sceglierci
          </span>
          <h2 className="section-title">I Benefici del Movimento</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Scopri come il nostro approccio olistico può trasformare il tuo benessere fisico e mentale.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-8 rounded-3xl bg-[--color-surface-warm] hover:bg-[--color-surface-sage] transition-colors duration-500">
                {/* Icon */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110
                    ${benefit.color === 'sage'
                      ? 'bg-[--color-accent-sage]/20'
                      : 'bg-[--color-accent]/15'
                    }`}
                  whileHover={{ rotate: 5 }}
                >
                  <benefit.icon
                    className={`w-7 h-7 ${
                      benefit.color === 'sage'
                        ? 'text-[--color-accent-sage]'
                        : 'text-[--color-accent]'
                    }`}
                  />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl mb-3 text-[--color-primary]">{benefit.title}</h3>
                <p className="text-[--color-text-muted] leading-relaxed text-sm">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
