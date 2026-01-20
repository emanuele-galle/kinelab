import { HeroSection } from '@/components/sections/HeroSection'
import { WelcomeSection } from '@/components/sections/WelcomeSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { WhyUsSection } from '@/components/sections/WhyUsSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { TeamSection } from '@/components/sections/TeamSection'
import { CTASection } from '@/components/sections/CTASection'
import { ContactSection } from '@/components/sections/ContactSection'
import { LocalBusinessSchema } from '@/components/seo/LocalBusinessSchema'
import { getServices, getTeamMembers, getBusinessInfo } from '@/lib/payload'

export default async function HomePage() {
  // Fetch dati dal CMS
  const [services, teamMembers, businessInfo] = await Promise.all([
    getServices(),
    getTeamMembers(),
    getBusinessInfo(),
  ])

  return (
    <>
      <LocalBusinessSchema businessInfo={businessInfo} services={services} />
      <HeroSection />
      <WelcomeSection />
      <ServicesSection services={services} />
      <WhyUsSection />
      <GallerySection />
      <TeamSection members={teamMembers} />
      <CTASection />
      <ContactSection businessInfo={businessInfo} />
    </>
  )
}
