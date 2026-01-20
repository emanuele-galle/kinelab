import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Impostazioni Sito',
  admin: {
    group: 'Configurazione',
    description: 'Contenuti homepage e impostazioni generali',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero Homepage',
          fields: [
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Titolo Hero',
              defaultValue: 'Il movimento e vita',
            },
            {
              name: 'heroSubtitle',
              type: 'textarea',
              label: 'Sottotitolo Hero',
              defaultValue: 'Uno spazio dedicato al movimento e alla persona, con un approccio curato e personalizzato.',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Immagine Hero',
            },
            {
              name: 'heroCta',
              type: 'text',
              label: 'Testo CTA',
              defaultValue: 'Prenota una Lezione',
            },
            {
              name: 'heroCtaLink',
              type: 'text',
              label: 'Link CTA',
              defaultValue: '/prenota',
            },
          ],
        },
        {
          label: 'Chi Siamo',
          fields: [
            {
              name: 'aboutTitle',
              type: 'text',
              label: 'Titolo Sezione',
              defaultValue: 'Chi e KineLab',
            },
            {
              name: 'aboutContent',
              type: 'richText',
              label: 'Contenuto',
            },
            {
              name: 'aboutShort',
              type: 'textarea',
              label: 'Testo Breve (per homepage)',
              defaultValue: 'KineLab nasce dall\'idea di creare uno spazio dedicato al movimento e alla persona, con un approccio curato e personalizzato.',
            },
            {
              name: 'aboutImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Immagine',
            },
            {
              name: 'mission',
              type: 'textarea',
              label: 'Mission',
            },
            {
              name: 'vision',
              type: 'textarea',
              label: 'Vision',
            },
          ],
        },
        {
          label: 'CTA Prenotazione',
          fields: [
            {
              name: 'bookingCtaTitle',
              type: 'text',
              label: 'Titolo CTA',
              defaultValue: 'Pronto a muoverti?',
            },
            {
              name: 'bookingCtaText',
              type: 'textarea',
              label: 'Testo CTA',
              defaultValue: 'Inizia il tuo percorso di benessere con noi. Prenota la tua prima lezione.',
            },
            {
              name: 'bookingCtaButton',
              type: 'text',
              label: 'Testo Bottone',
              defaultValue: 'Prenota Ora',
            },
          ],
        },
        {
          label: 'Team',
          fields: [
            {
              name: 'teamTitle',
              type: 'text',
              label: 'Titolo Sezione Team',
              defaultValue: 'Il Nostro Team',
            },
            {
              name: 'teamDescription',
              type: 'textarea',
              label: 'Descrizione Team',
              defaultValue: 'Professionisti qualificati e appassionati, pronti ad accompagnarti nel tuo percorso.',
            },
          ],
        },
        {
          label: 'SEO Defaults',
          fields: [
            {
              name: 'siteTitle',
              type: 'text',
              label: 'Titolo Sito',
              defaultValue: 'KineLab Milano - Studio di Movimento',
            },
            {
              name: 'siteDescription',
              type: 'textarea',
              label: 'Descrizione Sito',
              defaultValue: 'Studio di movimento a Milano. Pilates, Functional Training e Personal Training con professionisti qualificati. Prenota la tua lezione in Via Pascoli 15.',
              maxLength: 160,
            },
            {
              name: 'siteKeywords',
              type: 'text',
              label: 'Keywords',
              defaultValue: 'pilates milano, functional training milano, personal trainer milano, studio movimento milano',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Immagine Social (OG)',
            },
          ],
        },
      ],
    },
  ],
}
