import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, Tag, Share2, MessageCircle } from 'lucide-react'
import { getPostBySlug, getRelatedPosts, getAllPostSlugs, BlogPost } from '@/lib/blog'
import { Breadcrumbs } from '@/components/ui'
import { BlogPostJsonLd } from '@/components/seo'
import { SITE_CONFIG, WHATSAPP_MESSAGES } from '@/lib/constants'
import { getWhatsAppLink } from '@/lib/utils'

interface Props {
  params: { slug: string }
}

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for the post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Artigo não encontrado',
    }
  }

  const title = post.metaTitle || post.title
  const description = post.metaDescription || post.excerpt

  return {
    title: `${title} | Blog`,
    description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_CONFIG.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: post.coverImage
        ? [
            {
              url: post.coverImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
  }
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

// Related post card
function RelatedPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow">
        {post.coverImage && (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-gold-600 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          <span className="text-sm text-gray-500">
            {post.readingTime} min de leitura
          </span>
        </div>
      </article>
    </Link>
  )
}

// Share buttons component
function ShareButtons({ url, title }: { url: string; title: string }) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-500 flex items-center gap-1">
        <Share2 className="w-4 h-4" />
        Compartilhar:
      </span>
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
        aria-label="Compartilhar no WhatsApp"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
        aria-label="Compartilhar no Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition-colors"
        aria-label="Compartilhar no LinkedIn"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
    </div>
  )
}

// Author card component
function AuthorCard() {
  return (
    <div className="bg-gold-50 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src="/images/dra-flavia-confiante.jpg"
          alt="Dra. Flávia Argolo"
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-medium"
        />
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-gray-900 mb-1">Dra. Flávia Argolo</h3>
          <p className="text-gold-700 font-medium mb-3">
            Advogada Especialista em Direito de Família | OAB/SE 3458
          </p>
          <p className="text-gray-600 mb-4">
            Com 24 anos de experiência em Direito de Família, dedico-me a ajudar
            pessoas em momentos difíceis com atendimento humanizado e soluções
            jurídicas efetivas.
          </p>
          <a
            href={getWhatsAppLink(WHATSAPP_MESSAGES.default)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gold-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(params.slug, post.categorySlug, 3)
  const postUrl = `${SITE_CONFIG.url}/blog/${post.slug}`

  return (
    <>
      <BlogPostJsonLd
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt || post.publishedAt}
        image={post.coverImage}
        authorName={post.author}
      />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gold-50 via-white to-gold-50/50 pt-32 pb-12">
          <div className="container-custom">
            <Breadcrumbs
              items={[
                { label: 'Blog', href: '/blog' },
                {
                  label: post.category,
                  href: `/blog?categoria=${post.categorySlug}`,
                },
                { label: post.title },
              ]}
            />

            <div className="max-w-3xl">
              <Link
                href={`/blog?categoria=${post.categorySlug}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-gold-600 bg-gold-100 px-4 py-1.5 rounded-full hover:bg-gold-200 transition-colors mb-4"
              >
                <Tag className="w-4 h-4" />
                {post.category}
              </Link>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
                <span className="flex items-center gap-2">
                  <img
                    src="/images/dra-flavia-confiante.jpg"
                    alt={post.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min de leitura
                </span>
              </div>

              <ShareButtons url={postUrl} title={post.title} />
            </div>
          </div>
        </section>

        {/* Cover Image */}
        {post.coverImage && (
          <section className="container-custom -mt-4 mb-8">
            <div className="max-w-4xl mx-auto">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full aspect-video object-cover rounded-2xl shadow-medium"
              />
            </div>
          </section>
        )}

        {/* Article Content */}
        <article className="container-custom pb-12">
          <div className="max-w-3xl mx-auto">
            {/* Content */}
            <div
              className="prose prose-lg prose-gray max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-gold-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-ul:my-4 prose-li:text-gray-700
                prose-blockquote:border-l-gold-500 prose-blockquote:bg-gold-50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg
                mb-12"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Share Section */}
            <div className="border-t border-gray-200 pt-8 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <ShareButtons url={postUrl} title={post.title} />
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-gray-600 hover:text-gold-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Ver todos os artigos
                </Link>
              </div>
            </div>

            {/* Author Card */}
            <AuthorCard />
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-white py-16 border-t border-gray-100">
            <div className="container-custom">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Artigos Relacionados
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {relatedPosts.map((relatedPost) => (
                  <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-gradient-gold py-16">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ficou com alguma dúvida?
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Os artigos são informativos, mas cada situação é única. Agende uma
              consulta para análise personalizada do seu caso.
            </p>
            <a
              href={getWhatsAppLink(WHATSAPP_MESSAGES.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-gold-600 px-8 py-3 rounded-xl font-medium hover:bg-gold-50 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Falar com a Dra. Flávia
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
