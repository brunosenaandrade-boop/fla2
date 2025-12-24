import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing'
import { getLandingPageData } from '@/lib/landing-pages'
import { FAQJsonLd, ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo'
import { SITE_CONFIG } from '@/lib/constants'

const data = getLandingPageData('divorcio-litigioso-aracaju')!

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: [
    'divórcio litigioso aracaju',
    'advogada divórcio sergipe',
    'divórcio judicial aracaju',
    'separação litigiosa',
    'advogada família aracaju',
    'divórcio com disputa de bens',
  ],
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: `${SITE_CONFIG.url}/${data.slug}`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/${data.slug}`,
  },
}

export default function DivorcioLitigiosoPage() {
  return (
    <>
      <FAQJsonLd faqs={data.faq} />
      <ServiceJsonLd
        name="Divórcio Litigioso em Aracaju"
        description={data.metaDescription}
        url={`${SITE_CONFIG.url}/${data.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Início', url: SITE_CONFIG.url },
          { name: 'Serviços', url: `${SITE_CONFIG.url}/#servicos` },
          { name: 'Divórcio Litigioso', url: `${SITE_CONFIG.url}/${data.slug}` },
        ]}
      />
      <LandingPageTemplate data={data} />
    </>
  )
}
