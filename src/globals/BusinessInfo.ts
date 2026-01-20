import type { GlobalConfig } from 'payload'

export const BusinessInfo: GlobalConfig = {
  slug: 'business-info',
  label: 'Informazioni Azienda',
  admin: {
    group: 'Configurazione',
    description: 'Dati aziendali, contatti e orari',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Dati Azienda',
          fields: [
            {
              name: 'companyName',
              type: 'text',
              label: 'Ragione Sociale',
              defaultValue: 'KINELAB SSD',
            },
            {
              name: 'vatNumber',
              type: 'text',
              label: 'Partita IVA',
              defaultValue: '14460620967',
            },
            {
              name: 'fiscalCode',
              type: 'text',
              label: 'Codice Fiscale',
              defaultValue: '14460620967',
            },
            {
              name: 'sdiCode',
              type: 'text',
              label: 'Codice SDI',
              defaultValue: 'M5UXCR1',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'address',
                  type: 'text',
                  label: 'Indirizzo',
                  defaultValue: 'Via Pascoli 15',
                  admin: { width: '50%' },
                },
                {
                  name: 'city',
                  type: 'text',
                  label: 'Citta',
                  defaultValue: 'Milano',
                  admin: { width: '25%' },
                },
                {
                  name: 'postalCode',
                  type: 'text',
                  label: 'CAP',
                  defaultValue: '20129',
                  admin: { width: '25%' },
                },
              ],
            },
            {
              name: 'country',
              type: 'text',
              label: 'Paese',
              defaultValue: 'Italia',
            },
          ],
        },
        {
          label: 'Contatti',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Telefono',
              defaultValue: '+39 340 945 3175',
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email',
              defaultValue: 'kinelabmilano@gmail.com',
            },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'WhatsApp',
              admin: {
                description: 'Numero WhatsApp (con prefisso internazionale)',
              },
              defaultValue: '+393409453175',
            },
          ],
        },
        {
          label: 'Orari',
          fields: [
            {
              name: 'openingHours',
              type: 'array',
              label: 'Orari di Apertura',
              fields: [
                {
                  name: 'day',
                  type: 'select',
                  label: 'Giorno',
                  options: [
                    { label: 'Lunedi', value: 'monday' },
                    { label: 'Martedi', value: 'tuesday' },
                    { label: 'Mercoledi', value: 'wednesday' },
                    { label: 'Giovedi', value: 'thursday' },
                    { label: 'Venerdi', value: 'friday' },
                    { label: 'Sabato', value: 'saturday' },
                    { label: 'Domenica', value: 'sunday' },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'open',
                      type: 'text',
                      label: 'Apertura',
                      admin: { width: '33%', description: 'Es. 07:00' },
                    },
                    {
                      name: 'close',
                      type: 'text',
                      label: 'Chiusura',
                      admin: { width: '33%', description: 'Es. 21:00' },
                    },
                    {
                      name: 'isClosed',
                      type: 'checkbox',
                      label: 'Chiuso',
                      admin: { width: '33%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram',
              admin: {
                description: 'URL completo del profilo Instagram',
              },
            },
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook',
              admin: {
                description: 'URL completo della pagina Facebook',
              },
            },
            {
              name: 'linkedin',
              type: 'text',
              label: 'LinkedIn',
            },
          ],
        },
        {
          label: 'Mappa',
          fields: [
            {
              name: 'googleMapsUrl',
              type: 'text',
              label: 'URL Google Maps',
              admin: {
                description: 'Link condividi di Google Maps',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'latitude',
                  type: 'number',
                  label: 'Latitudine',
                  admin: { width: '50%', step: 0.000001 },
                },
                {
                  name: 'longitude',
                  type: 'number',
                  label: 'Longitudine',
                  admin: { width: '50%', step: 0.000001 },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
