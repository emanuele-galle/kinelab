import BookingFlow from './BookingFlow'
import type { ServiceData } from './BookingFlow'
import { services } from '@/data'

export default function PrenotaPage() {
  const serviceData: ServiceData[] = services.map(s => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    shortDescription: s.shortDescription,
    duration: s.duration || 60,
    price: s.price,
    category: s.category,
  }))

  return <BookingFlow services={serviceData} />
}
