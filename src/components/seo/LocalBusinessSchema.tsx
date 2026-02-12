import type { BusinessInfo, Service } from '@/data'

interface LocalBusinessSchemaProps {
  businessInfo?: BusinessInfo
  services?: Service[]
}

export function LocalBusinessSchema({ businessInfo, services }: LocalBusinessSchemaProps) {
  // Dati dal CMS con fallback
  const companyName = businessInfo?.companyName || 'KineLab - Studio di Movimento'
  const phone = businessInfo?.phone || '+39 02 8233 7048'
  const email = businessInfo?.email || 'kinelabmilano@gmail.com'
  const address = businessInfo?.address || 'Via Pascoli 15'
  const city = businessInfo?.city || 'Milano'
  const postalCode = businessInfo?.postalCode || '20129'
  const instagram = businessInfo?.instagram
  const facebook = businessInfo?.facebook

  // Social links
  const sameAs = [instagram, facebook].filter(Boolean) as string[]

  // Servizi dinamici dal CMS
  const serviceOffers = services && services.length > 0
    ? services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.shortDescription || `Servizio ${service.name}`,
        },
        price: service.price || undefined,
        priceCurrency: service.price ? 'EUR' : undefined,
      }))
    : [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pilates',
            description: 'Lezioni di Pilates individuali e in piccoli gruppi',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Functional Training',
            description: 'Allenamento funzionale personalizzato',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Personal Training',
            description: 'Sessioni di allenamento one-to-one',
          },
        },
      ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'SportsActivityLocation', 'HealthAndBeautyBusiness'],
    '@id': 'https://kinelabmilano.it/#organization',
    name: companyName,
    alternateName: 'KINELAB SSD',
    description:
      'Studio di movimento a Milano specializzato in Pilates, Functional Training e Personal Training. Professionisti qualificati per il tuo benessere.',
    url: 'https://kinelabmilano.it',
    telephone: phone,
    email: email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: city,
      postalCode: postalCode,
      addressRegion: 'MI',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.4773,
      longitude: 9.2068,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'EUR',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
    image: [
      'https://kinelabmilano.it/images/studio-1.jpg',
      'https://kinelabmilano.it/images/studio-2.jpg',
    ],
    sameAs: sameAs.length > 0 ? sameAs : undefined,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servizi KineLab',
      itemListElement: serviceOffers,
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Dove si trova KineLab a Milano?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `KineLab si trova in ${address}, ${postalCode} ${city}, zona Porta Venezia.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Quali servizi offre KineLab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'KineLab offre Pilates, Functional Training e Personal Training con professionisti certificati.',
        },
      },
      {
        '@type': 'Question',
        name: 'Come posso prenotare una lezione a KineLab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Puoi prenotare online sul sito kinelabmilano.it o telefonando al ${phone}. Per informazioni puoi contattarci anche su WhatsApp.`,
        },
      },
      {
        '@type': 'Question',
        name: 'KineLab e adatto ai principianti?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Assolutamente si! I nostri corsi sono adatti a tutti i livelli, dai principianti agli avanzati. Ogni programma viene personalizzato in base alle tue esigenze.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quanto costa una lezione di Pilates a KineLab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I prezzi variano in base al tipo di lezione (individuale o di gruppo) e al pacchetto scelto. Contattaci per un preventivo personalizzato.',
        },
      },
    ],
  }

  // WebSite schema per search box Google
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://kinelabmilano.it/#website',
    url: 'https://kinelabmilano.it',
    name: companyName,
    description: 'Studio di Pilates e Movement a Milano',
    publisher: {
      '@id': 'https://kinelabmilano.it/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://kinelabmilano.it/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'it-IT',
  }

  // Course schema per i servizi principali
  const courseSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Corso di Pilates Mat',
      description: 'Lezioni di Pilates a corpo libero per migliorare postura, forza e flessibilita. Adatto a tutti i livelli.',
      provider: {
        '@type': 'Organization',
        name: companyName,
        sameAs: 'https://kinelabmilano.it',
      },
      courseMode: ['onsite'],
      educationalLevel: 'Beginner to Advanced',
      inLanguage: 'it',
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        location: {
          '@type': 'Place',
          name: companyName,
          address: {
            '@type': 'PostalAddress',
            streetAddress: address,
            addressLocality: city,
            postalCode: postalCode,
            addressCountry: 'IT',
          },
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Corso di Pilates Reformer',
      description: 'Lezioni di Pilates con macchine Reformer professionali per un allenamento completo e personalizzato.',
      provider: {
        '@type': 'Organization',
        name: companyName,
        sameAs: 'https://kinelabmilano.it',
      },
      courseMode: ['onsite'],
      educationalLevel: 'Beginner to Advanced',
      inLanguage: 'it',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Functional Training',
      description: 'Allenamento funzionale personalizzato per migliorare forza, resistenza e mobilita nella vita quotidiana.',
      provider: {
        '@type': 'Organization',
        name: companyName,
        sameAs: 'https://kinelabmilano.it',
      },
      courseMode: ['onsite'],
      educationalLevel: 'All Levels',
      inLanguage: 'it',
    },
  ]

  // Breadcrumb schema per navigazione
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://kinelabmilano.it',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Servizi',
        item: 'https://kinelabmilano.it/#servizi',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Prenota',
        item: 'https://kinelabmilano.it/prenota',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {courseSchemas.map((courseSchema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
      ))}
    </>
  )
}
