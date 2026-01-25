'use client'

import { useState, useRef, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Image from 'next/image'

interface VideoBackgroundProps {
  videoSrc: string
  posterSrc: string
  fallbackImage: string
}

export function VideoBackground({ videoSrc, posterSrc, fallbackImage }: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Disable video se prefers-reduced-motion
  const shouldPlayVideo = !prefersReducedMotion && !hasError

  useEffect(() => {
    if (!videoRef.current || !shouldPlayVideo) return

    videoRef.current.play().catch(() => {
      setHasError(true)
    })
  }, [shouldPlayVideo])

  return (
    <>
      {shouldPlayVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={videoSrc} type="video/webm" />
          <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
        </video>
      )}

      {/* Fallback image (sempre presente sotto video) */}
      <Image
        src={fallbackImage}
        alt="Studio Pilates KineLab"
        fill
        priority
        className={`object-cover ${shouldPlayVideo && isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
    </>
  )
}
