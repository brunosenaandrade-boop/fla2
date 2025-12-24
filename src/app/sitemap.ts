import { MetadataRoute } from 'next'
import { getSupabaseAdmin } from '@/lib/supabase'

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

async function getBlogPosts(): Promise<{ slug: string; updated_at: string }[]> {
  try {
    const supabase = getSupabaseAdmin()
    if (!supabase) return []

    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('published', true)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Error fetching blog posts for sitemap:', error)
      return []
    }

    return data || []
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // Dynamic blog posts
  const blogPosts = await getBlogPosts()
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries]
}
