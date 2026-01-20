'use client'

import { motion } from 'motion/react'
import { Clock } from 'lucide-react'

interface TimeSlot {
  time: string
  available: boolean
}

interface TimeSlotPickerProps {
  selectedDate: Date | null
  selectedTime: string | null
  onTimeSelect: (time: string) => void
  bookedSlots?: string[]
}

// Generate time slots based on day of week
function generateTimeSlots(date: Date | null, bookedSlots: string[] = []): TimeSlot[] {
  if (!date) return []

  const dayOfWeek = date.getDay()
  const slots: TimeSlot[] = []

  // Saturday: 9:00 - 13:00
  if (dayOfWeek === 6) {
    for (let hour = 9; hour < 13; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`
      slots.push({ time, available: !bookedSlots.includes(time) })
    }
    return slots
  }

  // Sunday: closed (shouldn't reach here)
  if (dayOfWeek === 0) return []

  // Monday - Friday: 7:00 - 21:00
  for (let hour = 7; hour < 21; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`
    slots.push({ time, available: !bookedSlots.includes(time) })
  }

  return slots
}

export function TimeSlotPicker({ selectedDate, selectedTime, onTimeSelect, bookedSlots = [] }: TimeSlotPickerProps) {
  const timeSlots = generateTimeSlots(selectedDate, bookedSlots)

  if (!selectedDate) {
    return (
      <div className="bg-white rounded-xl border border-[--color-border] p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[--color-accent]" />
          Seleziona Orario
        </h3>
        <div className="text-center py-8 text-[--color-text-muted]">
          Seleziona prima una data dal calendario
        </div>
      </div>
    )
  }

  const formatDate = (date: Date) => {
    const days = ['Domenica', 'Lunedi', 'Martedi', 'Mercoledi', 'Giovedi', 'Venerdi', 'Sabato']
    const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
                   'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`
  }

  // Morning slots (7:00 - 12:00)
  const morningSlots = timeSlots.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0])
    return hour >= 7 && hour < 12
  })

  // Afternoon slots (12:00 - 17:00)
  const afternoonSlots = timeSlots.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0])
    return hour >= 12 && hour < 17
  })

  // Evening slots (17:00 - 21:00)
  const eveningSlots = timeSlots.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0])
    return hour >= 17 && hour < 21
  })

  const renderSlotGroup = (title: string, slots: TimeSlot[]) => {
    if (slots.length === 0) return null

    return (
      <div className="mb-4 last:mb-0">
        <p className="text-sm text-[--color-text-muted] mb-2">{title}</p>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {slots.map((slot, index) => (
            <motion.button
              key={slot.time}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              onClick={() => slot.available && onTimeSelect(slot.time)}
              disabled={!slot.available}
              className={`
                py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200
                ${selectedTime === slot.time
                  ? 'bg-[--color-accent] text-white'
                  : slot.available
                    ? 'bg-[--color-surface-warm] hover:bg-[--color-surface-beige] text-[--color-text]'
                    : 'bg-[--color-border-light] text-[--color-text-light] cursor-not-allowed line-through'
                }
              `}
            >
              {slot.time}
            </motion.button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-[--color-border] p-6">
      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
        <Clock className="w-5 h-5 text-[--color-accent]" />
        Seleziona Orario
      </h3>
      <p className="text-sm text-[--color-text-muted] mb-4">
        {formatDate(selectedDate)}
      </p>

      <div className="space-y-4">
        {renderSlotGroup('Mattina', morningSlots)}
        {renderSlotGroup('Pomeriggio', afternoonSlots)}
        {renderSlotGroup('Sera', eveningSlots)}
      </div>

      {timeSlots.every(slot => !slot.available) && (
        <div className="text-center py-4 text-[--color-text-muted]">
          Nessun orario disponibile per questa data
        </div>
      )}
    </div>
  )
}
