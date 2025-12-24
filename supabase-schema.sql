-- Dra. Flávia Argolo - Supabase Schema
-- Run this SQL in your Supabase SQL Editor to create the leads table

-- Create the leads_chatbot table
CREATE TABLE IF NOT EXISTS leads_chatbot (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  nome TEXT,
  contato TEXT,
  servico_interesse TEXT,
  urgencia TEXT DEFAULT 'NORMAL' CHECK (urgencia IN ('BAIXA', 'NORMAL', 'ALTA', 'URGENTE')),
  mensagem_completa TEXT,
  qualified_score INTEGER CHECK (qualified_score >= 0 AND qualified_score <= 100),
  status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'contatado', 'agendado', 'convertido', 'perdido')),
  conversation_json JSONB,
  notified_at TIMESTAMP WITH TIME ZONE,
  responded_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads_chatbot(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads_chatbot(status);
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads_chatbot(qualified_score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_urgencia ON leads_chatbot(urgencia);

-- Enable Row Level Security
ALTER TABLE leads_chatbot ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users (admin access)
CREATE POLICY "Admin full access" ON leads_chatbot
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Create policy for service role (API access)
CREATE POLICY "Service role access" ON leads_chatbot
  FOR ALL
  USING (auth.role() = 'service_role');

-- Optional: Create a view for qualified leads only
CREATE OR REPLACE VIEW qualified_leads AS
SELECT *
FROM leads_chatbot
WHERE qualified_score >= 70
ORDER BY created_at DESC;

-- Optional: Create a function to get lead statistics
CREATE OR REPLACE FUNCTION get_lead_stats()
RETURNS TABLE (
  total_leads BIGINT,
  qualified_leads BIGINT,
  converted_leads BIGINT,
  avg_score NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_leads,
    COUNT(*) FILTER (WHERE qualified_score >= 70)::BIGINT as qualified_leads,
    COUNT(*) FILTER (WHERE status = 'convertido')::BIGINT as converted_leads,
    ROUND(AVG(qualified_score), 2) as avg_score
  FROM leads_chatbot;
END;
$$ LANGUAGE plpgsql;

-- Grant permissions
GRANT ALL ON leads_chatbot TO authenticated;
GRANT ALL ON leads_chatbot TO service_role;
GRANT SELECT ON qualified_leads TO authenticated;

-- ============================================
-- BLOG SYSTEM SCHEMA
-- ============================================

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#B8860B'
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category_id UUID REFERENCES blog_categories(id),
  author_name TEXT DEFAULT 'Dra. Flávia Argolo',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  reading_time_minutes INTEGER DEFAULT 5,
  views_count INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false
);

-- Create indexes for blog performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);

-- Enable RLS on blog tables
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Public read published posts" ON blog_posts
  FOR SELECT
  USING (published = true);

-- Public read access for categories
CREATE POLICY "Public read categories" ON blog_categories
  FOR SELECT
  USING (true);

-- Admin full access for blog_posts
CREATE POLICY "Admin full access blog_posts" ON blog_posts
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Admin full access for blog_categories
CREATE POLICY "Admin full access blog_categories" ON blog_categories
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Service role access
CREATE POLICY "Service role access blog_posts" ON blog_posts
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role access blog_categories" ON blog_categories
  FOR ALL
  USING (auth.role() = 'service_role');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts
  SET views_count = views_count + 1
  WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert default categories for family law blog
INSERT INTO blog_categories (name, slug, description, color) VALUES
  ('Divórcio', 'divorcio', 'Artigos sobre processos de divórcio', '#B8860B'),
  ('Pensão Alimentícia', 'pensao-alimenticia', 'Dúvidas sobre pensão alimentícia', '#D4A94C'),
  ('Guarda de Filhos', 'guarda-filhos', 'Informações sobre guarda compartilhada e unilateral', '#9A7209'),
  ('Inventário', 'inventario', 'Orientações sobre inventário e partilha', '#7C5B07'),
  ('Direito de Família', 'direito-familia', 'Artigos gerais sobre direito de família', '#5E4505'),
  ('Dicas Jurídicas', 'dicas-juridicas', 'Dicas práticas para questões jurídicas', '#402F03')
ON CONFLICT (slug) DO NOTHING;

-- Grant permissions for blog tables
GRANT ALL ON blog_posts TO authenticated;
GRANT ALL ON blog_posts TO service_role;
GRANT SELECT ON blog_posts TO anon;
GRANT ALL ON blog_categories TO authenticated;
GRANT ALL ON blog_categories TO service_role;
GRANT SELECT ON blog_categories TO anon;
