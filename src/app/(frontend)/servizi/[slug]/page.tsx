import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, Users, CheckCircle, MapPin, Phone, Calendar } from 'lucide-react'
import { getServiceBySlug, getServices, getBusinessInfo, type Service } from '@/lib/payload'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Dati estesi per ogni servizio (fallback/default)
const serviceDetails: Record<string, {
  fullDescription: string
  benefits: string[]
  targetAudience: string
  methodology: string[]
  faq: { question: string; answer: string }[]
}> = {
  pilates: {
    fullDescription: `Il Pilates e un sistema di allenamento sviluppato all'inizio del XX secolo da Joseph Pilates.
    Questo metodo si concentra sulla connessione tra mente e corpo, utilizzando movimenti controllati e precisi per sviluppare la forza del core, migliorare la postura e aumentare la flessibilita.

    Presso KineLab, offriamo sia lezioni di Pilates Mat (a corpo libero) che sessioni con attrezzi professionali come il Reformer. Ogni lezione e progettata per adattarsi al tuo livello, che tu sia un principiante o un praticante avanzato.`,
    benefits: [
      'Miglioramento della postura e allineamento corporeo',
      'Rinforzo dei muscoli profondi del core',
      'Aumento della flessibilita e mobilita articolare',
      'Riduzione del mal di schiena e tensioni muscolari',
      'Miglioramento della consapevolezza corporea',
      'Riduzione dello stress e aumento del benessere mentale',
    ],
    targetAudience: 'Il Pilates e adatto a tutti, indipendentemente dall\'eta o dal livello di forma fisica. E particolarmente indicato per chi cerca un allenamento a basso impatto ma efficace, per chi vuole migliorare la postura o recuperare da infortuni.',
    methodology: [
      'Valutazione posturale iniziale',
      'Programma personalizzato in base ai tuoi obiettivi',
      'Progressione graduale della difficolta',
      'Correzioni continue per massimizzare i risultati',
    ],
    faq: [
      {
        question: 'Devo avere esperienza per iniziare?',
        answer: 'Assolutamente no! Le nostre lezioni sono strutturate per accogliere tutti i livelli, dai principianti assoluti ai praticanti avanzati.',
      },
      {
        question: 'Qual e la differenza tra Mat e Reformer?',
        answer: 'Il Pilates Mat si svolge a corpo libero sul tappetino, mentre il Reformer utilizza un attrezzo specifico con molle e resistenze che permettono esercizi piu variegati e assistiti.',
      },
      {
        question: 'Ogni quanto dovrei praticare?',
        answer: 'Per risultati ottimali consigliamo 2-3 sessioni settimanali. Tuttavia, anche una sola lezione a settimana puo portare benefici significativi.',
      },
    ],
  },
  functional: {
    fullDescription: `Il Functional Training, o allenamento funzionale, si basa su esercizi che mimano i movimenti naturali del corpo umano.
    L'obiettivo e migliorare la capacita di svolgere le attivita quotidiane in modo piu efficiente e sicuro.

    Utilizziamo attrezzi come kettlebell, TRX, palle mediche e il peso corporeo per creare workout dinamici che sviluppano forza, coordinazione, equilibrio e resistenza in modo integrato.`,
    benefits: [
      'Sviluppo di forza funzionale applicabile nella vita quotidiana',
      'Miglioramento della coordinazione e dell\'equilibrio',
      'Aumento della resistenza cardiovascolare',
      'Prevenzione degli infortuni',
      'Miglioramento delle performance sportive',
      'Accelerazione del metabolismo',
    ],
    targetAudience: 'Ideale per chi vuole un allenamento dinamico e completo, per atleti che vogliono migliorare le loro performance, e per chiunque desideri sentirsi piu forte e agile nelle attivita quotidiane.',
    methodology: [
      'Assessment iniziale delle capacita motorie',
      'Workout personalizzati in base agli obiettivi',
      'Varieta di esercizi per stimolare il corpo a 360 gradi',
      'Monitoraggio dei progressi e adattamento del programma',
    ],
    faq: [
      {
        question: 'E un allenamento intenso?',
        answer: 'L\'intensita viene sempre adattata al tuo livello. Inizieremo con un approccio graduale per poi aumentare progressivamente la difficolta man mano che migliori.',
      },
      {
        question: 'Posso praticarlo se ho problemi alle articolazioni?',
        answer: 'Si, gli esercizi possono essere modificati per adattarsi a qualsiasi condizione. E importante comunicarci eventuali problemi durante la valutazione iniziale.',
      },
      {
        question: 'Quali risultati posso aspettarmi?',
        answer: 'Con costanza, noterai miglioramenti nella forza, nell\'energia quotidiana e nella composizione corporea gia dopo 4-6 settimane.',
      },
    ],
  },
  personal: {
    fullDescription: `Il Personal Training rappresenta il massimo della personalizzazione nel fitness.
    Un trainer certificato lavora esclusivamente con te, creando un percorso su misura basato sui tuoi obiettivi, condizioni fisiche, preferenze e disponibilita.

    Che tu voglia perdere peso, aumentare la massa muscolare, prepararti per un evento sportivo o semplicemente migliorare il tuo benessere generale, il Personal Training ti offre la strada piu diretta verso il successo.`,
    benefits: [
      'Programma completamente personalizzato',
      'Attenzione dedicata al 100%',
      'Correzione immediata della tecnica',
      'Flessibilita negli orari',
      'Motivazione costante',
      'Risultati piu rapidi e duraturi',
    ],
    targetAudience: 'Perfetto per chi ha obiettivi specifici da raggiungere, poco tempo a disposizione, necessita di un approccio personalizzato per condizioni particolari, o semplicemente preferisce l\'attenzione esclusiva di un professionista.',
    methodology: [
      'Colloquio approfondito per comprendere obiettivi e storia',
      'Valutazione fisica completa (postura, mobilita, forza)',
      'Creazione di un programma personalizzato',
      'Sessioni individuali con feedback continuo',
      'Revisione periodica e aggiustamento del programma',
    ],
    faq: [
      {
        question: 'Quanto costa una sessione di Personal Training?',
        answer: 'Le sessioni partono da 70 euro. Offriamo anche pacchetti che permettono un risparmio significativo. Contattaci per un preventivo personalizzato.',
      },
      {
        question: 'Quanto dura una sessione?',
        answer: 'Le sessioni standard durano 60 minuti, ma possiamo adattare la durata alle tue esigenze.',
      },
      {
        question: 'Posso combinare il Personal Training con altre discipline?',
        answer: 'Certamente! Molti dei nostri clienti integrano sessioni di Personal Training con lezioni di Pilates o Functional Training per un approccio piu completo.',
      },
    ],
  },
}

