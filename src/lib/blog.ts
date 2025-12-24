import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'

// Works in both local dev and Vercel production
const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog')

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  contentHtml: string
  category: string
  categorySlug: string
  author: string
  publishedAt: string
  updatedAt?: string
  coverImage?: string
  featured: boolean
  readingTime: number
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
}

export interface BlogCategory {
  name: string
  slug: string
  count: number
}

// Map category slugs to display names
const categoryNames: Record<string, string> = {
  'divorcio': 'Divórcio',
  'pensao-alimenticia': 'Pensão Alimentícia',
  'guarda-filhos': 'Guarda de Filhos',
  'inventario': 'Inventário',
  'direito-familia': 'Direito de Família',
  'dicas-juridicas': 'Dicas Jurídicas',
}

function getCategoryName(slug: string): string {
  return categoryNames[slug] || slug
}

// Get all post slugs for static generation
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()

    // Calculate reading time
    const stats = readingTime(content)

    return {
      slug,
      title: data.title || 'Sem título',
      excerpt: data.excerpt || '',
      content,
      contentHtml,
      category: getCategoryName(data.category || 'direito-familia'),
      categorySlug: data.category || 'direito-familia',
      author: data.author || 'Dra. Flávia Argolo',
      publishedAt: data.publishedAt || new Date().toISOString(),
      updatedAt: data.updatedAt,
      coverImage: data.coverImage,
      featured: data.featured || false,
      readingTime: Math.ceil(stats.minutes),
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      keywords: data.keywords,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// Get all posts with optional filtering
export async function getAllPosts(options?: {
  category?: string
  featured?: boolean
  limit?: number
}): Promise<BlogPost[]> {
  const slugs = getAllPostSlugs()

  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug))
  )

  let filteredPosts = posts.filter((post): post is BlogPost => post !== null)

  // Filter by category
  if (options?.category) {
    filteredPosts = filteredPosts.filter(
      (post) => post.categorySlug === options.category
    )
  }

  // Filter by featured
  if (options?.featured) {
    filteredPosts = filteredPosts.filter((post) => post.featured)
  }

  // Sort by date (newest first)
  filteredPosts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  // Limit results
  if (options?.limit) {
    filteredPosts = filteredPosts.slice(0, options.limit)
  }

  return filteredPosts
}

// Get all categories with post counts
export async function getAllCategories(): Promise<BlogCategory[]> {
  const posts = await getAllPosts()

  const categoryCounts: Record<string, number> = {}

  posts.forEach((post) => {
    const slug = post.categorySlug
    categoryCounts[slug] = (categoryCounts[slug] || 0) + 1
  })

  return Object.entries(categoryCounts).map(([slug, count]) => ({
    name: getCategoryName(slug),
    slug,
    count,
  }))
}

// Get related posts (same category, excluding current)
export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<BlogPost[]> {
  const posts = await getAllPosts({ category })

  return posts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit)
}
