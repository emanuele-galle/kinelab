'use client'

import { Star } from 'lucide-react'

interface RatingDisplayProps {
  rating: number
  reviews: number
  bookings?: number
  className?: string
  showBookings?: boolean
}

export function RatingDisplay({
  rating,
  reviews,
  bookings,
  className = '',
  showBookings = true,
}: RatingDisplayProps) {
  // Generate star array (5 stars)
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <div className={`flex items-center flex-wrap gap-2 md:gap-3 ${className}`}>
      {/* Star Rating */}
      <div className="flex items-center gap-1">
        {stars.map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating)
                ? 'fill-[#FFD700] text-[#FFD700]'
                : star - 0.5 <= rating
                  ? 'fill-[#FFD700]/50 text-[#FFD700]'
                  : 'fill-transparent text-white/30'
            }`}
          />
        ))}
      </div>

      {/* Rating Number & Reviews */}
      <div className="flex items-center gap-2 text-sm text-white/90">
        <span className="font-semibold">{rating.toFixed(1)}</span>
        <span className="text-white/60">({reviews} recensioni)</span>
      </div>

      {/* Booking Count (if provided) */}
      {showBookings && bookings && (
        <div className="hidden md:block ml-2 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-xs text-white/90">
          {bookings} prenotazioni questa settimana
        </div>
      )}
    </div>
  )
}
