'use client'

import { useEffect, useRef, useState } from 'react'

interface MagneticOptions {
  strength?: number // Max displacement in pixels
  radius?: number // Activation radius in pixels
  stiffness?: number // Spring stiffness
  damping?: number // Spring damping
}

/**
 * Magnetic cursor effect hook
 * Makes an element follow the cursor when within proximity
 *
 * @example
 * const { elementRef, magneticStyle } = useMagneticCursor({ strength: 8, radius: 100 })
 * <button ref={elementRef} style={magneticStyle}>Hover me</button>
 */
export function useMagneticCursor(options: MagneticOptions = {}) {
  const {
    strength = 8,
    radius = 100,
    stiffness = 150,
    damping = 15,
  } = options

  const elementRef = useRef<HTMLElement>(null)
  const [magneticStyle, setMagneticStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let animationFrameId: number
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance < radius) {
        // Calculate magnetic pull (stronger when closer)
        const pullFactor = 1 - distance / radius
        targetX = (deltaX / distance) * strength * pullFactor
        targetY = (deltaY / distance) * strength * pullFactor
      } else {
        targetX = 0
        targetY = 0
      }
    }

    const handleMouseLeave = () => {
      targetX = 0
      targetY = 0
    }

    // Spring physics animation loop
    const animate = () => {
      // Spring physics
      const dx = targetX - currentX
      const dy = targetY - currentY

      currentX += dx / damping
      currentY += dy / damping

      setMagneticStyle({
        transform: `translate(${currentX}px, ${currentY}px)`,
        transition: 'transform 0.1s ease-out',
      })

      // Continue animation if not settled
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    // Start animation loop on mouse move
    const startAnimation = () => {
      cancelAnimationFrame(animationFrameId)
      animate()
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousemove', startAnimation)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousemove', startAnimation)
      element.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [strength, radius, stiffness, damping])

  return { elementRef, magneticStyle }
}
