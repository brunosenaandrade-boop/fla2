import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing'
import { getLandingPageData } from '@/lib/landing-pages'
import { FAQJsonLd, ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo'
import { SITE_CONFIG } from '@/lib/constants'

const data = getLandingPageData('guarda-filhos-aracaju')!

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: [
    'guarda de filhos aracaju',
    'guarda compartilhada sergipe',
    'advogada guarda filhos',
    'regulamentação de visitas',
    'guarda unilateral aracaju',
    'direito de visita pais',
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

export default function GuardaFilhosPage() {
  return (
    <>
      <FAQJsonLd faqs={data.faq} />
      <ServiceJsonLd
        name="Guarda de Filhos em Aracaju"
        description={data.metaDescription}
        url={`${SITE_CONFIG.url}/${data.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Início', url: SITE_CONFIG.url },
          { name: 'Serviços', url: `${SITE_CONFIG.url}/#servicos` },
          { name: 'Guarda de Filhos', url: `${SITE_CONFIG.url}/${data.slug}` },
        ]}
      />
      <LandingPageTemplate data={data} />
    </>
  )
}
