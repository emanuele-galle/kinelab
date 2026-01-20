'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

export function WelcomeSection() {
  return (
    <section id="chi-siamo" className="section bg-[--color-bg]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[--radius-lg] overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/4498574/pexels-photo-4498574.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="KineLab Studio - Pilates Milano"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[--color-accent] rounded-[--radius-lg] -z-10 hidden lg:block" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Tagline */}
            <p className="text-[--color-primary] text-sm tracking-[0.15em] uppercase mb-4">
              Benvenuti
            </p>

            {/* Heading */}
            <h2 className="mb-4">
              Benvenuti in KineLab
            </h2>

            {/* Decorative Line */}
            <div className="w-12 h-[1px] bg-[--color-primary] mb-8" />

            {/* Description */}
            <div className="space-y-6 mb-10">
              <p className="text-lg leading-relaxed">
                Uno spazio dedicato al benessere del corpo e della mente,
                dove ogni persona viene accolta nella sua unicita.
              </p>
              <p className="leading-relaxed">
                KineLab nasce dall&apos;idea di creare un laboratorio del movimento:
                un luogo dove Pilates, Functional Training e Personal Training
                si fondono per offrirti un&apos;esperienza completa e personalizzata.
              </p>
              <p className="leading-relaxed">
                Non alleniamo solo il corpo: ti aiutiamo a riscoprire il piacere
                del movimento e a costruire abitudini che durano nel tempo.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/#servizi"
              className="inline-flex items-center gap-2 text-[--color-primary] font-medium group"
            >
              <span>Scopri i nostri servizi</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
