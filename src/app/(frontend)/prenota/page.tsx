'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  Euro,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Image from 'next/image'
import { useFormValidation } from '@/hooks/useFormValidation'

type Step = 'booking' | 'details' | 'confirm'

interface Service {
  id: string
  name: string
  description: string
  duration: string
  price: number
  priceNote?: string
}

const SERVICES: Service[] = [
  {
    id: 'pilates',
    name: 'Pilates',
    description: 'Migliora postura, flessibilità e forza del core',
    duration: '60 min',
    price: 50,
  },
  {
    id: 'functional',
    name: 'Functional Training',
    description: 'Allenamento funzionale per la vita quotidiana',
    duration: '60 min',
    price: 45,
  },
  {
    id: 'personal',
    name: 'Personal Training',
    description: 'Sessioni individuali personalizzate',
    duration: '60 min',
    price: 65,
    priceNote: 'Prima lezione prova €40',
  },
]

interface BookingData {
  service: string | null
  date: Date | null
  time: string | null
  name: string
  email: string
  phone: string
  message: string
}

const DAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
const MONTHS = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
]

export default function PrenotaPage() {
  const [currentStep, setCurrentStep] = useState<Step>('booking')
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    date: null,
    time: null,
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Form validation
  const validationRules = {
    name: { required: true, minLength: 2, maxLength: 50 },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    phone: { required: true, pattern: /^(\+39)?[ ]?3\d{2}[ ]?\d{6,7}$/ }
  }

  const { errors, touched, handleChange: validateField, handleBlur, validateAll } = useFormValidation(validationRules)

  // Fetch booked slots when date changes
  const fetchBookedSlots = useCallback(async (date: Date) => {
    try {
      const response = await fetch(`/api/bookings?date=${date.toISOString()}`)
      const data = await response.json()
      setBookedSlots(data.bookedSlots || [])
    } catch {
      console.error('Failed to fetch booked slots')
      setBookedSlots([])
    }
  }, [])

  useEffect(() => {
    if (bookingData.date) {
      fetchBookedSlots(bookingData.date)
    }
  }, [bookingData.date, fetchBookedSlots])

  const handleDateSelect = (date: Date) => {
    setBookingData(prev => ({ ...prev, date, time: null }))
  }

  const handleTimeSelect = (time: string) => {
    setBookingData(prev => ({ ...prev, time }))
  }

  const handleServiceSelect = (serviceId: string) => {
    setBookingData(prev => ({ ...prev, service: serviceId }))
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
    validateField(name, value)
    setError(null)
  }

  const selectedService = SERVICES.find(s => s.id === bookingData.service)

  const goToNextStep = () => {
    const steps: Step[] = ['booking', 'details', 'confirm']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  const goToPrevStep = () => {
    const steps: Step[] = ['booking', 'details', 'confirm']
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 'booking':
        return !!bookingData.service && !!bookingData.date && !!bookingData.time
      case 'details':
        return (
          bookingData.name.trim() !== '' &&
          bookingData.email.trim() !== '' &&
          bookingData.phone.trim() !== ''
        )
      default:
        return true
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: bookingData.service,
          date: bookingData.date?.toISOString(),
          time: bookingData.time,
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          message: bookingData.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Errore durante la prenotazione')
      }

      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante la prenotazione')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (date: Date) => {
    const days = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
    const months = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
      'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre',
    ]
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`
  }

  const formatDateShort = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}`
  }

  // Calendar helpers
  const calendarDays = (() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    let startDay = firstDay.getDay() - 1
    if (startDay < 0) startDay = 6
    const days: (Date | null)[] = []
    for (let i = 0; i < startDay; i++) days.push(null)
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day))
    }
    return days
  })()

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) return true
    if (date.getDay() === 0) return true
    return false
  }

  const isDateSelected = (date: Date) => {
    if (!bookingData.date) return false
    return (
      date.getDate() === bookingData.date.getDate() &&
      date.getMonth() === bookingData.date.getMonth() &&
      date.getFullYear() === bookingData.date.getFullYear()
    )
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const canGoPrevious = () => {
    const today = new Date()
    return currentMonth.getMonth() > today.getMonth() ||
           currentMonth.getFullYear() > today.getFullYear()
  }

  // Time slots
  const generateTimeSlots = () => {
    if (!bookingData.date) return []
    const dayOfWeek = bookingData.date.getDay()
    const slots: { time: string; available: boolean }[] = []

    if (dayOfWeek === 6) {
      for (let hour = 9; hour < 13; hour++) {
        const time = `${hour.toString().padStart(2, '0')}:00`
        slots.push({ time, available: !bookedSlots.includes(time) })
      }
      return slots
    }
    if (dayOfWeek === 0) return []

    for (let hour = 7; hour < 21; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`
      slots.push({ time, available: !bookedSlots.includes(time) })
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  // WhatsApp link
  const getWhatsAppLink = (isConfirmation = false) => {
    const phone = '393409453175'
    let message: string

    if (isConfirmation && bookingData.name) {
      // Messaggio post-prenotazione con tutti i dettagli
      message = `Ciao! Sono ${bookingData.name}.\n\nHo appena prenotato online:\n`
      message += `- Servizio: ${selectedService?.name}\n`
      message += `- Data: ${bookingData.date ? formatDate(bookingData.date) : ''}\n`
      message += `- Orario: ${bookingData.time}\n`
      message += `\nAttendo conferma, grazie!`
    } else {
      // Messaggio durante la prenotazione
      message = 'Ciao! Vorrei prenotare una lezione'
      if (selectedService) message += ` di ${selectedService.name}`
      if (bookingData.date) message += ` per il ${formatDate(bookingData.date)}`
      if (bookingData.time) message += ` alle ${bookingData.time}`
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  }

  // Success screen
  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[--color-background]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl mb-4">Prenotazione Inviata!</h1>
            <p className="text-[--color-text-muted] mb-8">
              Grazie <strong>{bookingData.name}</strong>! Ti contatteremo presto per confermare la tua
              prenotazione di <strong>{selectedService?.name}</strong> per il{' '}
              <strong>{formatDate(bookingData.date!)}</strong> alle{' '}
              <strong>{bookingData.time}</strong>.
            </p>
            <div className="space-y-3">
              <a href="/" className="btn btn-primary w-full justify-center">
                Torna alla Home
              </a>
              <a
                href={getWhatsAppLink(true)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full justify-center"
              >
                <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={20} height={20} className="mr-2" />
                Condividi su WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  const stepNumber = currentStep === 'booking' ? 1 : currentStep === 'details' ? 2 : 3
  const totalSteps = 3

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[--color-background]">
      <div className="container max-w-5xl">
        {/* Header with Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl mb-1">Prenota la tua lezione</h1>
              <p className="text-[--color-text-muted] text-sm">
                Step {stepNumber} di {totalSteps}
              </p>
            </div>
            {/* Price Badge - always visible */}
            {selectedService && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-right"
              >
                <p className="text-2xl font-semibold text-[--color-accent]">
                  €{selectedService.price}
                </p>
                <p className="text-xs text-[--color-text-muted]">{selectedService.duration}</p>
              </motion.div>
            )}
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-[--color-border-light] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[--color-accent]"
              initial={{ width: '33%' }}
              animate={{ width: `${(stepNumber / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 'booking' && (
                <motion.div
                  key="booking"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Service Selection */}
                  <div className="bg-white rounded-2xl border border-[--color-border] p-5">
                    <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[--color-accent] text-white text-xs flex items-center justify-center">1</div>
                      Scegli il servizio
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {SERVICES.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => handleServiceSelect(service.id)}
                          className={`
                            p-4 rounded-xl border-2 text-left transition-all duration-200
                            ${bookingData.service === service.id
                              ? 'border-[--color-accent] bg-[--color-accent]/5'
                              : 'border-[--color-border] hover:border-[--color-accent]/50'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{service.name}</span>
                            <span className="text-[--color-accent] font-semibold">€{service.price}</span>
                          </div>
                          <p className="text-xs text-[--color-text-muted]">{service.duration}</p>
                          {service.priceNote && (
                            <p className="text-xs text-green-600 mt-1">{service.priceNote}</p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calendar */}
                  <div className="bg-white rounded-2xl border border-[--color-border] p-5">
                    <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[--color-accent] text-white text-xs flex items-center justify-center">2</div>
                      Scegli data e ora
                    </h2>

                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                        disabled={!canGoPrevious()}
                        className="p-2 rounded-full hover:bg-[--color-surface-warm] transition-colors disabled:opacity-30"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="font-medium">
                        {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </span>
                      <button
                        onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                        className="p-2 rounded-full hover:bg-[--color-surface-warm] transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {DAYS.map(day => (
                        <div key={day} className="text-center text-xs font-medium text-[--color-text-muted] py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((date, index) => (
                        <div key={date ? date.toISOString() : `empty-${index}`}>
                          {date ? (
                            <button
                              onClick={() => !isDateDisabled(date) && handleDateSelect(date)}
                              disabled={isDateDisabled(date)}
                              className={`
                                w-full aspect-square flex items-center justify-center rounded-lg text-sm font-medium
                                transition-all duration-200
                                ${isDateSelected(date)
                                  ? 'bg-[--color-accent] text-white'
                                  : isToday(date)
                                    ? 'bg-[--color-accent]/10 text-[--color-accent] font-semibold'
                                    : isDateDisabled(date)
                                      ? 'text-[--color-text-light]/50 cursor-not-allowed'
                                      : 'hover:bg-[--color-surface-warm] text-[--color-text]'
                                }
                              `}
                            >
                              {date.getDate()}
                            </button>
                          ) : (
                            <div className="w-full aspect-square" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Time Slots */}
                    {bookingData.date && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 pt-6 border-t border-[--color-border-light]"
                      >
                        <p className="text-sm text-[--color-text-muted] mb-3">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Orari disponibili per {formatDate(bookingData.date)}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot.time}
                              onClick={() => slot.available && handleTimeSelect(slot.time)}
                              disabled={!slot.available}
                              className={`
                                py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200
                                ${bookingData.time === slot.time
                                  ? 'bg-[--color-accent] text-white'
                                  : slot.available
                                    ? 'bg-[--color-surface-warm] hover:bg-[--color-accent]/10 text-[--color-text]'
                                    : 'bg-[--color-border-light] text-[--color-text-light]/50 cursor-not-allowed line-through'
                                }
                              `}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                        {timeSlots.length === 0 && (
                          <p className="text-[--color-text-muted] text-sm">Nessun orario disponibile</p>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-[--color-border] p-5"
                >
                  <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-[--color-accent]" />
                    I tuoi dati
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium mb-1 block">Nome e Cognome *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[--color-text-light]" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={bookingData.name}
                          onChange={handleInputChange}
                          onBlur={(e) => handleBlur('name', e.target.value)}
                          className={`pl-11 w-full ${touched.name && errors.name ? 'border-red-500' : ''}`}
                          placeholder="Il tuo nome"
                        />
                      </div>
                      {touched.name && errors.name && (
                        <p className="text-red-600 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="text-sm font-medium mb-1 block">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[--color-text-light]" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={bookingData.email}
                          onChange={handleInputChange}
                          onBlur={(e) => handleBlur('email', e.target.value)}
                          className={`pl-11 w-full ${touched.email && errors.email ? 'border-red-500' : ''}`}
                          placeholder="La tua email"
                        />
                      </div>
                      {touched.email && errors.email && (
                        <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="text-sm font-medium mb-1 block">Telefono *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[--color-text-light]" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          value={bookingData.phone}
                          onChange={handleInputChange}
                          onBlur={(e) => handleBlur('phone', e.target.value)}
                          className={`pl-11 w-full ${touched.phone && errors.phone ? 'border-red-500' : ''}`}
                          placeholder="Il tuo numero"
                        />
                      </div>
                      {touched.phone && errors.phone && (
                        <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="text-sm font-medium mb-1 block">Note (opzionale)</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-[--color-text-light]" />
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          value={bookingData.message}
                          onChange={handleInputChange}
                          className="pl-11 w-full"
                          placeholder="Obiettivi, esigenze particolari..."
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 'confirm' && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl border border-[--color-border] p-5"
                >
                  <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
                    <Check className="w-5 h-5 text-[--color-accent]" />
                    Riepilogo prenotazione
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-3 border-b border-[--color-border-light]">
                      <span className="text-[--color-text-muted]">Servizio</span>
                      <span className="font-medium">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-[--color-border-light]">
                      <span className="text-[--color-text-muted]">Data</span>
                      <span className="font-medium">{formatDate(bookingData.date!)}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-[--color-border-light]">
                      <span className="text-[--color-text-muted]">Orario</span>
                      <span className="font-medium">{bookingData.time}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-[--color-border-light]">
                      <span className="text-[--color-text-muted]">Nome</span>
                      <span className="font-medium">{bookingData.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-[--color-border-light]">
                      <span className="text-[--color-text-muted]">Email</span>
                      <span className="font-medium">{bookingData.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-[--color-border-light]">
                      <span className="text-[--color-text-muted]">Telefono</span>
                      <span className="font-medium">{bookingData.phone}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-[--color-accent]/10 rounded-lg px-4">
                      <span className="font-medium">Totale</span>
                      <span className="text-xl font-semibold text-[--color-accent]">€{selectedService?.price}</span>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  <p className="text-sm text-[--color-text-muted]">
                    Cliccando su &quot;Conferma&quot; invierai la richiesta. Ti contatteremo per confermare.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              {currentStep !== 'booking' ? (
                <button onClick={goToPrevStep} className="btn btn-secondary">
                  <ArrowLeft className="w-5 h-5" />
                  Indietro
                </button>
              ) : (
                <div />
              )}

              {currentStep !== 'confirm' ? (
                <button
                  onClick={goToNextStep}
                  disabled={!canProceed()}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continua
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`btn btn-accent ${isSubmitting ? 'btn-loading' : ''}`}
                >
                  {isSubmitting ? '' : (
                    <>
                      Conferma Prenotazione
                      <Check className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-4">
              {/* Booking Summary Card */}
              <div className="bg-white rounded-2xl border border-[--color-border] p-5">
                <h3 className="font-medium mb-4">Riepilogo</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[--color-text-muted]">Servizio</span>
                    <span className="font-medium">{selectedService?.name || '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[--color-text-muted]">Data</span>
                    <span className="font-medium">
                      {bookingData.date ? formatDateShort(bookingData.date) : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[--color-text-muted]">Ora</span>
                    <span className="font-medium">{bookingData.time || '—'}</span>
                  </div>
                  <div className="border-t border-[--color-border-light] pt-3 flex justify-between">
                    <span className="font-medium">Totale</span>
                    <span className="text-lg font-semibold text-[--color-accent]">
                      {selectedService ? `€${selectedService.price}` : '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Alternative */}
              <div className="bg-green-50 rounded-2xl border border-green-200 p-5">
                <p className="text-sm text-green-800 mb-3">
                  Hai bisogno di informazioni?
                </p>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-green-600 hover:bg-green-700 text-white w-full justify-center text-sm"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contattaci su WhatsApp
                </a>
              </div>

              {/* Contact Info */}
              <div className="text-center text-sm text-[--color-text-muted]">
                <p>Hai domande?</p>
                <a
                  href="tel:+393409453175"
                  className="text-[--color-accent] font-medium hover:underline"
                >
                  +39 340 945 3175
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
