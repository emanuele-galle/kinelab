'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Award, Calendar, Quote, Sparkles } from 'lucide-react'
import type { TeamMember } from '@/lib/payload'

// Extended team member type with extra fields for display
interface ExtendedTeamMember extends TeamMember {
  yearsExperience?: number
  specialty?: string
  quote?: string
}

// Fallback team con dati realistici
const defaultTeam: ExtendedTeamMember[] = [
  {
    id: '1',
    name: 'Giulia Moretti',
    role: 'Fondatrice & Head Trainer',
    shortBio: 'Appassionata di movimento consapevole, Giulia ha fondato KineLab per creare uno spazio dove corpo e mente si incontrano. Specializzata in Pilates e rieducazione posturale.',
    photo: { url: '/images/reformer-gruppo-3.jpg' },
    certifications: [
      { certification: 'Pilates Mat & Reformer' },
      { certification: 'Rieducazione Posturale' },
      { certification: 'Personal Trainer' },
    ],
    yearsExperience: 8,
    specialty: 'Pilates Reformer',
    quote: 'Il movimento e la medicina del futuro.',
    instagram: 'https://instagram.com/kinelab',
  },
  {
    id: '2',
    name: 'Marco Benedetti',
    role: 'Functional Training Coach',
    shortBio: 'Con un background in scienze motorie e anni di esperienza nel fitness funzionale, Marco aiuta i clienti a raggiungere performance ottimali nella vita quotidiana e nello sport.',
    photo: { url: '/images/personal-training-1.jpg' },
    certifications: [
      { certification: 'Functional Training' },
      { certification: 'Kettlebell Specialist' },
      { certification: 'TRX Certified' },
    ],
    yearsExperience: 6,
    specialty: 'Functional Training',
    quote: 'Allena il movimento, non i muscoli.',
  },
  {
    id: '3',
    name: 'Elena Rossi',
    role: 'Pilates & Yoga Instructor',
    shortBio: 'Elena unisce la precisione del Pilates alla fluidita dello Yoga. Il suo approccio olistico aiuta a trovare equilibrio tra forza e flessibilita, fisico e mentale.',
    photo: { url: '/images/reformer-gruppo-1.jpg' },
    certifications: [
      { certification: 'Pilates Mat' },
      { certification: 'Hatha Yoga' },
      { certification: 'Stretching Terapeutico' },
    ],
    yearsExperience: 5,
    specialty: 'Pilates Mat & Yoga',
    quote: 'Respira, muoviti, vivi.',
  },
]

// Valori del team
const teamValues = [
  { number: '500+', label: 'Clienti Seguiti', icon: Sparkles },
  { number: '8+', label: 'Anni di Esperienza', icon: Calendar },
  { number: '15+', label: 'Certificazioni', icon: Award },
]

interface TeamSectionProps {
  members?: TeamMember[]
}

export function TeamSection({ members }: TeamSectionProps) {
  // Usa membri dal CMS o fallback
  const displayMembers: ExtendedTeamMember[] = members && members.length > 0 ? members : defaultTeam

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
          <p className="text-lg">
            Professionisti certificati con anni di esperienza, uniti dalla passione
            per il movimento consapevole e il benessere dei nostri clienti.
          </p>
        </motion.div>

        {/* Team Grid - Dynamic layout based on number */}
        <div className={`grid gap-8 ${
          displayMembers.length === 1 ? 'max-w-md mx-auto' :
          displayMembers.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' :
          'md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'
        }`}>
          {displayMembers.map((member, index) => {
            const imageUrl = member.photo?.url || '/images/studio-panoramic.jpg'
            const certifications = member.certifications?.map(c => c.certification) || ['Pilates', 'Functional']

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[--color-border]">
                  {/* Photo Container */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Experience Badge */}
                    {member.yearsExperience && (
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                        <span className="text-xs font-medium text-[--color-primary]">
                          {member.yearsExperience}+ anni esperienza
                        </span>
                      </div>
                    )}

                    {/* Social on hover */}
                    {member.instagram && (
                      <motion.a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-[--color-text-muted] hover:text-[--color-primary] shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                        aria-label="Instagram"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Instagram className="w-5 h-5" />
                      </motion.a>
                    )}

                    {/* Name & Role Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-medium text-white mb-1">{member.name}</h3>
                      <p className="text-[--color-accent] text-sm font-medium">
                        {member.role || 'Trainer'}
                      </p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    {/* Quote */}
                    {member.quote && (
                      <div className="flex items-start gap-2 mb-4 pb-4 border-b border-[--color-border-light]">
                        <Quote className="w-4 h-4 text-[--color-accent] flex-shrink-0 mt-0.5" />
                        <p className="text-sm italic text-[--color-text-muted]">
                          "{member.quote}"
                        </p>
                      </div>
                    )}

                    {/* Bio */}
                    <p className="text-[--color-text-muted] text-sm mb-5 leading-relaxed line-clamp-3">
                      {member.shortBio || 'Professionista qualificato per il tuo benessere.'}
                    </p>

                    {/* Specialty Tag */}
                    {member.specialty && (
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[--color-accent]/10 text-[--color-accent-dark] rounded-full text-xs font-medium">
                          <Sparkles className="w-3 h-3" />
                          Specializzazione: {member.specialty}
                        </span>
                      </div>
                    )}

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {certifications.slice(0, 3).map((cert: string) => (
                        <span
                          key={cert}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-[--color-bg-accent] rounded-full text-xs text-[--color-text-muted]"
                        >
                          <Award className="w-3 h-3 text-[--color-primary]" />
                          {cert}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href="/prenota"
                      className="block w-full text-center py-2.5 px-4 border border-[--color-primary] text-[--color-primary] rounded-lg text-sm font-medium hover:bg-[--color-primary] hover:text-white transition-all duration-300"
                    >
                      Prenota con {member.name.split(' ')[0]}
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 py-12 px-8 bg-[--color-bg-accent] rounded-2xl max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {teamValues.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[--color-accent]/10 mb-3">
                  <stat.icon className="w-5 h-5 text-[--color-accent]" />
                </div>
                <p className="text-3xl md:text-4xl font-medium text-[--color-primary] mb-1">
                  {stat.number}
                </p>
                <p className="text-xs md:text-sm text-[--color-text-muted] uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 max-w-2xl mx-auto"
        >
          <Quote className="w-8 h-8 text-[--color-accent]/30 mx-auto mb-4" />
          <p className="text-xl md:text-2xl text-[--color-text] font-light italic leading-relaxed mb-4">
            "Crediamo che il movimento consapevole sia la chiave per una vita
            piu equilibrata e soddisfacente."
          </p>
          <p className="text-sm text-[--color-text-muted]">
            — La Filosofia KineLab
          </p>
        </motion.div>
      </div>
    </section>
  )
}
