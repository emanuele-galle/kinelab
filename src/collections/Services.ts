import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    group: 'Contenuti',
    description: 'Servizi offerti (Pilates, Functional, Personal)',
    defaultColumns: ['name', 'category', 'duration', 'price', 'isActive'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome Servizio',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug URL',
      admin: {
        description: 'Usato nell\'URL della pagina (es. pilates)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categoria',
      options: [
        { label: 'Pilates', value: 'pilates' },
        { label: 'Functional Training', value: 'functional' },
        { label: 'Personal Training', value: 'personal' },
        { label: 'Yoga', value: 'yoga' },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Descrizione Breve',
      admin: {
        description: 'Visualizzata nelle card (max 150 caratteri)',
      },
      maxLength: 150,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Descrizione Completa',
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefici',
      fields: [
        {
          name: 'benefit',
          type: 'text',
          label: 'Beneficio',
        },
      ],
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Durata (minuti)',
      defaultValue: 60,
      min: 15,
      max: 120,
    },
    {
      name: 'price',
      type: 'number',
      label: 'Prezzo Singola Sessione',
      admin: {
        description: 'Prezzo in Euro',
      },
    },
    {
      name: 'originalPrice',
      type: 'number',
      label: 'Prezzo Originale (opzionale)',
      admin: {
        description: 'Se presente, il prezzo originale verrà mostrato barrato e il campo "price" sarà il prezzo scontato',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Icona Lucide',
      admin: {
        description: 'Nome icona Lucide (es. Dumbbell, Heart, User)',
      },
      defaultValue: 'Activity',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordine',
      defaultValue: 0,
      admin: {
        description: 'Ordine di visualizzazione (minore = prima)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Attivo',
      defaultValue: true,
    },
    {
      name: 'timpActivityId',
      type: 'text',
      label: 'TIMP Activity ID',
      admin: {
        position: 'sidebar',
        description: 'ID attivita su TIMP per sync futuro',
      },
    },
    {
      type: 'collapsible',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          maxLength: 160,
        },
      ],
    },
  ],
}
