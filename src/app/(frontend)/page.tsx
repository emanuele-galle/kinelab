import { HeroSection } from '@/components/sections/HeroSection'
import { WelcomeSection } from '@/components/sections/WelcomeSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { MethodSection } from '@/components/sections/MethodSection'
import { WhyUsSection } from '@/components/sections/WhyUsSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { TeamSection } from '@/components/sections/TeamSection'
import { CTASection } from '@/components/sections/CTASection'
import { ContactSection } from '@/components/sections/ContactSection'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { services, team, businessInfo } from '@/data'

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema businessInfo={businessInfo} services={services} />
      <HeroSection />
      <WelcomeSection />
      <ServicesSection services={services} />
      <MethodSection />
      <WhyUsSection />
      <GallerySection />
      <TeamSection members={team} />
      <CTASection />
      <ContactSection businessInfo={businessInfo} />
    </>
  )
}
