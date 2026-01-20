import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    group: 'Contenuti',
    description: 'Recensioni e testimonianze clienti',
    defaultColumns: ['clientName', 'rating', 'service', 'isApproved', 'isFeatured'],
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      label: 'Nome Cliente',
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Testimonianza',
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Valutazione',
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Da 1 a 5 stelle',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      label: 'Servizio',
      admin: {
        description: 'Servizio a cui si riferisce la recensione',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto Cliente',
    },
    {
      name: 'isApproved',
      type: 'checkbox',
      label: 'Approvata',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Solo le recensioni approvate sono visibili',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      label: 'In Evidenza',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Mostra in homepage',
      },
    },
  ],
}
