import { Metadata } from 'next'
import { LandingPageTemplate } from '@/components/landing'
import { getLandingPageData } from '@/lib/landing-pages'
import { FAQJsonLd, ServiceJsonLd, BreadcrumbJsonLd } from '@/components/seo'
import { SITE_CONFIG } from '@/lib/constants'

const data = getLandingPageData('inventario-partilha-bens')!

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  keywords: [
    'inventário aracaju',
    'partilha de bens sergipe',
    'inventário extrajudicial',
    'inventário judicial aracaju',
    'advogada inventário',
    'herança partilha bens',
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

export default function InventarioPage() {
  return (
    <>
      <FAQJsonLd faqs={data.faq} />
      <ServiceJsonLd
        name="Inventário e Partilha de Bens em Aracaju"
        description={data.metaDescription}
        url={`${SITE_CONFIG.url}/${data.slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Início', url: SITE_CONFIG.url },
          { name: 'Serviços', url: `${SITE_CONFIG.url}/#servicos` },
          { name: 'Inventário', url: `${SITE_CONFIG.url}/${data.slug}` },
        ]}
      />
      <LandingPageTemplate data={data} />
    </>
  )
}
