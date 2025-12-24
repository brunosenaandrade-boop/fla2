'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { BreadcrumbJsonLd } from '@/components/seo'
import { SITE_CONFIG } from '@/lib/constants'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: 'Início', href: '/' }, ...items]

  // Prepare items for JSON-LD
  const jsonLdItems = allItems.map((item) => ({
    name: item.label,
    url: item.href ? `${SITE_CONFIG.url}${item.href}` : SITE_CONFIG.url,
  }))

  return (
    <>
      <BreadcrumbJsonLd items={jsonLdItems} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center flex-wrap gap-2 text-sm text-gray-500">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
              {item.href && index < allItems.length - 1 ? (
                <Link
                  href={item.href}
                  className="hover:text-gold-600 transition-colors flex items-center gap-1"
                >
                  {index === 0 && <Home className="w-4 h-4" />}
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium flex items-center gap-1">
                  {index === 0 && <Home className="w-4 h-4" />}
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
