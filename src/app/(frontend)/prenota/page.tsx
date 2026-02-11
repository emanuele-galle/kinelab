import { getPayload } from 'payload'
import config from '@payload-config'
import BookingFlow from './BookingFlow'
import type { ServiceData } from './BookingFlow'

export const dynamic = 'force-dynamic'

async function getServices(): Promise<ServiceData[]> {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'services',
    where: {
      isActive: { equals: true },
    },
    sort: 'order',
    limit: 50,
  })

  return result.docs.map((doc) => ({
    id: String(doc.id),
    name: doc.name,
    slug: doc.slug,
    shortDescription: doc.shortDescription || undefined,
    duration: doc.duration || 60,
    price: doc.price || undefined,
    category: doc.category,
  }))
}

export default async function PrenotaPage() {
  const services = await getServices()

  return <BookingFlow services={services} />
}
