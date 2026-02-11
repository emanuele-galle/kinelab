import { businessInfo } from '@/data'
import { BookingPage } from './BookingPage'

export default function PrenotaPage() {
  const bookingUrl = process.env.TIMP_BOOKING_URL || ''

  return (
    <BookingPage
      bookingUrl={bookingUrl}
      phone={businessInfo.phone}
      whatsapp={businessInfo.whatsapp}
    />
  )
}
