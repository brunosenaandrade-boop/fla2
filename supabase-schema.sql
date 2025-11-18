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
