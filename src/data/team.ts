import type { TeamMember } from './types'

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Giulia Moretti',
    role: 'Fondatrice & Head Trainer',
    shortBio: 'Appassionata di movimento consapevole, Giulia ha fondato KineLab per creare uno spazio dove corpo e mente si incontrano. Specializzata in Pilates e rieducazione posturale.',
    photo: '/images/reformer-gruppo-3.jpg',
    certifications: [
      { certification: 'Pilates Mat & Reformer' },
      { certification: 'Rieducazione Posturale' },
      { certification: 'Personal Trainer' },
    ],
    yearsExperience: 8,
    specialty: 'Pilates Reformer',
    quote: 'Il movimento e la medicina del futuro.',
    instagram: 'https://instagram.com/kinelab',
  },
  {
    id: '2',
    name: 'Marco Benedetti',
    role: 'Functional Training Coach',
    shortBio: 'Con un background in scienze motorie e anni di esperienza nel fitness funzionale, Marco aiuta i clienti a raggiungere performance ottimali nella vita quotidiana e nello sport.',
    photo: '/images/personal-training-1.jpg',
    certifications: [
      { certification: 'Functional Training' },
      { certification: 'Kettlebell Specialist' },
      { certification: 'TRX Certified' },
    ],
    yearsExperience: 6,
    specialty: 'Functional Training',
    quote: 'Allena il movimento, non i muscoli.',
  },
  {
    id: '3',
    name: 'Elena Rossi',
    role: 'Pilates & Yoga Instructor',
    shortBio: 'Elena unisce la precisione del Pilates alla fluidita dello Yoga. Il suo approccio olistico aiuta a trovare equilibrio tra forza e flessibilita, fisico e mentale.',
    photo: '/images/reformer-gruppo-1.jpg',
    certifications: [
      { certification: 'Pilates Mat' },
      { certification: 'Hatha Yoga' },
      { certification: 'Stretching Terapeutico' },
    ],
    yearsExperience: 5,
    specialty: 'Pilates Mat & Yoga',
    quote: 'Respira, muoviti, vivi.',
  },
]
