"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, GraduationCap, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui";
import { LAWYER_INFO, CONTACT } from "@/lib/constants";

export function AboutSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main image placeholder */}
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-gold-100 to-gold-200 overflow-hidden shadow-strong">
                <div className="h-full flex flex-col items-center justify-center p-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center mb-4 shadow-gold">
                    <span className="text-white text-4xl font-bold">FA</span>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    [Foto da Dra. Flávia em ambiente de trabalho]
                  </p>
                </div>
              </div>

              {/* Info card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-medium p-4 md:p-6 max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <GraduationCap className="w-5 h-5 text-gold-600" />
                  <span className="text-sm font-semibold text-gray-900">
                    Formação
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {LAWYER_INFO.education.graduation}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="text-gold-600 font-medium text-sm uppercase tracking-wider">
              Sobre Mim
            </span>
            <h2 className="mt-3 mb-6">
              Prazer, sou a Dra. Flávia Argolo
            </h2>

            <div className="space-y-4 text-gray-600 mb-8">
              <p>
                Há mais de duas décadas, escolhi dedicar minha carreira ao Direito de
                Família. Não por acaso, mas por acreditar que é nesse campo que
                podemos fazer a maior diferença na vida das pessoas.
              </p>
              <p>
                Formada pela Universidade Federal de Sergipe e com pós-graduação em
                Direito Processual Civil, especializei-me em questões familiares
                porque entendo que <strong>cada família merece ser ouvida e respeitada</strong>.
              </p>
              <p>
                Meus clientes costumam dizer que aqui eles são tratados &ldquo;como família&rdquo;.
                E é exatamente assim que encaro cada caso:{" "}
                <strong>com a seriedade de um profissional e o cuidado de quem se importa</strong>.
              </p>
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 bg-gold-50 px-4 py-2 rounded-lg">
                <Calendar className="w-4 h-4 text-gold-600" />
                <span className="text-sm font-medium text-gray-700">
                  {LAWYER_INFO.experience} de experiência
                </span>
              </div>
              <div className="flex items-center gap-2 bg-gold-50 px-4 py-2 rounded-lg">
                <MapPin className="w-4 h-4 text-gold-600" />
                <span className="text-sm font-medium text-gray-700">
                  {CONTACT.address.city}/{CONTACT.address.state}
                </span>
              </div>
            </div>

            <Link href="/quem-somos">
              <Button
                variant="secondary"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Conheça minha história
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
