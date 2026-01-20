import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyMobileCTA } from '@/components/ui/StickyMobileCTA'
import { ExitIntentPopup } from '@/components/ui/ExitIntentPopup'
import { SocialProofNotification } from '@/components/ui/SocialProofNotification'
import { getBusinessInfo } from '@/lib/payload'

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch business info dal CMS
  const businessInfo = await getBusinessInfo()

  return (
    <>
      <Header businessInfo={businessInfo} />
      <main className="min-h-screen">{children}</main>
      <Footer businessInfo={businessInfo} />
      <StickyMobileCTA businessInfo={businessInfo} />
      <ExitIntentPopup />
      <SocialProofNotification />
    </>
  )
}
