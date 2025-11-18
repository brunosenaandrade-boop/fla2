'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  Phone,
  MessageSquare,
  CheckCircle,
  Award,
  Clock,
  Shield,
  ChevronDown
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { CONTACT, LAWYER_INFO } from '@/lib/constants'
import { getWhatsAppLink } from '@/lib/utils'
import type { LandingPageData } from '@/lib/landing-pages'

interface LandingPageTemplateProps {
  data: LandingPageData
}

export function LandingPageTemplate({ data }: LandingPageTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-gold-soft opacity-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-gold-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-100/40 rounded-full blur-3xl" />

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-6">
              {data.hero.badge}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {data.hero.headline}{' '}
              <span className="text-gradient-gold">{data.hero.highlightedText}</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {data.hero.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                as="a"
                href={getWhatsAppLink(data.hero.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                rightIcon={<MessageSquare className="w-5 h-5" />}
              >
                Falar no WhatsApp
              </Button>
              <Button
                as="a"
                href={`tel:+55${CONTACT.phone}`}
                variant="secondary"
                size="lg"
                leftIcon={<Phone className="w-5 h-5" />}
              >
                {CONTACT.phoneFormatted}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gold-500" />
                <span>24 anos de experiência</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gold-500" />
                <span>{LAWYER_INFO.oab.primary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-500" />
                <span>Atendimento humanizado</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              {data.painPoints.title}
            </h2>

            <div className="space-y-4">
              {data.painPoints.items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-soft"
                >
                  <CheckCircle className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{item}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8 text-lg text-gray-600"
            >
              Se você se identificou com alguma dessas situações,{' '}
              <strong className="text-gold-600">posso ajudar</strong>.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {data.howItWorks.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Um processo claro e sem surpresas
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {data.howItWorks.steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative"
              >
                {/* Connector Line */}
                {index < data.howItWorks.steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gold-200" />
                )}

                <div className="card text-center relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gold-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gold-600">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits / Why Choose Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {data.benefits.title}
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {data.benefits.items.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mini About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-4 bg-white/5 rounded-2xl p-6">
              <div className="w-16 h-16 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-gold-400">FA</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-white">Dra. Flávia Argolo</p>
                <p className="text-sm text-gray-400">{LAWYER_INFO.oab.primary}</p>
                <p className="text-sm text-gray-400">Especialista em Direito de Família</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dúvidas Frequentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Respostas claras para suas principais questões
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            {data.faq.map((item, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full card p-5 text-left flex items-center justify-between gap-4 hover:shadow-medium transition-shadow"
                >
                  <span className="font-semibold text-gray-900">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 py-4 bg-white rounded-b-2xl border border-t-0 border-gray-100"
                  >
                    <p className="text-gray-600">{item.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-gold-soft">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {data.cta.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {data.cta.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as="a"
                href={getWhatsAppLink(data.hero.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Falar no WhatsApp
              </Button>
              <Button
                as={Link}
                href="/contato"
                variant="secondary"
                size="lg"
              >
                Outras formas de contato
              </Button>
            </div>

            {/* Trust Badge */}
            <div className="mt-8 inline-flex items-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              <span>Consulta inicial: {CONTACT.consultationPrice} • Parcelamento disponível</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-6 bg-gray-100">
        <div className="container-custom">
          <p className="text-xs text-gray-500 text-center">
            Este site segue as diretrizes do Código de Ética e Disciplina da OAB.
            As informações aqui contidas são de caráter informativo e não substituem consultoria jurídica profissional.
            Dra. Flávia Argolo - {LAWYER_INFO.oab.primary}
          </p>
        </div>
      </section>
    </main>
  )
}
