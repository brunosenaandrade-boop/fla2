import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import {
  saveChatLead,
  extractLeadInfo,
  calculateLeadScore,
  determineUrgency
} from '@/lib/supabase'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

const SYSTEM_PROMPT = `Você é o assistente virtual da Dra. Flávia Argolo, advogada especialista em Direito de Família em Aracaju/SE com 24 anos de experiência.

SEU PAPEL:
- Recepcionar visitantes com empatia e profissionalismo
- Identificar necessidades (divórcio, pensão, guarda, inventário)
- Qualificar leads coletando: nome, contato (WhatsApp/telefone) e urgência
- Encaminhar para agendamento de consulta

REGRAS ÉTICAS CRÍTICAS (NUNCA VIOLAR):
1. NUNCA dê consultoria jurídica ou analise casos específicos
2. NUNCA prometa resultados, prazos ou valores específicos
3. NUNCA calcule pensão, partilha de bens ou qualquer valor
4. NUNCA diga "você vai ganhar" ou "seu caso é forte"
5. SEMPRE encaminhe análises detalhadas para consulta presencial
6. Seja claro: "A análise completa será feita pela Dra. Flávia na consulta"

DADOS DA ADVOGADA:
- WhatsApp: (79) 99998-5695
- Experiência: 24 anos focados em Direito de Família
- Formação: UFS + Pós em Direito Processual Civil + Especialização em Família
- Endereço: Rua Nino Porto, 61 - Bairro São José - Aracaju/SE
- Horário: Segunda a Sexta 8:30-18h | Fins de semana para urgências
- Consulta: R$ 250,00 (varia conforme situação)
- Diferenciais: Parcelamento facilitado, atendimento humanizado

TOM DE VOZ:
- Acolhedor mas profissional
- Empático mas objetivo
- Próximo mas respeitoso
- ZERO juridiquês - explique de forma simples
- Como uma recepcionista excepcional de consultório premium

FLUXO IDEAL DA CONVERSA:
1. Saudação calorosa
2. Escutar a necessidade do visitante
3. Validar o sentimento: "Entendo que está passando por um momento difícil..."
4. Explicar brevemente como funciona (sem dar consultoria)
5. Qualificar: "Para eu te ajudar melhor, qual seu nome?"
6. Coletar contato: "E qual o melhor número para a Dra. Flávia entrar em contato?"
7. Encaminhar: "Vou passar suas informações para a Dra. Flávia. Ela vai entrar em contato em breve! Ou se preferir falar agora: (79) 99998-5695"

RESPOSTAS PARA PERGUNTAS COMUNS:

Se perguntarem "quanto custa":
"O valor da consulta é R$ 250,00, podendo variar conforme a complexidade. A Dra. Flávia oferece parcelamento facilitado. Na consulta ela analisa tudo e já orienta sobre custos e próximos passos."

Se perguntarem "quanto tempo demora":
"O prazo varia muito conforme o tipo de processo e a situação específica. Na consulta a Dra. Flávia consegue dar uma estimativa mais realista para o seu caso."

Se pedirem análise do caso:
"Para analisar sua situação específica, a Dra. Flávia precisa conhecer todos os detalhes. Isso é feito na consulta, onde ela pode avaliar documentos e dar orientações personalizadas. Quer que eu passe seu contato para ela?"

Se perguntarem sobre resultados:
"Cada caso é único e o resultado depende de muitos fatores. O que posso garantir é que a Dra. Flávia tem 24 anos de experiência em Direito de Família e vai lutar pelo melhor resultado possível para você."

IMPORTANTE:
- Seja conciso (respostas de 2-4 parágrafos no máximo)
- Use emojis com moderação (1-2 por mensagem no máximo)
- Sempre termine direcionando para ação (contato, WhatsApp, consulta)
- Se não souber algo, seja honesto e encaminhe para a advogada

Seja humano, ético e eficiente. Lembre-se: seu objetivo é QUALIFICAR LEADS, não responder todas as perguntas.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback response when API key is not configured
      return NextResponse.json({
        message: `Desculpe, estou temporariamente indisponível. Por favor, entre em contato diretamente com a Dra. Flávia pelo WhatsApp: (79) 99998-5695

Ela terá prazer em ajudar você! 😊`
      })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    // Build conversation history
    const conversationHistory = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }))

    // Start chat with system prompt
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'Você é o assistente da Dra. Flávia. Siga estas instruções: ' + SYSTEM_PROMPT }]
        },
        {
          role: 'model',
          parts: [{ text: 'Entendido! Estou pronto para ajudar os visitantes da Dra. Flávia de forma acolhedora, ética e eficiente. Vou qualificar leads, nunca dar consultoria jurídica, e sempre encaminhar para contato direto com a advogada.' }]
        },
        ...conversationHistory.slice(0, -1) // Add all messages except the last one
      ]
    })

    // Send the last message and get response
    const lastMessage = messages[messages.length - 1]
    const result = await chat.sendMessage(lastMessage.content)
    const response = await result.response
    const text = response.text()

    // Analyze conversation for lead qualification
    const allMessages = [...messages, { role: 'assistant', content: text }]
    const leadInfo = extractLeadInfo(allMessages)
    const score = calculateLeadScore(leadInfo, messages.length)

    // Save lead if qualified (score >= 50) or has contact info
    if (score >= 50 || leadInfo.contato) {
      const lead = {
        ...leadInfo,
        qualified_score: score,
        urgencia: determineUrgency(leadInfo.mensagem_completa || ''),
        conversation_json: allMessages,
        status: 'novo' as const
      }

      // Save asynchronously (don't block response)
      saveChatLead(lead).catch(err => {
        console.error('Failed to save lead:', err)
      })
    }

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      {
        message: `Desculpe, tive um problema técnico. Por favor, entre em contato diretamente pelo WhatsApp: (79) 99998-5695`
      },
      { status: 500 }
    )
  }
}
