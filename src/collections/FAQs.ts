import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    group: 'Contenuti',
    description: 'Domande frequenti (utili per SEO)',
    defaultColumns: ['question', 'category', 'order', 'isPublished'],
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Domanda',
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      label: 'Risposta',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Categoria',
      options: [
        { label: 'Generale', value: 'general' },
        { label: 'Prenotazioni', value: 'bookings' },
        { label: 'Servizi', value: 'services' },
        { label: 'Prezzi', value: 'pricing' },
        { label: 'Orari', value: 'schedule' },
      ],
      defaultValue: 'general',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordine',
      defaultValue: 0,
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      label: 'Pubblicata',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
