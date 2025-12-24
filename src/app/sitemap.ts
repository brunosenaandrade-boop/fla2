import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const baseUrl = 'https://www.flaviaargolo.adv.br'

// Static pages with their priorities and change frequencies
const staticPages = [
  { url: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { url: '/quem-somos', priority: 0.8, changeFrequency: 'monthly' as const },
  { url: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
  // Landing pages - high priority for SEO
  { url: '/divorcio-rapido-aracaju', priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/divorcio-litigioso-aracaju', priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/pensao-alimenticia-urgente', priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/revisao-pensao-alimenticia', priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/guarda-filhos-aracaju', priority: 0.9, changeFrequency: 'weekly' as const },
  { url: '/inventario-partilha-bens', priority: 0.9, changeFrequency: 'weekly' as const },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // Dynamic blog posts from Markdown files
  const posts = await getAllPosts()
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries]
}
