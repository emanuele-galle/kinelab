'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight, Expand, ZoomIn } from 'lucide-react'

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
    alt: 'Sessione Pilates Mat',
    title: 'Pilates Mat',
    description: 'Sessioni di gruppo in ambiente rilassante',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/4498151/pexels-photo-4498151.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
    alt: 'Stretching guidato',
    title: 'Stretching',
    description: 'Flessibilita e mobilita',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
    alt: 'Pilates Reformer',
    title: 'Reformer',
    description: 'Attrezzatura professionale',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
    alt: 'Functional Training',
    title: 'Training Funzionale',
    description: 'Allenamento personalizzato',
    className: 'md:col-span-1 md:row-span-1',
  },
  {
    src: 'https://images.pexels.com/photos/6111616/pexels-photo-6111616.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
    alt: 'Studio ambiente',
    title: 'Il Nostro Studio',
    description: 'Spazio accogliente e luminoso',
    className: 'md:col-span-2 md:row-span-1',
  },
]

export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({})

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)

  const goToPrevious = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1)
  }

  const goToNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex(selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
  }

  return (
    <section id="gallery" className="section bg-[--color-bg]">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <p className="text-[--color-primary] text-sm tracking-[0.15em] uppercase mb-4">
            Il Nostro Spazio
          </p>
          <h2 className="mb-4">Galleria</h2>
          <div className="w-12 h-[1px] bg-[--color-primary] mx-auto mb-6" />
          <p>
            Un ambiente accogliente e professionale, pensato per il tuo benessere.
          </p>
        </motion.div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`relative cursor-pointer group overflow-hidden rounded-[--radius-md] ${image.className}`}
              onClick={() => openLightbox(index)}
            >
              {/* Loading skeleton */}
              {!imageLoaded[index] && (
                <div className="absolute inset-0 bg-[--color-bg-accent] animate-pulse" />
              )}

              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded[index] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(prev => ({ ...prev, [index]: true }))}
              />

              {/* Hover Overlay with Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-[--color-bg-dark]/80 via-[--color-bg-dark]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                {/* Content */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                >
                  <h4 className="text-white font-medium text-lg mb-1">{image.title}</h4>
                  <p className="text-white/70 text-sm">{image.description}</p>
                </motion.div>

                {/* Zoom icon */}
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <ZoomIn className="w-5 h-5 text-[--color-text]" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View more hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-[--color-text-muted] text-sm mt-8"
        >
          <span className="hidden md:inline">Clicca sulle immagini per ingrandirle</span>
          <span className="md:hidden">Tocca le immagini per ingrandirle</span>
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-[--color-bg-dark]/95 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Chiudi"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious() }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Precedente"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goToNext() }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Successivo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              className="relative w-[90vw] h-[80vh] max-w-5xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedIndex].src.replace('w=800', 'w=1600')}
                alt={galleryImages[selectedIndex].alt}
                fill
                className="object-contain rounded-lg"
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white text-xl font-medium mb-1">
                  {galleryImages[selectedIndex].title}
                </h3>
                <p className="text-white/70">
                  {galleryImages[selectedIndex].description}
                </p>
              </div>
            </motion.div>

            {/* Counter */}
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {selectedIndex + 1} / {galleryImages.length}
            </p>

            {/* Thumbnails */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(index) }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === selectedIndex
                      ? 'bg-white w-6'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Vai all'immagine ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
