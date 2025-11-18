'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Instagram,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronDown
} from 'lucide-react'
import { Button, Input, Textarea } from '@/components/ui'
import { CONTACT, SERVICES } from '@/lib/constants'
import { getWhatsAppLink } from '@/lib/utils'

const contactSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone inválido').max(15, 'Telefone inválido'),
  assunto: z.string().min(1, 'Selecione um assunto'),
  mensagem: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(1000, 'Mensagem muito longa')
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContatoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Integrate with Supabase to save lead
      console.log('Form data:', data)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqs = [
    {
      question: "Quanto custa uma consulta?",
      answer: `O valor da consulta é ${CONTACT.consultationPrice}, podendo variar conforme a complexidade do caso. Durante a consulta, analisamos toda a situação e já orientamos sobre os próximos passos e custos envolvidos.`
    },
    {
      question: "Vocês parcelam os honorários?",
      answer: "Sim! Trabalhamos com condições de pagamento facilitadas para que você possa ter acesso à justiça sem comprometer seu orçamento. Conversamos sobre isso na primeira consulta."
    },
    {
      question: "Atendem em outras cidades?",
      answer: "Nosso escritório fica em Aracaju, mas atendemos clientes de toda Sergipe e, em alguns casos, de outros estados. Muitos procedimentos podem ser iniciados de forma remota."
    },
    {
      question: "Quanto tempo leva um processo?",
      answer: "Depende do tipo de processo e da colaboração entre as partes. Um divórcio consensual pode levar poucas semanas, enquanto um litigioso pode demorar meses. Na consulta, damos uma estimativa realista para seu caso."
    },
    {
      question: "Posso ir à consulta sem documentos?",
      answer: "Pode sim! Na primeira consulta o mais importante é entender sua situação. Depois indicamos quais documentos serão necessários. Mas se já tiver algo em mãos, traga que ajuda."
    }
  ]

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
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-6">
              Entre em Contato
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Estamos aqui para{' '}
              <span className="text-gradient-gold">ajudar você</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Escolha a forma de contato que preferir. Respondemos todas as mensagens em até 24 horas úteis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="card p-6 md:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Envie sua mensagem
                </h2>
                <p className="text-gray-600 mb-6">
                  Preencha o formulário abaixo e entraremos em contato em breve.
                </p>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Mensagem enviada com sucesso!</p>
                      <p className="text-sm text-green-600">Entraremos em contato em breve.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-red-800">Erro ao enviar mensagem</p>
                      <p className="text-sm text-red-600">Tente novamente ou entre em contato pelo WhatsApp.</p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <Input
                      label="Nome completo"
                      placeholder="Seu nome"
                      error={errors.nome?.message}
                      {...register('nome')}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="seu@email.com"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Input
                      label="Telefone/WhatsApp"
                      placeholder="(79) 99999-9999"
                      error={errors.telefone?.message}
                      {...register('telefone')}
                    />
                    <div>
                      <label className="label">Assunto</label>
                      <select
                        className={`input ${errors.assunto ? 'input-error' : ''}`}
                        {...register('assunto')}
                      >
                        <option value="">Selecione...</option>
                        {SERVICES.map(service => (
                          <option key={service.id} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                        <option value="Outro">Outro assunto</option>
                      </select>
                      {errors.assunto && (
                        <p className="mt-1 text-sm text-error">{errors.assunto.message}</p>
                      )}
                    </div>
                  </div>

                  <Textarea
                    label="Mensagem"
                    placeholder="Descreva brevemente sua situação..."
                    rows={5}
                    error={errors.mensagem?.message}
                    {...register('mensagem')}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-5 h-5" />}
                  >
                    Enviar mensagem
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* WhatsApp - Highlight */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block card card-hover p-6 border-2 border-green-200 bg-green-50/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                    <p className="text-green-600 font-medium">{CONTACT.phoneFormatted}</p>
                    <p className="text-sm text-gray-500 mt-1">Resposta mais rápida</p>
                  </div>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:+55${CONTACT.phone}`}
                className="block card card-hover p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telefone</h3>
                    <p className="text-gold-600 font-medium">{CONTACT.phoneFormatted}</p>
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONTACT.email}`}
                className="block card card-hover p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gold-600 font-medium break-all">{CONTACT.email}</p>
                  </div>
                </div>
              </a>

              {/* Instagram */}
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block card card-hover p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Instagram</h3>
                    <p className="text-gold-600 font-medium">{CONTACT.instagram}</p>
                  </div>
                </div>
              </a>

              {/* Address */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Endereço</h3>
                    <p className="text-gray-600">
                      {CONTACT.address.street}<br />
                      {CONTACT.address.neighborhood}<br />
                      {CONTACT.address.city}/{CONTACT.address.state}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horário</h3>
                    <p className="text-gray-600 text-sm">
                      {CONTACT.hours.weekdays}<br />
                      {CONTACT.hours.weekend}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-medium"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.089!2d-37.0538!3d-10.9208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU1JzE0LjkiUyAzN8KwMDMnMTMuNyJX!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do escritório"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
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
              Respostas para as perguntas mais comuns sobre consultas e atendimento
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full card p-5 text-left flex items-center justify-between gap-4 hover:shadow-medium transition-shadow"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
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
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
