"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui";
import { CONTACT, WHATSAPP_MESSAGES } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/utils";

export function CTASection() {
  return (
    <section className="section-padding bg-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold-500/20 text-gold-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            Pronta para te ajudar
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Não deixe para depois.{" "}
            <span className="text-gold-400">Seu direito não espera.</span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Cada dia que passa pode significar um direito perdido. Agende uma
            consulta e vamos conversar sobre a sua situação.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              size="lg"
              leftIcon={<MessageCircle className="w-5 h-5" />}
              onClick={() =>
                window.open(
                  getWhatsAppLink(WHATSAPP_MESSAGES.default),
                  "_blank"
                )
              }
              className="w-full sm:w-auto"
            >
              Falar no WhatsApp
            </Button>

            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Phone className="w-5 h-5" />}
              onClick={() => window.open(`tel:+55${CONTACT.phone}`, "_self")}
              className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:text-white"
            >
              Ligar agora
            </Button>
          </div>

          {/* Alternative contact */}
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Mail className="w-4 h-4" />
            <span className="text-sm">
              Prefere email?{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-gold-400 hover:text-gold-300 transition-colors"
              >
                {CONTACT.email}
              </a>
            </span>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">24+</p>
              <p className="text-sm text-gray-400">Anos de experiência</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">1000+</p>
              <p className="text-sm text-gray-400">Famílias atendidas</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">100%</p>
              <p className="text-sm text-gray-400">Foco em família</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-gold-400 mb-2">7</p>
              <p className="text-sm text-gray-400">Dias por semana*</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            *Urgências atendidas em fins de semana
          </p>
        </motion.div>
      </div>
    </section>
  );
}
