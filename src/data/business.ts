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

export function formatAddress(info: BusinessInfo): string {
  const parts = [info.address, info.postalCode, info.city].filter(Boolean)
  return parts.join(', ')
}

export function formatOpeningHours(info: BusinessInfo): string {
  if (!info.openingHours?.length) {
    return 'Lun-Ven: 7:00-21:00\nSabato: 9:00-13:00'
  }

  const dayNames: Record<string, string> = {
    monday: 'Lunedì',
    tuesday: 'Martedì',
    wednesday: 'Mercoledì',
    thursday: 'Giovedì',
    friday: 'Venerdì',
    saturday: 'Sabato',
    sunday: 'Domenica',
  }

  return info.openingHours
    .map((h) => {
      const dayName = dayNames[h.day] || h.day
      if (h.isClosed) return `${dayName}: Chiuso`
      return `${dayName}: ${h.open || '?'}-${h.close || '?'}`
    })
    .join('\n')
}

export function formatOpeningHoursShort(info: BusinessInfo): string {
  if (!info.openingHours?.length) {
    return 'Lun-Ven: 7:00-21:00'
  }

  const weekdays = info.openingHours.filter(
    (h) => !['saturday', 'sunday'].includes(h.day) && !h.isClosed
  )

  if (weekdays.length > 0) {
    const first = weekdays[0]
    return `Lun-Ven: ${first.open || '7:00'}-${first.close || '21:00'}`
  }

  return 'Lun-Ven: 7:00-21:00'
}
