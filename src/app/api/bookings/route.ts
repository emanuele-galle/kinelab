import { NextRequest, NextResponse } from 'next/server'
import { createBooking, getBookedSlots } from '@/lib/timp'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, date, time, message } = body

    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: 'Tutti i campi obbligatori devono essere compilati' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email non valida' },
        { status: 400 }
      )
    }

    const phoneRegex = /^(\+39)?[\s]?[0-9]{9,10}$/
    const cleanPhone = phone.replace(/\s/g, '')
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Numero di telefono non valido' },
        { status: 400 }
      )
    }

    const result = await createBooking({
      name,
      email,
      phone: cleanPhone,
      service,
      date,
      time,
      message,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Errore durante la prenotazione. Riprova piu tardi.' },
      { status: 500 }
    )
  }
}

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

    const bookedSlots = await getBookedSlots(dateStr)
    return NextResponse.json({ bookedSlots })
  } catch (error) {
    console.error('Get bookings error:', error)
    return NextResponse.json(
      { error: 'Errore nel recupero delle prenotazioni' },
      { status: 500 }
    )
  }
}
