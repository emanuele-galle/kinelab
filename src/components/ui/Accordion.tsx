'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  defaultOpen?: string | string[]
}

export function Accordion({ items, allowMultiple = false, defaultOpen }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(
    Array.isArray(defaultOpen) ? defaultOpen : defaultOpen ? [defaultOpen] : []
  )
  const prefersReducedMotion = useReducedMotion()

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      )
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleItem(id)
    }
  }

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)

        return (
          <div
            key={item.id}
            className="border border-[--color-border] rounded-xl overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-[--color-bg-accent] transition-colors"
            >
              <span className="font-medium text-[--color-text]">{item.title}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-[--color-text-muted]" />
              </motion.div>
            </button>

            {/* Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                  animate={prefersReducedMotion ? undefined : { height: 'auto', opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 text-[--color-text-muted]">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
