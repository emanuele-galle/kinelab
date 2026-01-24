import type { CollectionConfig } from 'payload'

export const Portfolio: CollectionConfig = {
  slug: 'portfolio',
  admin: {
    group: 'Contenuti',
    description: 'Progetti e lavori in mostra',
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'featured', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titolo progetto',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug URL',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Categoria',
      options: [
        { label: 'Fotografia Sportiva', value: 'sports' },
        { label: 'Eventi', value: 'events' },
        { label: 'Ritratti', value: 'portraits' },
        { label: 'Commerciale', value: 'commercial' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'In evidenza',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'portfolio-media',
      required: true,
      label: 'Immagine copertina',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Galleria immagini',
      minRows: 1,
      maxRows: 50,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'portfolio-media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Didascalia',
        },
        {
          name: 'order',
          type: 'number',
          label: 'Ordine',
          admin: {
            step: 1,
          },
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrizione breve',
      maxLength: 300,
    },
    {
      name: 'client',
      type: 'text',
      label: 'Cliente',
    },
    {
      name: 'date',
      type: 'date',
      label: 'Data progetto',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tag',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Data pubblicazione',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
          maxLength: 60,
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