// Immagini per categoria
const categoryImages: Record<string, string> = {
  pilates: '/images/reformer-gruppo-2.jpg',
  functional: '/images/studio-functional-area.jpg',
  personal: '/images/reformer-singolo.jpg',
}

// Fallback services
const defaultServices: Service[] = [
  {
    id: '1',
    name: 'Pilates',
    slug: 'pilates',
    category: 'pilates',
    shortDescription: 'Migliora postura, flessibilita e forza del core attraverso movimenti controllati e consapevoli.',
    duration: 55,
    price: 50,
  },
  {
    id: '2',
    name: 'Functional Training',
    slug: 'functional',
    category: 'functional',
    shortDescription: 'Allenamento funzionale per migliorare la qualita dei movimenti quotidiani.',
    duration: 50,
    price: 45,
  },
  {
    id: '3',
    name: 'Personal Training',
    slug: 'personal',
    category: 'personal',
    shortDescription: 'Sessioni individuali personalizzate per raggiungere i tuoi obiettivi specifici.',
    duration: 60,
    price: 70,
  },
]

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug) || defaultServices.find(s => s.slug === slug)

  if (!service) {
    return {
      title: 'Servizio non trovato | KineLab Milano',
    }
  }

  return {
    title: `${service.name} Milano | Lezioni e Corsi | KineLab`,
    description: service.shortDescription || `Scopri il nostro servizio di ${service.name}. Prenota una lezione presso KineLab Milano.`,
    openGraph: {
      title: `${service.name} | KineLab Milano`,
      description: service.shortDescription,
    },
  }
}

