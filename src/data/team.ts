import type { TeamMember } from './types'

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Pasquale Casalnuovo',
    role: 'Ideatore & Preparatore Atletico',
    shortBio: 'Laureato in Scienze Motorie e specializzato in preparazione atletica, Pasquale è anche massoterapista certificato. Ideatore del progetto KinèLab, si occupa di allenamento, performance e preparazione fisica per sport specifici. Determinato e orientato agli obiettivi, accompagna le persone nel raggiungimento di risultati concreti e duraturi.',
    photo: '/images/pasquale.jpg',
    certifications: [
      { certification: 'Scienze Motorie' },
      { certification: 'Preparatore Atletico' },
      { certification: 'Massoterapista' },
    ],
    specialty: 'Preparazione Atletica',
    quote: 'Determinazione, movimento, risultati.',
  },
  {
    id: '2',
    name: 'Simona',
    role: 'Pilates & Barre Specialist',
    shortBio: 'Personal Trainer formata presso Fitnessway, con esperienza nell\'insegnamento motorio nelle scuole primarie. Certificata Pilates Matwork, Reformer e Cadillac, specializzata in benessere femminile, gravidanza e post parto. Esperta di allenamento Barre e runner appassionata, supporta gli atleti nella consapevolezza del movimento per prevenire infortuni e ottimizzare la performance.',
    photo: '/images/simona.jpg',
    certifications: [
      { certification: 'Pilates Matwork, Reformer & Cadillac' },
      { certification: 'Specializzazione Gravidanza e Post Parto' },
      { certification: 'Barre Instructor' },
    ],
    specialty: 'Pilates & Benessere Femminile',
    quote: 'Movimento consapevole, benessere completo.',
  },
  {
    id: '3',
    name: 'Cristian',
    role: '',
    shortBio: '',
    photo: '/images/cristian.jpg',
    certifications: [],
    specialty: '',
  },
  {
    id: '4',
    name: 'Cono',
    role: '',
    shortBio: '',
    photo: '/images/cono.jpg',
    certifications: [],
    specialty: '',
  },
  {
    id: '5',
    name: 'Roberta',
    role: '',
    shortBio: '',
    photo: '/images/roberta.jpg',
    certifications: [],
    specialty: '',
  },
]
