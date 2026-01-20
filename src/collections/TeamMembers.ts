import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    group: 'Contenuti',
    description: 'Professionisti del team',
    defaultColumns: ['name', 'role', 'isActive'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome Completo',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Ruolo / Specializzazione',
      admin: {
        description: 'Es. "Istruttore Pilates", "Personal Trainer"',
      },
    },
    {
      name: 'shortBio',
      type: 'textarea',
      label: 'Bio Breve',
      maxLength: 200,
      admin: {
        description: 'Visualizzata nelle card (max 200 caratteri)',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Biografia Completa',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Foto',
    },
    {
      name: 'certifications',
      type: 'array',
      label: 'Certificazioni',
      fields: [
        {
          name: 'certification',
          type: 'text',
          label: 'Certificazione',
        },
      ],
    },
    {
      name: 'specialties',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      label: 'Specializzazioni',
      admin: {
        description: 'Servizi in cui e specializzato',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'instagram',
      type: 'text',
      label: 'Instagram',
      admin: {
        description: 'Username Instagram (senza @)',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordine',
      defaultValue: 0,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Attivo',
      defaultValue: true,
    },
  ],
}
