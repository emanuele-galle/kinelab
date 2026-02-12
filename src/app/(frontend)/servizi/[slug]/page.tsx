import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, Users, CheckCircle, MapPin, Phone, Calendar } from 'lucide-react'
import { services, serviceDetails, businessInfo } from '@/data'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Immagini per categoria
const categoryImages: Record<string, string> = {
  pilates: '/images/reformer-gruppo-2.jpg',
  functional: '/images/studio-functional-area.jpg',
  personal: '/images/reformer-singolo.jpg',
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = services.find(s => s.slug === slug)

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

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }))
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const displayService = services.find(s => s.slug === slug)

  if (!displayService) {
    notFound()
  }

  const details = serviceDetails[displayService.category] || serviceDetails.pilates
  const image = displayService.image || categoryImages[displayService.category] || categoryImages.pilates

  // Schema.org markup for Course
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: displayService.name,
    description: displayService.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: businessInfo.companyName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: businessInfo.address,
        addressLocality: businessInfo.city,
        postalCode: businessInfo.postalCode,
        addressCountry: 'IT',
      },
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: displayService.price || 45,
      highPrice: displayService.pricingModes?.[0]?.singlePrice || displayService.price || 45,
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
                {displayService.category === 'pilates' ? 'Pilates Reformer' :
                 displayService.category === 'functional' ? 'Allenamento Funzionale' : 'Personal Training'}
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
                  {displayService.category === 'personal' ? 'Individuale / Coppia' :
                   displayService.category === 'functional' ? 'Small Group (3 persone)' :
                   'One to One / Coppia / Small Group'}
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
                    da €{displayService.price || 45}
                  </span>
                  <span className="text-[--color-text-muted]">/sessione</span>
                </div>
                <p className="text-sm text-[--color-text-light] mt-1">
                  Pacchetti disponibili con sconti progressivi
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
                  href={`tel:${businessInfo.phone.replace(/\s/g, '')}`}
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

      {/* Pricing Table */}
      {displayService.pricingModes && displayService.pricingModes.length > 0 && (
        <section id="listino" className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl text-center mb-4">Listino Prezzi</h2>
              <p className="text-center text-[--color-text-muted] mb-12">
                Sconti progressivi sui pacchetti piu grandi
              </p>

              <div className="space-y-8">
                {displayService.pricingModes.map((mode) => (
                  <div key={mode.name} className="bg-white rounded-xl border border-[--color-border] overflow-hidden">
                    {/* Mode Header */}
                    <div className="px-6 py-4 bg-[--color-bg-accent] border-b border-[--color-border]">
                      <h3 className="text-lg font-semibold">{mode.name}</h3>
                      {mode.description && (
                        <p className="text-sm text-[--color-text-muted]">{mode.description}</p>
                      )}
                    </div>

                    {/* Pricing Rows */}
                    <div className="divide-y divide-[--color-border]">
                      {/* Single Session */}
                      <div className="px-6 py-4 flex items-center justify-between">
                        <div>
                          <span className="font-medium">Seduta singola</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-[--color-accent]">{mode.singlePrice}€</span>
                          <span className="text-[--color-text-muted] text-sm ml-1">/seduta</span>
                        </div>
                      </div>

                      {/* Packages */}
                      {mode.packages.map((pkg) => {
                        const perSession = Math.floor(pkg.totalPrice / pkg.sessions)
                        const savings = mode.singlePrice * pkg.sessions - pkg.totalPrice
                        return (
                          <div key={pkg.sessions} className={`px-6 py-4 flex items-center justify-between ${pkg.badge ? 'bg-[--color-accent]/5' : ''}`}>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{pkg.sessions} lezioni</span>
                                {pkg.badge && (
                                  <span className="px-2 py-0.5 bg-[--color-accent] text-[--color-text] text-xs font-bold rounded-full">
                                    {pkg.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-sm text-[--color-text-muted]">
                                Validita {pkg.validity}
                                {savings > 0 && ` · Risparmi ${savings}€`}
                              </span>
                            </div>
                            <div className="text-right">
                              <div>
                                <span className="text-xl font-bold text-[--color-accent]">{pkg.totalPrice.toLocaleString('it-IT')}€</span>
                              </div>
                              <span className="text-sm text-[--color-text-muted]">{perSession}€/seduta</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
                href={`tel:${businessInfo.phone.replace(/\s/g, '')}`}
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
