import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy initialization to avoid build errors when env vars are not set
let _supabase: SupabaseClient | null = null
let _supabaseAdmin: SupabaseClient | null = null

// Client-side Supabase client
export function getSupabase(): SupabaseClient | null {
  if (_supabase) return _supabase

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return null

  _supabase = createClient(url, key)
  return _supabase
}

// Server-side Supabase client with service key (for API routes)
export function getSupabaseAdmin(): SupabaseClient | null {
  if (_supabaseAdmin) return _supabaseAdmin

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY

  if (!url || !key) return null

  _supabaseAdmin = createClient(url, key)
  return _supabaseAdmin
}

// Legacy exports for compatibility (may be null)
export const supabase = null as SupabaseClient | null
export const supabaseAdmin = null as SupabaseClient | null

// Types for leads
export interface ChatLead {
  id?: string
  created_at?: string
  nome?: string
  contato?: string
  servico_interesse?: string
  urgencia?: 'BAIXA' | 'NORMAL' | 'ALTA' | 'URGENTE'
  mensagem_completa?: string
  qualified_score?: number
  status?: 'novo' | 'contatado' | 'agendado' | 'convertido' | 'perdido'
  conversation_json?: object
  notified_at?: string
  responded_at?: string
  notes?: string
}

// Function to save a lead from chatbot
export async function saveChatLead(lead: ChatLead): Promise<{ data: ChatLead | null; error: Error | null }> {
  try {
    const admin = getSupabaseAdmin()

    if (!admin) {
      console.warn('Supabase not configured, skipping lead save')
      return { data: null, error: null }
    }

    const { data, error } = await admin
      .from('leads_chatbot')
      .insert([lead])
      .select()
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error saving lead:', error)
    return { data: null, error: error as Error }
  }
}

// Function to extract lead info from conversation
export function extractLeadInfo(messages: { role: string; content: string }[]): Partial<ChatLead> {
  const fullConversation = messages.map(m => `${m.role}: ${m.content}`).join('\n')

  // Simple extraction patterns (could be enhanced with AI)
  let nome: string | undefined
  let contato: string | undefined
  let servico_interesse: string | undefined

  // Look for name patterns
  const nomePatterns = [
    /meu nome (?:é|e) ([A-Za-zÀ-ÿ\s]+)/i,
    /me chamo ([A-Za-zÀ-ÿ\s]+)/i,
    /sou (?:o|a) ([A-Za-zÀ-ÿ\s]+)/i,
  ]

  for (const pattern of nomePatterns) {
    const match = fullConversation.match(pattern)
    if (match) {
      nome = match[1].trim().split(/[,.]|$/)[0].trim()
      break
    }
  }

  // Look for phone patterns
  const phonePattern = /\(?\d{2}\)?\s*\d{4,5}[-.\s]?\d{4}/g
  const phoneMatch = fullConversation.match(phonePattern)
  if (phoneMatch) {
    contato = phoneMatch[phoneMatch.length - 1] // Get last mentioned phone
  }

  // Look for email patterns
  if (!contato) {
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const emailMatch = fullConversation.match(emailPattern)
    if (emailMatch) {
      contato = emailMatch[emailMatch.length - 1]
    }
  }

  // Identify service of interest
  const serviceKeywords: { [key: string]: string } = {
    'divórcio consensual': 'Divórcio Consensual',
    'divorcio consensual': 'Divórcio Consensual',
    'divórcio amigável': 'Divórcio Consensual',
    'separação consensual': 'Divórcio Consensual',
    'divórcio litigioso': 'Divórcio Litigioso',
    'divorcio litigioso': 'Divórcio Litigioso',
    'divórcio': 'Divórcio',
    'divorcio': 'Divórcio',
    'separação': 'Divórcio',
    'separar': 'Divórcio',
    'pensão alimentícia': 'Pensão Alimentícia',
    'pensao alimenticia': 'Pensão Alimentícia',
    'pensão': 'Pensão Alimentícia',
    'pensao': 'Pensão Alimentícia',
    'alimentos': 'Pensão Alimentícia',
    'guarda': 'Guarda de Filhos',
    'filho': 'Guarda de Filhos',
    'filhos': 'Guarda de Filhos',
    'visitação': 'Guarda de Filhos',
    'inventário': 'Inventário',
    'inventario': 'Inventário',
    'herança': 'Inventário',
    'heranca': 'Inventário',
    'partilha': 'Inventário',
    'revisão': 'Revisão de Pensão',
    'revisao': 'Revisão de Pensão',
    'aumentar pensão': 'Revisão de Pensão',
    'diminuir pensão': 'Revisão de Pensão',
  }

  const lowerConversation = fullConversation.toLowerCase()
  for (const [keyword, service] of Object.entries(serviceKeywords)) {
    if (lowerConversation.includes(keyword)) {
      servico_interesse = service
      break
    }
  }

  return {
    nome,
    contato,
    servico_interesse,
    mensagem_completa: fullConversation
  }
}

