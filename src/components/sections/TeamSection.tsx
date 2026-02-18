'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, ArrowRight } from 'lucide-react'
import type { TeamMember } from '@/data'

import { team as defaultTeam } from '@/data'

interface TeamSectionProps {
  members?: TeamMember[]
}

export function TeamSection({ members }: TeamSectionProps) {
  const displayMembers: TeamMember[] = members && members.length > 0 ? members : defaultTeam

  return (
    <section id="team" className="section bg-[--color-bg]">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-[--color-primary] text-sm tracking-[0.15em] uppercase mb-4">
            Chi Siamo
          </p>
          <h2 className="mb-4">Il Nostro Team</h2>
          <div className="w-12 h-[1px] bg-[--color-primary] mx-auto mb-6" />
          <p className="text-lg text-[--color-text-muted]">
            Professionisti certificati uniti dalla passione per il movimento consapevole
            e il benessere dei nostri clienti.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="flex flex-wrap justify-center gap-5 lg:gap-6 max-w-[1100px] mx-auto">
          {displayMembers.map((member, index) => {
            const imageUrl = member.photo || '/images/studio-panoramic.jpg'
            const hasBio = !!member.shortBio

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1rem)] group"
              >
                <div className="relative rounded-2xl overflow-hidden cursor-default">
                  {/* Photo */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Base gradient - always visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Bio overlay - appears on hover */}
                    {hasBio && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                        <div className="p-5 sm:p-6 pb-20 sm:pb-24">
                          <p className="text-white/90 text-xs sm:text-sm leading-relaxed line-clamp-5 sm:line-clamp-6">
                            {member.shortBio}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Instagram icon */}
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[--color-text-muted] hover:text-[--color-primary] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                        aria-label={`Instagram di ${member.name}`}
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}

                    {/* Name & role - always visible at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-0.5 leading-tight">
                        {member.name}
                      </h3>
                      {member.role && (
                        <p className="text-white/80 text-xs sm:text-sm font-medium">
                          {member.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link
            href="/prenota"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[--color-primary] text-white rounded-lg text-sm font-medium hover:bg-[--color-primary-dark] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Prenota una Sessione
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
