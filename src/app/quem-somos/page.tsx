'use client'

import { motion } from 'framer-motion'
import {
  Award,
  GraduationCap,
  Heart,
  Scale,
  MapPin,
  Calendar,
  BookOpen,
  Users,
  MessageSquare,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui'
import { CONTACT, LAWYER_INFO } from '@/lib/constants'
import { getWhatsAppLink } from '@/lib/utils'

export default function QuemSomosPage() {
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
        {/* Background Elements */}
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
              Conheça a Dra. Flávia Argolo
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              24 anos dedicados a{' '}
              <span className="text-gradient-gold">proteger famílias</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Mais do que uma advogada, uma aliada nos momentos mais importantes da sua vida familiar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Column - Photo & Quick Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              {/* Photo Placeholder */}
              <div className="relative mb-8">
                <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-gold-100 to-gold-200 overflow-hidden shadow-strong">
                  <img
                    src="/images/dra-flavia-proxima.png"
                    alt="Dra. Flávia Argolo"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Decorative Badge */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-medium p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center">
                      <Award className="w-5 h-5 text-gold-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">24 Anos</p>
                      <p className="text-xs text-gray-500">de experiência</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="space-y-4">
                <div className="card p-4">
                  <div className="flex items-center gap-3">
                    <Scale className="w-5 h-5 text-gold-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{LAWYER_INFO.oab.primary}</p>
                      <p className="text-xs text-gray-500">Registro Principal</p>
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gold-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Aracaju, Sergipe</p>
                      <p className="text-xs text-gray-500">{CONTACT.address.street}</p>
                    </div>
                  </div>
                </div>

                <div className="card p-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gold-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{CONTACT.hours.weekdays}</p>
                      <p className="text-xs text-gray-500">{CONTACT.hours.weekend}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Story */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Uma trajetória construída com propósito
                </h2>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Há 24 anos, escolhi o Direito de Família não apenas como profissão, mas como missão.
                  Formada pela <strong>Universidade Federal de Sergipe</strong> e com estudos em Porto Alegre (RS),
                  trouxe para Aracaju uma visão diferenciada do atendimento jurídico.
                </p>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Ao longo dessas décadas, acompanhei milhares de famílias em seus momentos mais delicados:
                  divórcios, disputas por guarda, pensões alimentícias, inventários. Cada caso me ensinou
                  que por trás de todo processo existe uma história humana que merece ser ouvida com atenção
                  e tratada com respeito.
                </p>

                <blockquote className="border-l-4 border-gold-500 pl-6 py-2 my-8 bg-gold-50 rounded-r-lg">
                  <p className="text-lg font-medium text-gray-800 italic mb-2">
                    &ldquo;Meus clientes acabam se tornando a minha família. Eu me envolvo, eu me importo,
                    eu luto como se fosse minha própria causa.&rdquo;
                  </p>
                  <cite className="text-sm text-gold-600 not-italic">— Dra. Flávia Argolo</cite>
                </blockquote>

                <p className="text-gray-600 leading-relaxed mb-6">
                  Minha especialização em Direito de Família e Pós-graduação em Direito Processual Civil
                  me dão a base técnica necessária. Mas o que realmente faz diferença é o <strong>atendimento
                  humanizado</strong>: aqui você não é um número de processo, é uma pessoa que merece ser
                  acolhida e orientada com clareza.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Se você está passando por um momento difícil, saiba que não precisa enfrentar isso sozinho.
                  Estou aqui para ouvir sua história e encontrar o melhor caminho para proteger o que
                  é mais importante para você.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Formação e Credenciais
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Uma base sólida para oferecer o melhor atendimento
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            <motion.div
              variants={fadeInUp}
              className="card card-hover text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gold-100 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-gold-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Graduação
              </h3>
              <p className="text-gray-600 text-sm">
                {LAWYER_INFO.education.graduation}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="card card-hover text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gold-100 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-gold-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Pós-Graduação
              </h3>
              <p className="text-gray-600 text-sm">
                {LAWYER_INFO.education.postGraduation}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="card card-hover text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gold-100 flex items-center justify-center">
                <Heart className="w-7 h-7 text-gold-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Especialização
              </h3>
              <p className="text-gray-600 text-sm">
                {LAWYER_INFO.education.specialization}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meus Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Os princípios que guiam cada atendimento
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: Heart,
                title: "Empatia",
                description: "Entendo que cada caso envolve pessoas reais com sentimentos reais."
              },
              {
                icon: MessageSquare,
                title: "Transparência",
                description: "Comunicação clara sobre prazos, custos e expectativas desde o início."
              },
              {
                icon: Scale,
                title: "Ética",
                description: "Respeito às normas da OAB e compromisso com a verdade."
              },
              {
                icon: Users,
                title: "Acolhimento",
                description: "Você não é só um cliente, é alguém que merece atenção e cuidado."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center p-6"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gold-100 flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-gold-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Vamos conversar sobre o seu caso?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Cada situação é única. Agende uma consulta e vamos encontrar juntos
              a melhor solução para você e sua família.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as="a"
                href={getWhatsAppLink()}
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
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
              >
                Ver outras formas de contato
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