// Function to calculate lead qualification score
export function calculateLeadScore(lead: Partial<ChatLead>, messageCount: number): number {
  let score = 0

  // Has name: +25
  if (lead.nome && lead.nome.length > 1) {
    score += 25
  }

  // Has contact: +30
  if (lead.contato) {
    score += 30
  }

  // Has service interest: +10
  if (lead.servico_interesse) {
    score += 10
  }

  // Message count bonus: +15 for 3+ messages
  if (messageCount >= 3) {
    score += 15
  }

  // Urgency indicators: +20
  const urgencyKeywords = ['urgente', 'urgência', 'rápido', 'prazo', 'hoje', 'amanhã', 'preciso logo']
  if (lead.mensagem_completa) {
    const hasUrgency = urgencyKeywords.some(keyword =>
      lead.mensagem_completa!.toLowerCase().includes(keyword)
    )
    if (hasUrgency) {
      score += 20
    }
  }

  return Math.min(score, 100)
}

// Determine urgency level
export function determineUrgency(conversation: string): ChatLead['urgencia'] {
  const lower = conversation.toLowerCase()

  if (lower.includes('urgente') || lower.includes('urgência') || lower.includes('hoje')) {
    return 'URGENTE'
  }
  if (lower.includes('rápido') || lower.includes('logo') || lower.includes('amanhã')) {
    return 'ALTA'
  }
  if (lower.includes('prazo') || lower.includes('semana')) {
    return 'NORMAL'
  }

  return 'NORMAL'
}

// ============================================
// BLOG TYPES AND FUNCTIONS
// ============================================

export interface BlogCategory {
  id: string
  created_at: string
  name: string
  slug: string
  description?: string
  color: string
}

export interface BlogPost {
  id: string
  created_at: string
  updated_at: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image?: string
  category_id?: string
  category?: BlogCategory
  author_name: string
  published: boolean
  published_at?: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string[]
  reading_time_minutes: number
  views_count: number
  featured: boolean
}

// Get all published blog posts
export async function getBlogPosts(options?: {
  limit?: number
  offset?: number
  categorySlug?: string
  featured?: boolean
}): Promise<{ data: BlogPost[] | null; error: Error | null; count: number }> {
  try {
    const supabase = getSupabase()
    if (!supabase) {
      return { data: [], error: null, count: 0 }
    }

    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*)
      `, { count: 'exact' })
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (options?.categorySlug) {
      const { data: category } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', options.categorySlug)
        .single()

      if (category) {
        query = query.eq('category_id', category.id)
      }
    }

    if (options?.featured) {
      query = query.eq('featured', true)
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
    }

    const { data, error, count } = await query

    if (error) throw error

    return { data: data as BlogPost[], error: null, count: count || 0 }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return { data: null, error: error as Error, count: 0 }
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<{ data: BlogPost | null; error: Error | null }> {
  try {
    const supabase = getSupabase()
    if (!supabase) {
      return { data: null, error: null }
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*)
      `)
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) throw error

    return { data: data as BlogPost, error: null }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return { data: null, error: error as Error }
  }
}

// Get all blog categories
export async function getBlogCategories(): Promise<{ data: BlogCategory[] | null; error: Error | null }> {
  try {
    const supabase = getSupabase()
    if (!supabase) {
      return { data: [], error: null }
    }

    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name')

    if (error) throw error

    return { data: data as BlogCategory[], error: null }
  } catch (error) {
    console.error('Error fetching blog categories:', error)
    return { data: null, error: error as Error }
  }
}

// Increment post views (call from API route)
export async function incrementPostViews(slug: string): Promise<void> {
  try {
    const admin = getSupabaseAdmin()
    if (!admin) return

    await admin.rpc('increment_post_views', { post_slug: slug })
  } catch (error) {
    console.error('Error incrementing views:', error)
  }
}

// Get related posts
export async function getRelatedPosts(currentSlug: string, categoryId?: string, limit = 3): Promise<BlogPost[]> {
  try {
    const supabase = getSupabase()
    if (!supabase) return []

    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        category:blog_categories(*)
      `)
      .eq('published', true)
      .neq('slug', currentSlug)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    const { data, error } = await query

    if (error) throw error

    return (data as BlogPost[]) || []
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}
