import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, date, time, message } = body

    // Validate required fields
    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: 'Tutti i campi obbligatori devono essere compilati' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email non valida' },
        { status: 400 }
      )
    }

    // Validate phone format (Italian)
    const phoneRegex = /^(\+39)?[\s]?[0-9]{9,10}$/
    const cleanPhone = phone.replace(/\s/g, '')
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Numero di telefono non valido' },
        { status: 400 }
      )
    }

    // Initialize Payload
    const payload = await getPayload({ config })

    // Parse the date
    const bookingDate = new Date(date)
    const [hours, minutes] = time.split(':').map(Number)
    bookingDate.setHours(hours, minutes, 0, 0)

    // Check if slot is already booked
    const existingBookings = await payload.find({
      collection: 'bookings',
      where: {
        and: [
          { date: { equals: bookingDate.toISOString() } },
          { status: { not_equals: 'cancelled' } },
        ],
      },
    })

    if (existingBookings.docs.length > 0) {
      return NextResponse.json(
        { error: 'Questo orario e gia prenotato. Scegli un altro orario.' },
        { status: 409 }
      )
    }

    // Check if client exists or create new
    let client = await payload.find({
      collection: 'clients',
      where: {
        email: { equals: email },
      },
    })

    let clientId: string | number

    if (client.docs.length > 0) {
      clientId = client.docs[0].id
    } else {
      // Create new client
      const newClient = await payload.create({
        collection: 'clients',
        data: {
          name,
          email,
          phone: cleanPhone,
          status: 'active',
          notes: message ? `Prima richiesta: ${message}` : '',
        },
      })
      clientId = newClient.id
    }

    // Get service ID
    const services = await payload.find({
      collection: 'services',
      where: {
        slug: { equals: service },
      },
    })

    const serviceId: string | number | null = services.docs.length > 0 ? services.docs[0].id : null

    // Create booking
    const booking = await payload.create({
      collection: 'bookings',
      data: {
        client: clientId,
        service: serviceId,
        date: bookingDate.toISOString(),
        time: time, // Salva l'orario come campo separato (formato HH:MM)
        status: 'pending',
        notes: message || '',
      },
    })

    // TODO: Trigger N8N webhook for email notification
    // await triggerN8NWebhook({ booking, client: { name, email, phone }, service })

    return NextResponse.json({
      success: true,
      message: 'Prenotazione inviata con successo!',
      bookingId: booking.id,
    })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Errore durante la prenotazione. Riprova piu tardi.' },
      { status: 500 }
    )
  }
}

// Get booked slots for a specific date
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dateStr = searchParams.get('date')

    if (!dateStr) {
      return NextResponse.json(
        { error: 'Date parameter required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })
    const date = new Date(dateStr)

    // Get start and end of the day
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const bookings = await payload.find({
      collection: 'bookings',
      where: {
        and: [
          { date: { greater_than_equal: startOfDay.toISOString() } },
          { date: { less_than_equal: endOfDay.toISOString() } },
          { status: { not_equals: 'cancelled' } },
        ],
      },
    })

    // Extract booked times
    const bookedSlots = bookings.docs.map(booking => {
      const bookingDate = new Date(booking.date as string)
      return `${bookingDate.getHours().toString().padStart(2, '0')}:00`
    })

    return NextResponse.json({ bookedSlots })
  } catch (error) {
    console.error('Get bookings error:', error)
    return NextResponse.json(
      { error: 'Errore nel recupero delle prenotazioni' },
      { status: 500 }
    )
  }
}