export async function generateStaticParams() {
  const services = await getServices()
  const slugs = services.length > 0
    ? services.map(s => ({ slug: s.slug }))
    : defaultServices.map(s => ({ slug: s.slug }))

  return slugs
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const [service, businessInfo] = await Promise.all([
    getServiceBySlug(slug),
    getBusinessInfo(),
  ])

  // Use CMS service or fallback
  const displayService = service || defaultServices.find(s => s.slug === slug)
  if (!displayService) {
    notFound()
  }

  const details = serviceDetails[displayService.category] || serviceDetails.pilates
  const image = displayService.image?.url || categoryImages[displayService.category] || categoryImages.pilates

  // Schema.org markup for Course
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: displayService.name,
    description: displayService.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: businessInfo.companyName || 'KineLab Milano',
      address: {
        '@type': 'PostalAddress',
        streetAddress: businessInfo.address,
        addressLocality: businessInfo.city,
        postalCode: businessInfo.postalCode,
        addressCountry: 'IT',
      },
    },
    offers: {
      '@type': 'Offer',
      price: displayService.price || 50,
      priceCurrency: 'EUR',
    },
  }

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-[--color-bg-accent]">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/servizi"
              className="inline-flex items-center gap-2 text-[--color-text-muted] hover:text-[--color-primary] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Tutti i servizi
            </Link>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Content */}
            <div>
              <p className="text-[--color-primary] text-sm tracking-[0.15em] uppercase mb-4">
                {displayService.category === 'pilates' ? 'Pilates' :
                 displayService.category === 'functional' ? 'Allenamento Funzionale' : 'Training Personalizzato'}
              </p>
              <h1 className="mb-6">{displayService.name}</h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-[--color-text-muted]">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {displayService.duration || 60} minuti
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {displayService.category === 'personal' ? 'Solo individuale' : 'Individuale / Gruppo'}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  Milano
                </span>
              </div>

              <p className="text-lg text-[--color-text-muted] mb-8">
                {displayService.shortDescription}
              </p>

              {/* Price */}
              <div className="mb-8 p-4 bg-white rounded-lg border border-[--color-border]">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-medium text-[--color-accent]">
                    da {displayService.price || 50}
                  </span>
                  <span className="text-[--color-text-muted]">/sessione</span>
                </div>
                <p className="text-sm text-[--color-text-light] mt-1">
                  Pacchetti disponibili con sconti fino al 20%
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/prenota"
                  className="btn bg-[--color-accent] text-[--color-text] hover:bg-[--color-accent-dark] px-8"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Prenota Ora
                </Link>
                <a
                  href={`tel:${businessInfo.phone?.replace(/\s/g, '')}`}
                  className="btn btn-outline"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Chiama
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={image}
                alt={displayService.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full Description */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl mb-6">Cos'e il {displayService.name}</h2>
            <div className="prose prose-lg text-[--color-text-muted] whitespace-pre-line">
              {details.fullDescription}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-[--color-bg-accent]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl text-center mb-12">Benefici</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {details.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[--color-border]"
                >
                  <CheckCircle className="w-5 h-5 text-[--color-accent-sage] flex-shrink-0 mt-0.5" />
                  <span className="text-[--color-text]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl mb-6">Per chi e adatto</h2>
            <p className="text-lg text-[--color-text-muted]">
              {details.targetAudience}
            </p>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section bg-[--color-bg-accent]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl text-center mb-12">Il Nostro Approccio</h2>
            <div className="space-y-4">
              {details.methodology.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg border border-[--color-border]"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[--color-accent] text-[--color-text] flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <span className="text-[--color-text] pt-1">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl text-center mb-12">Domande Frequenti</h2>
            <div className="space-y-4">
              {details.faq.map((item, index) => (
                <details
                  key={index}
                  className="group p-6 bg-[--color-bg-accent] rounded-lg border border-[--color-border]"
                >
                  <summary className="font-medium cursor-pointer list-none flex items-center justify-between">
                    {item.question}
                    <span className="ml-4 flex-shrink-0 transition-transform group-open:rotate-180">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-4 text-[--color-text-muted]">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[--color-primary] text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl text-white mb-4">
              Pronto a iniziare con il {displayService.name}?
            </h2>
            <p className="text-white/80 mb-8">
              Prenota la tua prima lezione o contattaci per una consulenza gratuita.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/prenota"
                className="btn bg-[--color-accent] text-[--color-text] hover:bg-[--color-accent-dark] px-8"
              >
                Prenota Ora
              </Link>
              <a
                href={`tel:${businessInfo.phone?.replace(/\s/g, '')}`}
                className="btn bg-white/10 text-white hover:bg-white/20 border border-white/30 px-8"
              >
                <Phone className="w-5 h-5 mr-2" />
                Chiama
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
