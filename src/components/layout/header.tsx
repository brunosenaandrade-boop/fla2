"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { NAV_LINKS, CONTACT, WHATSAPP_MESSAGES } from "@/lib/constants";
import { getWhatsAppLink, cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-4 md:py-6"
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            {/* Logo placeholder - iniciais FA */}
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-gold group-hover:shadow-gold-lg transition-shadow duration-300">
              <span className="text-white font-bold text-lg md:text-xl">FA</span>
            </div>
            <div className="hidden sm:block">
              <p className="font-semibold text-gray-900 text-sm md:text-base">
                Dra. Flávia Argolo
              </p>
              <p className="text-xs text-gold-600">
                Advogada de Família
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href.split("#")[0]));

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm font-medium transition-colors duration-200 relative py-2",
                        isActive
                          ? "text-gold-600"
                          : "text-gray-600 hover:text-gold-600"
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-500 rounded-full"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <a
                href={`tel:+55${CONTACT.phone}`}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gold-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden xl:inline">{CONTACT.phoneFormatted}</span>
              </a>

              <Button
                size="sm"
                leftIcon={<MessageCircle className="w-4 h-4" />}
                onClick={() => window.open(getWhatsAppLink(WHATSAPP_MESSAGES.default), "_blank")}
              >
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={getWhatsAppLink(WHATSAPP_MESSAGES.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gold-600 hover:bg-gold-50 rounded-lg transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white shadow-strong lg:hidden"
            >
              <div className="container-custom py-6">
                <ul className="space-y-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "block py-3 px-4 rounded-lg text-base font-medium transition-colors",
                            isActive
                              ? "bg-gold-50 text-gold-600"
                              : "text-gray-700 hover:bg-gray-50"
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <a
                    href={`tel:+55${CONTACT.phone}`}
                    className="flex items-center gap-3 py-3 px-4 text-gray-600 hover:text-gold-600 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    {CONTACT.phoneFormatted}
                  </a>

                  <Button
                    className="w-full mt-3"
                    leftIcon={<MessageCircle className="w-5 h-5" />}
                    onClick={() => window.open(getWhatsAppLink(WHATSAPP_MESSAGES.default), "_blank")}
                  >
                    Falar no WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
