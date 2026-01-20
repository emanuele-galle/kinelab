'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

export function CTASection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/3822903/pexels-photo-3822903.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Meditation peaceful"
          fill
          className="object-cover"
        />
        {/* Gradient Overlay - molto scuro per leggibilità */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1714]/95 via-[#1a1714]/90 to-[#1a1714]/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Decorative Line */}
          <div className="w-12 h-[1px] bg-[--color-accent] mx-auto mb-8" />

          {/* Heading */}
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl mb-6 drop-shadow-lg">
            Pronto a iniziare il tuo percorso di benessere?
          </h2>

          {/* Description */}
          <p className="text-white text-lg md:text-xl mb-10 leading-relaxed drop-shadow-md">
            Prenditi cura di te. Prenota la tua prima lezione e scopri
            come il movimento consapevole può trasformare il tuo benessere.
          </p>

          {/* CTA */}
          <Link
            href="/prenota"
            className="btn btn-white px-10 py-4 text-base"
          >
            Prenota la tua prima lezione
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
