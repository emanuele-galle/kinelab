import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Users, Flame, TrendingUp } from 'lucide-react'
import { getServices, getBusinessInfo, type Service } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Servizi | Pilates, Functional & Personal Training | KineLab Milano',
  description: 'Scopri i nostri servizi: Pilates Mat e Reformer, Functional Training e Personal Training. Programmi personalizzati per il tuo benessere a Milano.',
  openGraph: {
    title: 'Servizi | KineLab Milano',
    description: 'Pilates, Functional Training e Personal Training a Milano. Scopri il metodo KineLab.',
  },
}

// Fallback servizi dettagliati
const defaultServices: (Service & { fullDescription: string; benefits: string[]; targetAudience: string })[] = [
  {
    id: '1',
    name: 'Pilates',
    slug: 'pilates',
    category: 'pilates',
    shortDescription: 'Migliora postura, flessibilita e forza del core attraverso movimenti controllati e consapevoli.',
    duration: 55,
    price: 50,
    fullDescription: 'Il Pilates e un metodo di allenamento che sviluppa il corpo in modo uniforme, corregge le posture sbagliate, ripristina la vitalita fisica, rinvigorisce la mente ed eleva lo spirito.',
    benefits: ['Miglioramento postura', 'Rinforzo core', 'Aumento flessibilita', 'Riduzione stress'],
    targetAudience: 'Adatto a tutti i livelli, ideale per chi cerca un allenamento consapevole e rigenerante.',
  },
  {
    id: '2',
    name: 'Functional Training',
    slug: 'functional',
    category: 'functional',
    shortDescription: 'Allenamento funzionale per migliorare la qualita dei movimenti quotidiani.',
    duration: 50,
    price: 45,
    fullDescription: 'L\'allenamento funzionale si concentra su movimenti che replicano le attivita quotidiane, migliorando forza, equilibrio e coordinazione in modo integrato.',
    benefits: ['Forza funzionale', 'Coordinazione', 'Equilibrio', 'Prevenzione infortuni'],
    targetAudience: 'Perfetto per chi vuole migliorare le performance nella vita quotidiana e nello sport.',
  },
  {
    id: '3',
    name: 'Personal Training',
    slug: 'personal',
    category: 'personal',
    shortDescription: 'Sessioni individuali personalizzate per raggiungere i tuoi obiettivi specifici.',
    duration: 60,
    price: 70,
    fullDescription: 'Un percorso completamente personalizzato, studiato sulle tue esigenze, obiettivi e condizioni fisiche. Il massimo dell\'attenzione dedicata esclusivamente a te.',
    benefits: ['Programma su misura', 'Attenzione dedicata', 'Risultati ottimizzati', 'Flessibilita orari'],
    targetAudience: 'Ideale per chi ha obiettivi specifici o necessita di un approccio completamente personalizzato.',
  },
]

// Urgency badges
const urgencyBadges: Record<string, { text: string; icon: 'flame' | 'trending'; color: string } | null> = {
  pilates: { text: 'Piu richiesto', icon: 'flame', color: 'bg-orange-500' },
  personal: { text: 'Posti limitati', icon: 'trending', color: 'bg-red-500' },
  functional: null,
}

// Immagini per categoria
const categoryImages: Record<string, string> = {
  pilates: '/images/reformer-gruppo-2.jpg',
  functional: '/images/studio-functional-area.jpg',
  personal: '/images/reformer-singolo.jpg',
}

export default async function ServiziPage() {
  const [services, businessInfo] = await Promise.all([
    getServices(),
    getBusinessInfo(),
  ])

  // Usa servizi dal CMS o fallback
  const displayServices = services.length > 0 ? services : defaultServices

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
            {displayServices.map((service, index) => {
              const isEven = index % 2 === 0
              const badge = urgencyBadges[service.category]
              const image = service.image?.url || categoryImages[service.category] || categoryImages.pilates

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
                        {service.category === 'personal' ? 'Solo individuale' : 'Individuale / Gruppo'}
                      </span>
                    </div>

                    <p className="text-[--color-text-muted] text-lg leading-relaxed mb-6">
                      {service.shortDescription || 'Sessioni professionali per il tuo benessere.'}
                    </p>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-2xl font-medium text-[--color-accent]">
                        da {service.price || 50}
                      </span>
                      <span className="text-[--color-text-muted] ml-1">/sessione</span>
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
