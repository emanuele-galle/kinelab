'use client'

import { motion } from 'motion/react'

export function AboutSection() {
  return (
    <section id="chi-siamo" className="section bg-[--color-surface]">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Large Quote */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <blockquote>
              <p
                className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-[--color-text] mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                &ldquo;Non siamo una palestra.
                <br />
                Siamo un laboratorio
                <br />
                del movimento.&rdquo;
              </p>
            </blockquote>

            {/* Horizontal line */}
            <div className="w-16 h-[2px] bg-[--color-accent] mx-auto mb-12" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-12 text-[--color-text-muted]"
          >
            <div>
              <p className="text-lg leading-relaxed mb-6">
                KineLab nasce dall&apos;idea di creare uno spazio dove il benessere
                del corpo e della mente si incontrano in perfetta armonia.
              </p>
              <p className="leading-relaxed">
                Ogni persona viene accolta nella sua unicita e guidata in un
                percorso di consapevolezza corporea costruito su misura.
              </p>
            </div>
            <div>
              <p className="text-lg leading-relaxed mb-6">
                Il nostro metodo integra Pilates, Functional Training e Personal
                Training per offrirti un&apos;esperienza completa e attenta ai
                dettagli.
              </p>
              <p className="leading-relaxed">
                Non alleniamo solo il corpo: ti aiutiamo a riscoprire il piacere
                del movimento e a costruire abitudini che durano nel tempo.
              </p>
            </div>
          </motion.div>

          {/* Values - minimal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 pt-16 border-t border-[--color-border]"
          >
            <div className="text-center">
              <p className="text-4xl font-medium text-[--color-text] mb-2">3</p>
              <p className="text-sm text-[--color-text-muted] uppercase tracking-wider">Discipline</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-medium text-[--color-text] mb-2">1</p>
              <p className="text-sm text-[--color-text-muted] uppercase tracking-wider">Obiettivo</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-medium text-[--color-text] mb-2">Tu</p>
              <p className="text-sm text-[--color-text-muted] uppercase tracking-wider">Al centro</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
