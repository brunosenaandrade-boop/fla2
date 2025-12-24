import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing'
import { getLandingPageData } from '@/lib/landing-pages'
import { FAQJsonLd, ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo'
import { SITE_CONFIG } from '@/lib/constants'

const data = getLandingPageData('revisao-pensao-alimenticia')!

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: [
    'revisão pensão alimentícia aracaju',
    'reduzir pensão alimentícia',
    'aumentar pensão alimentícia',
    'ação revisional alimentos',
    'advogada pensão sergipe',
    'modificar valor pensão',
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

export default function RevisaoPensaoPage() {
  return (
    <>
      <FAQJsonLd faqs={data.faq} />
      <ServiceJsonLd
        name="Revisão de Pensão Alimentícia em Aracaju"
        description={data.metaDescription}
        url={`${SITE_CONFIG.url}/${data.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Início', url: SITE_CONFIG.url },
          { name: 'Serviços', url: `${SITE_CONFIG.url}/#servicos` },
          { name: 'Revisão de Pensão', url: `${SITE_CONFIG.url}/${data.slug}` },
        ]}
      />
      <LandingPageTemplate data={data} />
    </>
  )
}
