import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { getBlogPosts, getBlogCategories, BlogPost, BlogCategory } from '@/lib/supabase'
import { Breadcrumbs } from '@/components/ui'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Blog | Dra. Flávia Argolo',
  description:
    'Artigos e orientações sobre Direito de Família: divórcio, pensão alimentícia, guarda de filhos, inventário e mais. Informações atualizadas por advogada especialista.',
  keywords: [
    'blog direito de família',
    'artigos jurídicos',
    'divórcio dicas',
    'pensão alimentícia como funciona',
    'guarda compartilhada',
    'advogada aracaju blog',
  ],
  openGraph: {
    title: 'Blog | Dra. Flávia Argolo - Advogada de Família',
    description:
      'Artigos e orientações sobre Direito de Família: divórcio, pensão alimentícia, guarda de filhos e mais.',
    type: 'website',
    url: `${SITE_CONFIG.url}/blog`,
  },
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
}

// Format date to Brazilian format
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

// Blog post card component
function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-medium transition-shadow duration-300 group">
      {post.cover_image && (
        <Link href={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}
      <div className="p-6">
        {post.category && (
          <Link
            href={`/blog?categoria=${post.category.slug}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-gold-600 bg-gold-50 px-3 py-1 rounded-full hover:bg-gold-100 transition-colors mb-3"
          >
            <Tag className="w-3 h-3" />
            {post.category.name}
          </Link>
        )}

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gold-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.published_at || post.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.reading_time_minutes} min
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-gold-600 font-medium hover:text-gold-700 transition-colors"
          >
            Ler mais
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}

// Category filter component
function CategoryFilter({
  categories,
  activeSlug,
}: {
  categories: BlogCategory[]
  activeSlug?: string
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !activeSlug
            ? 'bg-gold-500 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Todos
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/blog?categoria=${category.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeSlug === category.slug
              ? 'bg-gold-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}

// Empty state component
function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-12 h-12 text-gold-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        Nenhum artigo encontrado
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Estamos preparando conteúdos especiais sobre Direito de Família. Em breve
        novos artigos estarão disponíveis!
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gold-600 font-medium hover:text-gold-700 transition-colors"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        Voltar para o início
      </Link>
    </div>
  )
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { categoria?: string; pagina?: string }
}) {
  const categorySlug = searchParams.categoria
  const page = parseInt(searchParams.pagina || '1', 10)
  const postsPerPage = 9

  const [postsResult, categoriesResult] = await Promise.all([
    getBlogPosts({
      limit: postsPerPage,
      offset: (page - 1) * postsPerPage,
      categorySlug,
    }),
    getBlogCategories(),
  ])

  const posts = postsResult.data || []
  const totalPosts = postsResult.count
  const categories = categoriesResult.data || []
  const totalPages = Math.ceil(totalPosts / postsPerPage)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-50 via-white to-gold-50/50 pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Blog' }]} />

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Blog <span className="text-gradient-gold">Jurídico</span>
            </h1>
            <p className="text-lg text-gray-600">
              Artigos, orientações e informações atualizadas sobre Direito de Família.
              Tire suas dúvidas sobre divórcio, pensão alimentícia, guarda de filhos
              e muito mais.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="container-custom">
          {/* Category Filter */}
          {categories.length > 0 && (
            <CategoryFilter categories={categories} activeSlug={categorySlug} />
          )}

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  {page > 1 && (
                    <Link
                      href={`/blog?${categorySlug ? `categoria=${categorySlug}&` : ''}pagina=${page - 1}`}
                      className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Anterior
                    </Link>
                  )}

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Link
                      key={pageNum}
                      href={`/blog?${categorySlug ? `categoria=${categorySlug}&` : ''}pagina=${pageNum}`}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        pageNum === page
                          ? 'bg-gold-500 text-white'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  ))}

                  {page < totalPages && (
                    <Link
                      href={`/blog?${categorySlug ? `categoria=${categorySlug}&` : ''}pagina=${page + 1}`}
                      className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Próximo
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Precisa de orientação jurídica?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Os artigos são informativos, mas cada caso é único. Agende uma consulta
            para uma análise personalizada da sua situação.
          </p>
          <Link
            href="/#contato"
            className="inline-flex items-center gap-2 bg-gold-500 text-white px-8 py-3 rounded-xl font-medium hover:bg-gold-600 transition-colors"
          >
            Agendar Consulta
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
