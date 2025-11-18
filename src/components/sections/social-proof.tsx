'use client'

import { motion } from 'framer-motion'
import { Users, Calendar, Scale, Heart } from 'lucide-react'

const stats = [
  {
    icon: Calendar,
    value: '24+',
    label: 'Anos de Experiência',
    description: 'Dedicados ao Direito de Família'
  },
  {
    icon: Users,
    value: '1000+',
    label: 'Famílias Atendidas',
    description: 'Em Aracaju e região'
  },
  {
    icon: Scale,
    value: '100%',
    label: 'Foco em Família',
    description: 'Especialização exclusiva'
  },
  {
    icon: Heart,
    value: '7',
    label: 'Dias por Semana',
    description: 'Disponível para urgências'
  }
]

export function SocialProofSection() {
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
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Números que Falam por Si
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Mais de duas décadas ajudando famílias a encontrar soluções jurídicas com humanidade
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gold-500/20 flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-gold-400" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gold-400 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <blockquote className="text-xl md:text-2xl text-gray-300 italic mb-6">
            &ldquo;Meus clientes acabam se tornando a minha família. Eu me envolvo, eu me importo,
            eu luto como se fosse minha própria causa.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-gold-400">FA</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-white">Dra. Flávia Argolo</p>
              <p className="text-sm text-gray-500">OAB/SE 3458</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
