import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing'
import { getLandingPageData } from '@/lib/landing-pages'

const data = getLandingPageData('revisao-pensao-alimenticia')!

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
  },
  alternates: {
    canonical: `https://draflaviaargolo.adv.br/${data.slug}`,
  },
}

export default function RevisaoPensaoPage() {
  return <LandingPageTemplate data={data} />
}
