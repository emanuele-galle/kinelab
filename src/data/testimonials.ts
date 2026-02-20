import type { Testimonial } from './types'

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Giulia M.',
    role: 'Cliente da 2 anni',
    quote: 'KinèLab ha completamente trasformato il mio approccio al benessere. Le sessioni di Pilates mi hanno aiutato a ritrovare equilibrio e serenità nella vita di tutti i giorni.',
    initials: 'GM',
    rating: 5,
    service: 'Pilates',
  },
  {
    id: 2,
    name: 'Marco R.',
    role: 'Cliente da 1 anno',
    quote: 'Dopo anni di mal di schiena, il Functional Training con il team KinèLab mi ha dato una nuova vita. Professionalità e attenzione alla persona sono uniche.',
    initials: 'MR',
    rating: 5,
    service: 'Functional Training',
  },
  {
    id: 3,
    name: 'Sara L.',
    role: 'Cliente da 6 mesi',
    quote: 'L\'ambiente è accogliente e rilassante. Ogni sessione è un momento di cura per me stessa. Non potrei chiedere di meglio per il mio percorso di benessere.',
    initials: 'SL',
    rating: 5,
    service: 'Personal Training',
  },
]
