"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Clock,
  MessageCircle,
  Scale
} from "lucide-react";
import { CONTACT, NAV_LINKS, SERVICES, LAWYER_INFO } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/utils";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
                <span className="text-white font-bold">FA</span>
              </div>
              <div>
                <p className="font-semibold text-white text-sm">
                  Dra. Flávia Argolo
                </p>
                <p className="text-xs text-gold-400">
                  {LAWYER_INFO.oab.primary}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {LAWYER_INFO.experience} de experiência dedicados ao Direito de Família.
              Atendimento humanizado e personalizado em Aracaju/SE.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-gold-500 rounded-lg transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a
                href={getWhatsAppLink(CONTACT.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-gold-500 rounded-lg transition-colors group"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navegação</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Áreas de Atuação</h4>
            <ul className="space-y-2">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="text-sm text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:+55${CONTACT.phone}`}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-gold-400 transition-colors"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {CONTACT.phoneFormatted}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-3 text-sm text-gray-400 hover:text-gold-400 transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{CONTACT.address.full}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>{CONTACT.hours.weekdays}</p>
                  <p className="text-xs mt-0.5">{CONTACT.hours.weekend}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Legal Compliance */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Scale className="w-4 h-4" />
              <span>
                {LAWYER_INFO.oab.primary} | Advocacia especializada em Direito de Família
              </span>
            </div>

            <p className="text-xs text-gray-500 text-center md:text-right">
              &copy; {currentYear} Dra. Flávia Argolo. Todos os direitos reservados.
            </p>
          </div>

          {/* OAB Compliance Notice */}
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Este site tem finalidade exclusivamente informativa, não constituindo consultoria jurídica.
              As informações aqui contidas não substituem a consulta com advogado especializado.
              Cada caso possui particularidades que devem ser analisadas individualmente.
              Em conformidade com as normas da OAB (Ordem dos Advogados do Brasil).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
