export interface BusinessInfo {
  companyName: string
  vatNumber: string
  fiscalCode: string
  sdiCode: string
  address: string
  city: string
  postalCode: string
  country: string
  phone: string
  email: string
  whatsapp: string
  openingHours: Array<{
    day: string
    open?: string
    close?: string
    isClosed?: boolean
  }>
  instagram?: string
  facebook?: string
  linkedin?: string
  googleMapsUrl?: string
  latitude: number
  longitude: number
}

interface PricingPackage {
  sessions: number
  totalPrice: number
  validity: string
  badge?: string
}

export interface PricingMode {
  name: string
  description?: string
  singlePrice: number
  packages: PricingPackage[]
}

export interface Service {
  id: string
  name: string
  slug: string
  category: 'pilates' | 'functional' | 'personal'
  shortDescription?: string
  duration?: number
  price?: number
  originalPrice?: number
  pricingModes?: PricingMode[]
  icon?: string
  order?: number
  isActive?: boolean
  image: string
}

export interface TeamMember {
  id: string
  name: string
  role?: string
  shortBio?: string
  photo: string
  certifications?: Array<{ certification: string }>
  yearsExperience?: number
  specialty?: string
  quote?: string
  instagram?: string
  order?: number
  isActive?: boolean
}

export interface ServiceDetails {
  fullDescription: string
  benefits: string[]
  targetAudience: string
  methodology: string[]
  faq: { question: string; answer: string }[]
}
