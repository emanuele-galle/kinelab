import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    group: 'Operativo',
    description: 'Messaggi dal form contatti',
    defaultColumns: ['name', 'email', 'subject', 'isRead', 'createdAt'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nome',
          admin: { width: '50%' },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Email',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefono',
    },
    {
      name: 'subject',
      type: 'select',
      label: 'Oggetto',
      options: [
        { label: 'Informazioni Generali', value: 'info' },
        { label: 'Prenotazione', value: 'booking' },
        { label: 'Prezzi', value: 'pricing' },
        { label: 'Collaborazioni', value: 'collaboration' },
        { label: 'Altro', value: 'other' },
      ],
      defaultValue: 'info',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Messaggio',
    },
    {
      name: 'isRead',
      type: 'checkbox',
      label: 'Letto',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Note Interne',
      admin: {
        description: 'Note per il team',
      },
    },
  ],
}
