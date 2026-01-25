'use client'

import { motion, AnimatePresence } from 'motion/react'
import { X, CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react'
import { Toast as ToastType, ToastPosition } from '@/hooks/useToast'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ToastProps {
  toasts: ToastType[]
  onRemove: (id: string) => void
  position?: ToastPosition
}

const positionClasses: Record<ToastPosition, string> = {
  'top-right': 'top-4 right-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    bgClass: 'bg-green-50 border-green-200',
    textClass: 'text-green-800',
    iconClass: 'text-green-600'
  },
  error: {
    icon: XCircle,
    bgClass: 'bg-red-50 border-red-200',
    textClass: 'text-red-800',
    iconClass: 'text-red-600'
  },
  warning: {
    icon: AlertTriangle,
    bgClass: 'bg-yellow-50 border-yellow-200',
    textClass: 'text-yellow-800',
    iconClass: 'text-yellow-600'
  },
  info: {
    icon: Info,
    bgClass: 'bg-blue-50 border-blue-200',
    textClass: 'text-blue-800',
    iconClass: 'text-blue-600'
  }
}

export function ToastContainer({ toasts, onRemove, position = 'top-right' }: ToastProps) {
  const prefersReducedMotion = useReducedMotion()

  const variants = {
    initial: { opacity: 0, y: position.includes('top') ? -20 : 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-[100] max-w-sm w-full space-y-2`}>
      <AnimatePresence>
        {toasts.map((toast) => {
          const config = typeConfig[toast.type]
          const Icon = config.icon

          return (
            <motion.div
              key={toast.id}
              {...(prefersReducedMotion ? {} : {
                variants,
                initial: "initial" as const,
                animate: "animate" as const,
                exit: "exit" as const
              })}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className={`
                flex items-start gap-3 p-4 rounded-xl border shadow-lg
                ${config.bgClass}
              `}
            >
              <Icon className={`w-5 h-5 ${config.iconClass} flex-shrink-0 mt-0.5`} />
              <p className={`flex-1 text-sm font-medium ${config.textClass}`}>
                {toast.message}
              </p>
              <button
                onClick={() => onRemove(toast.id)}
                className={`p-1 rounded hover:bg-black/5 transition-colors ${config.textClass}`}
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
