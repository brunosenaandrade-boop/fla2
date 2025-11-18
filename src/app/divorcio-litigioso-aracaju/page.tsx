import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing'
import { getLandingPageData } from '@/lib/landing-pages'

const data = getLandingPageData('divorcio-litigioso-aracaju')!

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

export default function DivorcioLitigiosoPage() {
  return <LandingPageTemplate data={data} />
}
