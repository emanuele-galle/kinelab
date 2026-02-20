'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'motion/react'

const stats = [
  {
    value: 3,
    suffix: '',
    label: 'Discipline',
    description: 'Approccio Olistico',
  },
  {
    value: 5,
    suffix: '+',
    label: 'Anni',
    description: 'Esperienza Qualificata',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Personalizzato',
    description: 'Programmi Su Misura',
  },
  {
    value: 1,
    suffix: '',
    label: 'Focus',
    description: 'Tu al Centro',
  },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="counter-number text-white">
      {count}
      {suffix}
    </span>
  )
}

export function WhyUsSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/studio-equipment.jpg"
          alt="Attrezzature Pilates Reformer - KineLab Milano"
          fill
          className="object-cover"
        />
        {/* Dark Overlay - molto scuro per leggibilità */}
        <div className="absolute inset-0 bg-[#1a1714]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-[--color-accent] text-sm tracking-[0.15em] uppercase mb-4">
            Perché Sceglierci
          </p>
          <h2 className="text-white mb-4 drop-shadow-lg">
            Perché scegliere KineLab
          </h2>
          <div className="w-12 h-[1px] bg-[--color-accent] mx-auto mb-6" />
          <p className="text-white drop-shadow-md">
            Un&apos;esperienza unica che unisce competenza, attenzione ai dettagli
            e passione per il movimento consapevole.
          </p>
        </motion.div>

        {/* Counters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              {/* Number */}
              <Counter value={stat.value} suffix={stat.suffix} />

              {/* Label */}
              <p className="text-white font-medium mt-2 mb-1 drop-shadow-md">{stat.label}</p>

              {/* Description */}
              <p className="text-white/90 text-sm drop-shadow">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
