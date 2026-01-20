'use client'

import { motion } from 'motion/react'
import { Dumbbell, Heart, User } from 'lucide-react'

interface Service {
  id: string
  name: string
  description: string
  duration: string
  icon: React.ReactNode
}

const SERVICES: Service[] = [
  {
    id: 'pilates',
    name: 'Pilates',
    description: 'Migliora postura, flessibilita e forza del core',
    duration: '60 min',
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: 'functional',
    name: 'Functional Training',
    description: 'Allenamento funzionale per la vita quotidiana',
    duration: '60 min',
    icon: <Dumbbell className="w-6 h-6" />,
  },
  {
    id: 'personal',
    name: 'Personal Training',
    description: 'Sessioni individuali personalizzate',
    duration: '60 min',
    icon: <User className="w-6 h-6" />,
  },
]

interface ServiceSelectorProps {
  selectedService: string | null
  onServiceSelect: (serviceId: string) => void
}

export function ServiceSelector({ selectedService, onServiceSelect }: ServiceSelectorProps) {
  return (
    <div className="space-y-3">
      {SERVICES.map((service, index) => (
        <motion.button
          key={service.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          onClick={() => onServiceSelect(service.id)}
          className={`
            w-full p-4 rounded-xl border-2 text-left transition-all duration-200
            flex items-start gap-4
            ${selectedService === service.id
              ? 'border-[--color-accent] bg-[--color-accent]/5'
              : 'border-[--color-border] hover:border-[--color-accent]/50 hover:bg-[--color-surface-warm]'
            }
          `}
        >
          <div
            className={`
              w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
              ${selectedService === service.id
                ? 'bg-[--color-accent] text-white'
                : 'bg-[--color-surface-warm] text-[--color-accent]'
              }
            `}
          >
            {service.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-[--color-primary]">{service.name}</h4>
              <span className="text-sm text-[--color-text-muted]">{service.duration}</span>
            </div>
            <p className="text-sm text-[--color-text-muted] mt-1">
              {service.description}
            </p>
          </div>
          <div
            className={`
              w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1
              flex items-center justify-center
              ${selectedService === service.id
                ? 'border-[--color-accent] bg-[--color-accent]'
                : 'border-[--color-border]'
              }
            `}
          >
            {selectedService === service.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-2 h-2 rounded-full bg-white"
              />
            )}
          </div>
        </motion.button>
      ))}
    </div>
  )
}
