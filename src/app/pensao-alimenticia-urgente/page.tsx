import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing'
import { getLandingPageData } from '@/lib/landing-pages'
import { FAQJsonLd, ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo'
import { SITE_CONFIG } from '@/lib/constants'

const data = getLandingPageData('pensao-alimenticia-urgente')!

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: [
    'pensão alimentícia aracaju',
    'pensão alimentícia atrasada',
    'cobrar pensão alimentícia',
    'execução de alimentos sergipe',
    'advogada pensão aracaju',
    'prisão por pensão alimentícia',
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

export default function PensaoAlimenticiaPage() {
  return (
    <>
      <FAQJsonLd faqs={data.faq} />
      <ServiceJsonLd
        name="Pensão Alimentícia Urgente em Aracaju"
        description={data.metaDescription}
        url={`${SITE_CONFIG.url}/${data.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Início', url: SITE_CONFIG.url },
          { name: 'Serviços', url: `${SITE_CONFIG.url}/#servicos` },
          { name: 'Pensão Alimentícia', url: `${SITE_CONFIG.url}/${data.slug}` },
        ]}
      />
      <LandingPageTemplate data={data} />
    </>
  )
}
