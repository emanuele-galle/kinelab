import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Users, Flame, TrendingUp } from 'lucide-react'
import { services } from '@/data'

export const metadata: Metadata = {
  title: 'Servizi | Pilates, Functional & Personal Training | KineLab Milano',
  description: 'Scopri i nostri servizi: Pilates Mat e Reformer, Functional Training e Personal Training. Programmi personalizzati per il tuo benessere a Milano.',
  openGraph: {
    title: 'Servizi | KineLab Milano',
    description: 'Pilates, Functional Training e Personal Training a Milano. Scopri il metodo KineLab.',
  },
}

// Urgency badges
const urgencyBadges: Record<string, { text: string; icon: 'flame' | 'trending'; color: string } | null> = {
  pilates: { text: 'Piu richiesto', icon: 'flame', color: 'bg-orange-500' },
  personal: { text: 'Posti limitati', icon: 'trending', color: 'bg-red-500' },
  functional: null,
}

// Immagini per categoria (fallback se service.image mancante)
const categoryImages: Record<string, string> = {
  pilates: '/images/reformer-gruppo-2.jpg',
  functional: '/images/studio-functional-area.jpg',
  personal: '/images/reformer-singolo.jpg',
}

export default function ServiziPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-[--color-bg-accent]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[--color-primary] text-sm tracking-[0.15em] uppercase mb-4">
              Il Metodo KineLab
            </p>
            <h1 className="mb-6">I Nostri Servizi</h1>
            <div className="w-12 h-[1px] bg-[--color-primary] mx-auto mb-6" />
            <p className="text-lg text-[--color-text-muted] max-w-2xl mx-auto">
              Tre discipline integrate per il tuo benessere. Un approccio olistico
              al movimento, pensato per ogni esigenza.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section">
        <div className="container">
          <div className="space-y-16">
            {services.map((service, index) => {
              const isEven = index % 2 === 0
              const badge = urgencyBadges[service.category]
              const image = service.image || categoryImages[service.category] || categoryImages.pilates

              return (
                <div
                  key={service.id}
                  className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                    !isEven ? 'md:[direction:rtl]' : ''
                  }`}
                >
                  {/* Image */}
                  <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${!isEven ? 'md:[direction:ltr]' : ''}`}>
                    <Image
                      src={image}
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                    {badge && (
                      <div className={`absolute top-4 left-4 ${badge.color} text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}>
                        {badge.icon === 'flame' ? (
                          <Flame className="w-3.5 h-3.5" />
                        ) : (
                          <TrendingUp className="w-3.5 h-3.5" />
                        )}
                        {badge.text}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`${!isEven ? 'md:[direction:ltr]' : ''}`}>
                    <h2 className="text-3xl md:text-4xl font-medium mb-4">{service.name}</h2>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-6 text-sm text-[--color-text-muted]">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {service.duration || 60} minuti
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="w-4 h-4" />
                        {service.category === 'personal' ? 'Individuale / Coppia' :
                         service.category === 'functional' ? 'Small Group (3 persone)' :
                         'One to One / Coppia / Small Group'}
                      </span>
                    </div>

                    <p className="text-[--color-text-muted] text-lg leading-relaxed mb-6">
                      {service.shortDescription || 'Sessioni professionali per il tuo benessere.'}
                    </p>

                    {/* Price by mode */}
                    <div className="mb-6">
                      {service.pricingModes && service.pricingModes.length > 0 ? (
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          {service.pricingModes.map((mode) => (
                            <div key={mode.name} className="flex items-baseline gap-1.5">
                              <span className="text-sm text-[--color-text-muted]">{mode.name}</span>
                              <span className="text-xl font-medium text-[--color-accent]">€{mode.singlePrice}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <span className="text-2xl font-medium text-[--color-accent]">
                            da €{service.price || 50}
                          </span>
                          <span className="text-[--color-text-muted] ml-1">/sessione</span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href={`/servizi/${service.slug}`}
                        className="btn btn-outline group"
                      >
                        Scopri di piu
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                      <Link
                        href="/prenota"
                        className="btn bg-[--color-accent] text-[--color-text] hover:bg-[--color-accent-dark]"
                      >
                        Prenota Ora
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-[--color-bg-accent]">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl mb-4">Non sai quale servizio scegliere?</h2>
            <p className="text-[--color-text-muted] mb-8">
              Prenota una consulenza gratuita con i nostri trainer per trovare
              il percorso piu adatto alle tue esigenze e obiettivi.
            </p>
            <Link
              href="/prenota"
              className="btn bg-[--color-accent] text-[--color-text] hover:bg-[--color-accent-dark] px-8 py-4"
            >
              Prenota una Consulenza Gratuita
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
