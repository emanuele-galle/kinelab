import { getPayload } from 'payload'
import config from '@payload-config'

// Tipo per BusinessInfo
export interface BusinessInfo {
  companyName?: string
  vatNumber?: string
  fiscalCode?: string
  sdiCode?: string
  address?: string
  city?: string
  postalCode?: string
  country?: string
  phone?: string
  email?: string
  whatsapp?: string
  openingHours?: Array<{
    day: string
    open?: string
    close?: string
    isClosed?: boolean
  }>
  instagram?: string
  facebook?: string
  linkedin?: string
  googleMapsUrl?: string
  latitude?: number
  longitude?: number
}

// Tipo per Service
export interface Service {
  id: string
  name: string
  slug: string
  category: 'pilates' | 'functional' | 'personal'
  shortDescription?: string
  duration?: number
  price?: number
  originalPrice?: number
  icon?: string
  order?: number
  isActive?: boolean
  image?: {
    url?: string
    alt?: string
  }
}

// Tipo per TeamMember
export interface TeamMember {
  id: string
  name: string
  role?: string
  shortBio?: string
  photo?: {
    url?: string
    alt?: string
  }
  certifications?: Array<{ certification: string }>
  instagram?: string
  order?: number
  isActive?: boolean
}

// Fetch BusinessInfo global
export async function getBusinessInfo(): Promise<BusinessInfo> {
  try {
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({
      slug: 'business-info',
    })
    return data as BusinessInfo
  } catch (error) {
    console.error('Error fetching business info:', error)
    // Return defaults
    return {
      companyName: 'KINELAB SSD',
      address: 'Via Pascoli 15',
      city: 'Milano',
      postalCode: '20129',
      phone: '+39 340 945 3175',
      email: 'kinelabmilano@gmail.com',
      whatsapp: '+393409453175',
      vatNumber: '14460620967',
    }
  }
}

// Fetch Services attivi
export async function getServices(): Promise<Service[]> {
  try {
    const payload = await getPayload({ config })
    const data = await payload.find({
      collection: 'services',
      where: {
        isActive: { equals: true },
      },
      sort: 'order',
      limit: 100,
    })
    return data.docs as Service[]
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

// Fetch Service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const payload = await getPayload({ config })
    const data = await payload.find({
      collection: 'services',
      where: {
        slug: { equals: slug },
        isActive: { equals: true },
      },
      limit: 1,
    })
    return data.docs[0] as Service || null
  } catch (error) {
    console.error('Error fetching service:', error)
    return null
  }
}

// Fetch TeamMembers attivi
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const payload = await getPayload({ config })
    const data = await payload.find({
      collection: 'team-members',
      where: {
        isActive: { equals: true },
      },
      sort: 'order',
      limit: 100,
    })
    return data.docs as TeamMember[]
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

// Helper: formatta indirizzo completo
export function formatAddress(info: BusinessInfo): string {
  const parts = [info.address, info.postalCode, info.city].filter(Boolean)
  return parts.join(', ')
}

// Helper: formatta orari per giorno
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

// Helper: genera orari brevi (per header/footer)
export function formatOpeningHoursShort(info: BusinessInfo): string {
  if (!info.openingHours?.length) {
    return 'Lun-Ven: 7:00-21:00'
  }

  // Trova orari feriali (lun-ven)
  const weekdays = info.openingHours.filter(
    (h) => !['saturday', 'sunday'].includes(h.day) && !h.isClosed
  )

  if (weekdays.length > 0) {
    const first = weekdays[0]
    return `Lun-Ven: ${first.open || '7:00'}-${first.close || '21:00'}`
  }

  return 'Lun-Ven: 7:00-21:00'
}
