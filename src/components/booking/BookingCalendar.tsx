'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BookingCalendarProps {
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
  disabledDates?: Date[]
}

const DAYS = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
const MONTHS = [
  'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
  'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
]

export function BookingCalendar({ selectedDate, onDateSelect, disabledDates = [] }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // First day of the month
    const firstDay = new Date(year, month, 1)
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0)

    // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
    // Convert to Monday-based (0 = Monday)
    let startDay = firstDay.getDay() - 1
    if (startDay < 0) startDay = 6

    const days: (Date | null)[] = []

    // Add empty slots for days before the first day
    for (let i = 0; i < startDay; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }, [currentMonth])

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Disable past dates
    if (date < today) return true

    // Disable Sundays (day 0)
    if (date.getDay() === 0) return true

    // Check custom disabled dates
    return disabledDates.some(d =>
      d.getDate() === date.getDate() &&
      d.getMonth() === date.getMonth() &&
      d.getFullYear() === date.getFullYear()
    )
  }

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
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

  // Prevent going to past months
  const canGoPrevious = () => {
    const today = new Date()
    return currentMonth.getMonth() > today.getMonth() ||
           currentMonth.getFullYear() > today.getFullYear()
  }

  return (
    <div className="bg-white rounded-xl border border-[--color-border] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          disabled={!canGoPrevious()}
          className="p-2 rounded-full hover:bg-[--color-surface-warm] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-medium">
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-full hover:bg-[--color-surface-warm] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map(day => (
          <div key={day} className="text-center text-sm font-medium text-[--color-text-muted] py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        <AnimatePresence mode="wait">
          {calendarDays.map((date, index) => (
            <motion.div
              key={date ? date.toISOString() : `empty-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15, delay: index * 0.01 }}
            >
              {date ? (
                <button
                  onClick={() => !isDateDisabled(date) && onDateSelect(date)}
                  disabled={isDateDisabled(date)}
                  className={`
                    w-full aspect-square flex items-center justify-center rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${isDateSelected(date)
                      ? 'bg-[--color-accent] text-white'
                      : isToday(date)
                        ? 'bg-[--color-surface-beige] text-[--color-primary]'
                        : isDateDisabled(date)
                          ? 'text-[--color-text-light] cursor-not-allowed'
                          : 'hover:bg-[--color-surface-warm] text-[--color-text]'
                    }
                  `}
                >
                  {date.getDate()}
                </button>
              ) : (
                <div className="w-full aspect-square" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-[--color-border-light] flex flex-wrap gap-4 text-xs text-[--color-text-muted]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[--color-accent]" />
          <span>Selezionato</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[--color-surface-beige]" />
          <span>Oggi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[--color-border-light]" />
          <span>Non disponibile</span>
        </div>
      </div>
    </div>
  )
}
