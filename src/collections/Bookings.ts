import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'clientName',
    group: 'Operativo',
    description: 'Prenotazioni clienti',
    defaultColumns: ['clientName', 'service', 'date', 'time', 'status', 'createdAt'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'client',
          type: 'relationship',
          relationTo: 'clients',
          label: 'Cliente Registrato',
          admin: {
            width: '50%',
            description: 'Seleziona se il cliente e registrato',
          },
        },
        {
          name: 'clientName',
          type: 'text',
          label: 'Nome Cliente',
          admin: {
            width: '50%',
            description: 'Compila se non registrato',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'clientEmail',
          type: 'email',
          label: 'Email',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'clientPhone',
          type: 'text',
          label: 'Telefono',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
      label: 'Servizio',
    },
    {
      name: 'trainer',
      type: 'relationship',
      relationTo: 'team-members',
      label: 'Trainer',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'date',
          type: 'date',
          required: true,
          label: 'Data',
          admin: {
            width: '50%',
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'dd/MM/yyyy',
            },
          },
        },
        {
          name: 'time',
          type: 'text',
          required: true,
          label: 'Ora',
          admin: {
            width: '50%',
            description: 'Formato HH:MM (es. 10:00)',
          },
        },
      ],
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Durata (minuti)',
      defaultValue: 60,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      label: 'Stato',
      options: [
        { label: 'In Attesa', value: 'pending' },
        { label: 'Confermato', value: 'confirmed' },
        { label: 'Completato', value: 'completed' },
        { label: 'Cancellato', value: 'cancelled' },
        { label: 'No-Show', value: 'noshow' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Note',
      admin: {
        description: 'Note interne sulla prenotazione',
      },
    },
    {
      name: 'source',
      type: 'select',
      label: 'Origine',
      defaultValue: 'website',
      options: [
        { label: 'Sito Web', value: 'website' },
        { label: 'Telefono', value: 'phone' },
        { label: 'WhatsApp', value: 'whatsapp' },
        { label: 'Admin', value: 'admin' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'timpSyncStatus',
      type: 'select',
      label: 'Sync TIMP',
      defaultValue: 'pending',
      options: [
        { label: 'In Attesa', value: 'pending' },
        { label: 'Notificato', value: 'notified' },
        { label: 'Sincronizzato', value: 'synced' },
        { label: 'Errore', value: 'error' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Stato sincronizzazione con TIMP',
      },
    },
    {
      name: 'timpBookingId',
      type: 'text',
      label: 'TIMP Booking ID',
      admin: {
        position: 'sidebar',
        description: 'ID prenotazione su TIMP (cross-reference)',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        // Se c'e un cliente registrato, popoliamo i campi
        if (operation === 'create' && data.client) {
          // Il nome verra popolato dalla relazione
        }
        return data
      },
    ],
  },
}
