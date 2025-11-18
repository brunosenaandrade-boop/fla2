"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Scale,
  Heart,
  Shield,
  Users,
  FileText,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui";
import { SERVICES } from "@/lib/constants";

const iconMap = {
  Scale,
  Heart,
  Shield,
  Users,
  FileText,
  RefreshCw,
};

export function ServicesSection() {
  return (
    <section id="servicos" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="text-gold-600 font-medium text-sm uppercase tracking-wider">
            Áreas de Atuação
          </span>
          <h2 className="mt-3 mb-4">
            Como posso te ajudar?
          </h2>
          <p className="text-gray-600">
            Mais de duas décadas focada exclusivamente em Direito de Família.
            Cada caso é único e merece atenção personalizada.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href} className="block h-full">
                  <Card
                    variant="hover"
                    className="h-full group cursor-pointer"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center mb-4 group-hover:bg-gold-500 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-gold-600 group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gold-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>

                    {/* Link */}
                    <div className="flex items-center text-gold-600 font-medium text-sm">
                      <span>Saiba mais</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
