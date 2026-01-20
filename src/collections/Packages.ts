import type { CollectionConfig } from 'payload'

export const Packages: CollectionConfig = {
  slug: 'packages',
  admin: {
    useAsTitle: 'name',
    group: 'Prodotti',
    description: 'Pacchetti di sessioni in vendita',
    defaultColumns: ['name', 'service', 'sessions', 'price', 'isActive'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nome Pacchetto',
      admin: {
        description: 'Es. "Pacchetto 10 Lezioni Pilates"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrizione',
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      label: 'Servizio',
      admin: {
        description: 'Servizio associato al pacchetto',
      },
    },
    {
      name: 'sessions',
      type: 'number',
      required: true,
      label: 'Numero Sessioni',
      min: 1,
      max: 100,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Prezzo Totale',
      admin: {
        description: 'Prezzo in Euro',
      },
    },
    {
      name: 'pricePerSession',
      type: 'number',
      label: 'Prezzo per Sessione',
      admin: {
        readOnly: true,
        description: 'Calcolato automaticamente',
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            if (siblingData.price && siblingData.sessions) {
              return Math.round((siblingData.price / siblingData.sessions) * 100) / 100
            }
            return 0
          },
        ],
      },
    },
    {
      name: 'validityDays',
      type: 'number',
      label: 'Validita (giorni)',
      defaultValue: 90,
      admin: {
        description: 'Giorni di validita del pacchetto dall\'acquisto',
      },
    },
    {
      name: 'isPopular',
      type: 'checkbox',
      label: 'In Evidenza',
      defaultValue: false,
      admin: {
        description: 'Mostra badge "Popolare"',
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
