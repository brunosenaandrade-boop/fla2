'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft, MessageSquare } from 'lucide-react'
import { getWhatsAppLink } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function NotFound() {
  const buttonBase = cn(
    "inline-flex items-center justify-center font-medium rounded-xl",
    "transition-all duration-200 focus:outline-none focus-visible:ring-2",
    "focus-visible:ring-gold-500 focus-visible:ring-offset-2",
    "text-lg px-8 py-4 gap-2.5"
  )

  const primaryButton = cn(
    buttonBase,
    "bg-gold-500 text-white hover:bg-gold-600 shadow-gold hover:shadow-gold-lg active:scale-[0.98]"
  )

  const secondaryButton = cn(
    buttonBase,
    "bg-white text-gray-700 border-2 border-gray-200 hover:border-gold-300 hover:text-gold-600"
  )

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* 404 Number */}
        <div className="mb-8">
          <span className="text-8xl md:text-9xl font-bold text-gradient-gold">
            404
          </span>
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Página não encontrada
        </h1>
        <p className="text-gray-600 mb-8">
          Desculpe, a página que você está procurando não existe ou foi movida.
          Mas não se preocupe, estamos aqui para ajudar!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className={primaryButton}>
            <Home className="w-5 h-5 flex-shrink-0" />
            Ir para o início
          </Link>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryButton}
          >
            <MessageSquare className="w-5 h-5 flex-shrink-0" />
            Falar no WhatsApp
          </a>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gold-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar à página anterior
          </button>
        </div>
      </motion.div>
    </main>
  )
}
