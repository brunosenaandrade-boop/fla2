"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, ArrowRight, Award, Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui";
import { CONTACT, WHATSAPP_MESSAGES, LAWYER_INFO } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 md:pt-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-50 via-white to-gold-50/50" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold-100/40 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Award className="w-4 h-4" />
              {LAWYER_INFO.experience} de experiência
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Direito de Família com{" "}
              <span className="text-gradient-gold">acolhimento</span> e{" "}
              <span className="text-gradient-gold">experiência</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
              Em Aracaju, há mais de duas décadas ajudando famílias em momentos
              difíceis. Aqui você é tratado como família, não como processo.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button
                size="lg"
                leftIcon={<MessageCircle className="w-5 h-5" />}
                onClick={() =>
                  window.open(
                    getWhatsAppLink(WHATSAPP_MESSAGES.default),
                    "_blank"
                  )
                }
              >
                Falar no WhatsApp
              </Button>

              <Button
                variant="secondary"
                size="lg"
                leftIcon={<Phone className="w-5 h-5" />}
                onClick={() => window.open(`tel:+55${CONTACT.phone}`, "_self")}
              >
                {CONTACT.phoneFormatted}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>Atendimento imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>Pagamento facilitado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span>Consulta {CONTACT.consultationPrice}</span>
              </div>
            </div>
          </motion.div>

          {/* Image / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Placeholder for photo */}
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              {/* Main card */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-100 to-gold-200 rounded-3xl shadow-strong overflow-hidden">
                <div className="absolute inset-0">
                  {/* Foto da Dra. Flávia */}
                  <img
                    src="/images/dra-flavia-acolhedora.png"
                    alt="Dra. Flávia Argolo - Advogada Especialista em Direito de Família"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Overlay sutil para melhor legibilidade dos badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                {/* Info card sobre a foto */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Dra. Flávia Argolo
                  </h3>
                  <p className="text-gold-700 font-medium text-sm mb-2">
                    {LAWYER_INFO.oab.primary}
                  </p>
                  <p className="text-xs text-gray-600">
                    {LAWYER_INFO.education.specialization}
                  </p>
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-medium p-4 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-gold-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">+1000</p>
                    <p className="text-xs text-gray-500">Famílias atendidas</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-4 bottom-1/4 bg-white rounded-xl shadow-medium p-4 hidden md:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-gold-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">24 anos</p>
                    <p className="text-xs text-gray-500">De dedicação</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400">Conheça nossos serviços</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-4 h-4 text-gold-500 rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
