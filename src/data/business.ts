import type { BusinessInfo } from './types'

export const businessInfo: BusinessInfo = {
  companyName: 'KINELAB SSD',
  vatNumber: '14460620967',
  fiscalCode: '',
  sdiCode: '',
  address: 'Via Pascoli 15',
  city: 'Milano',
  postalCode: '20129',
  country: 'IT',
  phone: '+39 02 8233 7048',
  email: 'kinelabmilano@gmail.com',
  whatsapp: '+393409453175',
  openingHours: [
    { day: 'monday', open: '7:00', close: '21:00' },
    { day: 'tuesday', open: '7:00', close: '21:00' },
    { day: 'wednesday', open: '7:00', close: '21:00' },
    { day: 'thursday', open: '7:00', close: '21:00' },
    { day: 'friday', open: '7:00', close: '21:00' },
    { day: 'saturday', open: '9:00', close: '13:00' },
    { day: 'sunday', isClosed: true },
  ],
  latitude: 45.4747459,
  longitude: 9.2196959,
}

