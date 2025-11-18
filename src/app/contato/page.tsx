'use client'

import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  ExternalLink,
  Calendar,
  Heart
} from 'lucide-react'
import { Button } from '@/components/ui'
import { CONTACT, LAWYER_INFO } from '@/lib/constants'
import { getWhatsAppLink } from '@/lib/utils'

export default function ContatoPage() {
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
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-gold-soft opacity-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-gold-200/30 rounded-full blur-3xl" />

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-6">
              Entre em Contato
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Vamos conversar sobre{' '}
              <span className="text-gradient-gold">sua situação</span>?
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Atendimento humanizado e rápido. Respondo pessoalmente todas as mensagens.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            {/* WhatsApp - Destaque Principal */}
            <motion.div
              variants={fadeInUp}
              className="mb-8"
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 rounded-2xl p-8 md:p-10 text-center shadow-xl">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6 shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Fale Agora no WhatsApp
                </h2>
                
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                  Atendimento rápido e humanizado. Este é o melhor canal para falarmos!
                </p>
                
                <Button
                  size="xl"
                  className="bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 mb-6"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                  onClick={() => window.open(getWhatsAppLink('Olá Dra. Flávia! Vim do site e gostaria de conversar sobre minha situação.'), '_blank')}
                >
                  (79) 99998-5695
                </Button>

                <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Resposta em até 2 horas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Atendo fins de semana em urgências</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span>Consulta {CONTACT.consultationPrice}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Outros Canais de Contato */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Telefone */}
              <motion.div variants={fadeInUp}>
                <div className="card p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-gold-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Telefone
                      </h3>
                      <a
                        href={`tel:+55${CONTACT.phone}`}
                        className="text-gold-600 hover:text-gold-700 font-medium text-lg hover:underline"
                      >
                        {CONTACT.phoneFormatted}
                      </a>
                      <p className="text-sm text-gray-500 mt-2">
                        Ligue para agendar sua consulta
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div variants={fadeInUp}>
                <div className="card p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-gold-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Email
                      </h3>
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="text-gold-600 hover:text-gold-700 font-medium hover:underline break-all"
                      >
                        {CONTACT.email}
                      </a>
                      <p className="text-sm text-gray-500 mt-2">
                        Envie sua dúvida por email
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Endereço e Instagram */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Endereço + Mapa */}
              <motion.div variants={fadeInUp}>
                <div className="card p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-gold-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Escritório
                      </h3>
                      <p className="text-gray-700 mb-1">
                        {CONTACT.address.street}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {CONTACT.address.neighborhood} - {CONTACT.address.city}/{CONTACT.address.state}
                      </p>
                      <p className="text-gray-600 text-sm">
                        CEP: {CONTACT.address.zipCode}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    rightIcon={<ExternalLink className="w-4 h-4" />}
                    onClick={() => window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address.street + ', ' + CONTACT.address.neighborhood + ', ' + CONTACT.address.city)}`,
                      '_blank'
                    )}
                  >
                    Ver no Google Maps
                  </Button>
                </div>
              </motion.div>

              {/* Instagram */}
              <motion.div variants={fadeInUp}>
                <div className="card p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        Instagram
                      </h3>
                      <a
                        href={CONTACT.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-600 hover:text-gold-700 font-medium hover:underline"
                      >
                        @flaviaargolo_adv
                      </a>
                      <p className="text-sm text-gray-500 mt-2">
                        Dicas e conteúdos sobre Direito de Família
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    rightIcon={<ExternalLink className="w-4 h-4" />}
                    onClick={() => window.open(CONTACT.instagramUrl, '_blank')}
                  >
                    Seguir no Instagram
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Horário de Atendimento */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="card p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gold-100 rounded-full mb-6">
                <Clock className="w-7 h-7 text-gold-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Horário de Atendimento
              </h2>

              <div className="grid md:grid-cols-2 gap-6 text-left max-w-xl mx-auto">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Segunda a Sexta
                    </p>
                    <p className="text-gray-600">
                      8:30 às 18:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Fins de Semana
                    </p>
                    <p className="text-gray-600">
                      Atendo casos urgentes
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-6 italic">
                "Entendo que momentos difíceis não escolhem dia ou hora. 
                Por isso, me faço disponível quando você precisar."
              </p>
              <p className="text-sm text-gold-600 font-medium mt-2">
                — Dra. Flávia Argolo
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-gold-soft">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pronta(o) para dar o próximo passo?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Estou aqui para te ouvir, acolher e orientar. Vamos resolver isso juntos.
            </p>
            <Button
              size="xl"
              leftIcon={<MessageCircle className="w-5 h-5" />}
              onClick={() => window.open(getWhatsAppLink('Olá Dra. Flávia! Quero agendar uma consulta.'), '_blank')}
            >
              Falar no WhatsApp Agora
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
