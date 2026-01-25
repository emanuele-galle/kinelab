'use client'

interface VideoTestimonialProps {
  videoSrc: string
  posterSrc: string
  name: string
  role?: string
}

export function VideoTestimonial({ videoSrc, posterSrc, name, role }: VideoTestimonialProps) {
  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-[--color-bg-accent]">
      <video
        controls
        poster={posterSrc}
        className="w-full h-full object-cover"
        preload="metadata"
      >
        <source src={videoSrc} type="video/webm" />
        <source src={videoSrc.replace('.webm', '.mp4')} type="video/mp4" />
      </video>

      {/* Info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="text-white font-medium">{name}</p>
        {role && <p className="text-white/70 text-sm">{role}</p>}
      </div>
    </div>
  )
}
