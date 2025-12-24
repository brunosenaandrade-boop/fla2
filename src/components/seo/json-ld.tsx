import { CONTACT, LAWYER_INFO, SITE_CONFIG } from '@/lib/constants'

// Base Organization Schema
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: 'Dra. Flávia Argolo - Advocacia Familiar',
    alternateName: 'Escritório de Advocacia Flávia Argolo',
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    image: `${SITE_CONFIG.url}/images/dra-flavia-confiante.jpg`,
    description: SITE_CONFIG.description,
    telephone: `+55${CONTACT.phone}`,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.state,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -10.9472,
      longitude: -37.0731,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Aracaju',
        containedInPlace: {
          '@type': 'State',
          name: 'Sergipe',
        },
      },
      {
        '@type': 'State',
        name: 'Sergipe',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:30',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Cash, Credit Card, PIX, Bank Transfer',
    sameAs: [CONTACT.instagramUrl],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Direito de Família',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Divórcio Consensual',
            description: 'Processo rápido e amigável para encerrar o casamento',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Divórcio Litigioso',
            description: 'Representação em divórcios com disputas',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pensão Alimentícia',
            description: 'Execução, revisão e exoneração de pensão alimentícia',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Guarda de Filhos',
            description: 'Guarda compartilhada e unilateral',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Inventário e Partilha',
            description: 'Inventário judicial e extrajudicial',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Person Schema for the Lawyer
export function LawyerJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    '@id': `${SITE_CONFIG.url}/#lawyer`,
    name: `Dra. ${LAWYER_INFO.name}`,
    givenName: 'Flávia',
    familyName: 'Argolo',
    jobTitle: 'Advogada Especialista em Direito de Família',
    description: `Advogada com ${LAWYER_INFO.experience} de experiência em Direito de Família em Aracaju/SE`,
    image: `${SITE_CONFIG.url}/images/dra-flavia-confiante.jpg`,
    url: `${SITE_CONFIG.url}/quem-somos`,
    telephone: `+55${CONTACT.phone}`,
    email: CONTACT.email,
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: LAWYER_INFO.education.graduation,
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Professional License',
        name: LAWYER_INFO.oab.primary,
        recognizedBy: {
          '@type': 'Organization',
          name: 'Ordem dos Advogados do Brasil - Seccional Sergipe',
        },
      },
    ],
    knowsAbout: [
      'Direito de Família',
      'Divórcio',
      'Pensão Alimentícia',
      'Guarda de Filhos',
      'Inventário',
      'Direito Civil',
    ],
    worksFor: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.state,
      addressCountry: 'BR',
    },
    sameAs: [CONTACT.instagramUrl],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// WebSite Schema for Sitelinks Search Box
export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    inLanguage: 'pt-BR',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// FAQ Schema - great for landing pages
interface FAQItem {
  question: string
  answer: string
}

export function FAQJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// BlogPosting Schema for blog posts
interface BlogPostJsonLdProps {
  title: string
  description: string
  slug: string
  publishedAt: string
  updatedAt: string
  image?: string
  authorName?: string
}

export function BlogPostJsonLd({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  image,
  authorName = 'Dra. Flávia Argolo',
}: BlogPostJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_CONFIG.url}/blog/${slug}`,
    headline: title,
    description: description,
    image: image || `${SITE_CONFIG.url}/og-image.jpg`,
    url: `${SITE_CONFIG.url}/blog/${slug}`,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      '@type': 'Person',
      name: authorName,
      url: `${SITE_CONFIG.url}/quem-somos`,
    },
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${slug}`,
    },
    inLanguage: 'pt-BR',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// BreadcrumbList Schema
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Local Business with Reviews Schema
export function LocalBusinessJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: 'Dra. Flávia Argolo - Advocacia Familiar',
    image: `${SITE_CONFIG.url}/images/dra-flavia-confiante.jpg`,
    url: SITE_CONFIG.url,
    telephone: `+55${CONTACT.phone}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address.street,
      addressLocality: CONTACT.address.city,
      addressRegion: CONTACT.address.state,
      postalCode: '49015-000',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -10.9472,
      longitude: -37.0731,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '18:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '127',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Service Schema for landing pages
interface ServiceJsonLdProps {
  name: string
  description: string
  url: string
}

export function ServiceJsonLd({ name, description, url }: ServiceJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: name,
    description: description,
    url: url,
    provider: {
      '@id': `${SITE_CONFIG.url}/#organization`,
    },
    areaServed: {
      '@type': 'City',
      name: 'Aracaju',
    },
    serviceType: 'Serviço Jurídico',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
