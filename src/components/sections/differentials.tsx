"use client";

import { motion } from "framer-motion";
import {
  Award,
  Heart,
  GraduationCap,
  CreditCard,
  Clock,
  MessageCircle,
} from "lucide-react";
import { DIFFERENTIALS } from "@/lib/constants";

const iconMap = {
  Award,
  Heart,
  GraduationCap,
  CreditCard,
  Clock,
  MessageCircle,
};

export function DifferentialsSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-gold-50 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold-100/30 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="text-gold-600 font-medium text-sm uppercase tracking-wider">
            Por Que Me Escolher
          </span>
          <h2 className="mt-3 mb-4">
            Diferença que faz diferença
          </h2>
          <p className="text-gray-600">
            Não é apenas sobre ganhar causas. É sobre cuidar de pessoas
            em um dos momentos mais delicados de suas vidas.
          </p>
        </motion.div>

        {/* Differentials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {DIFFERENTIALS.map((differential, index) => {
            const Icon = iconMap[differential.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={differential.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 shadow-gold">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {differential.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {differential.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
