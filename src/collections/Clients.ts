import type { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'name',
    group: 'Operativo',
    description: 'Anagrafica clienti',
    defaultColumns: ['name', 'email', 'phone', 'totalSessions', 'isActive'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nome Completo',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          unique: true,
          label: 'Email',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Telefono',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'birthDate',
          type: 'date',
          label: 'Data di Nascita',
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
      ],
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Indirizzo',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Note',
          fields: [
            {
              name: 'notes',
              type: 'richText',
              label: 'Note Interne',
            },
            {
              name: 'medicalNotes',
              type: 'richText',
              label: 'Note Mediche / Limitazioni',
              admin: {
                description: 'Informazioni importanti su condizioni fisiche o limitazioni',
              },
            },
          ],
        },
        {
          label: 'Pacchetti',
          fields: [
            {
              name: 'activePackages',
              type: 'array',
              label: 'Pacchetti Attivi',
              fields: [
                {
                  name: 'package',
                  type: 'relationship',
                  relationTo: 'packages',
                  label: 'Pacchetto',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'purchaseDate',
                      type: 'date',
                      label: 'Data Acquisto',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'expiryDate',
                      type: 'date',
                      label: 'Scadenza',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'sessionsRemaining',
                      type: 'number',
                      label: 'Sessioni Rimanenti',
                      admin: { width: '33%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Statistiche',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'totalSessions',
                  type: 'number',
                  label: 'Sessioni Totali',
                  defaultValue: 0,
                  admin: {
                    readOnly: true,
                    width: '50%',
                  },
                },
                {
                  name: 'firstVisit',
                  type: 'date',
                  label: 'Prima Visita',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'source',
              type: 'select',
              label: 'Come ci ha conosciuto',
              options: [
                { label: 'Sito Web', value: 'website' },
                { label: 'Passaparola', value: 'referral' },
                { label: 'Social Media', value: 'social' },
                { label: 'Google', value: 'google' },
                { label: 'Altro', value: 'other' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'preferredTrainer',
      type: 'relationship',
      relationTo: 'team-members',
      label: 'Trainer Preferito',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Cliente Attivo',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
