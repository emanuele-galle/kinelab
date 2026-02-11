const TIMP_API_URL = process.env.TIMP_API_URL || ''
const TIMP_API_KEY = process.env.TIMP_API_KEY || ''
const isMockMode = !TIMP_API_URL || !TIMP_API_KEY

interface BookingData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  time: string
  message?: string
}

interface BookingResult {
  success: boolean
  bookingId: string
  message: string
}

export async function createBooking(data: BookingData): Promise<BookingResult> {
  if (isMockMode) {
    await new Promise((r) => setTimeout(r, 500))
    return {
      success: true,
      bookingId: `mock-${Date.now()}`,
      message: 'Prenotazione inviata con successo!',
    }
  }

  const res = await fetch(`${TIMP_API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TIMP_API_KEY}`,
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error('Booking failed')
  return res.json()
}

export async function getBookedSlots(date: string): Promise<string[]> {
  if (isMockMode) return []

  const res = await fetch(`${TIMP_API_URL}/bookings/slots?date=${date}`, {
    headers: {
      Authorization: `Bearer ${TIMP_API_KEY}`,
    },
  })

  if (!res.ok) throw new Error('Failed to get slots')
  const data = await res.json()
  return data.bookedSlots || []
}
