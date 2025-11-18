import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

export function getWhatsAppLink(message?: string): string {
  // Default phone number from constants
  const phone = "79999985695";
  const baseUrl = `https://wa.me/55${phone}`;

  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }

  // Default message
  const defaultMessage = "Olá Dra. Flávia! Vim do seu site e gostaria de agendar uma consulta. Meu nome é: ";
  return `${baseUrl}?text=${encodeURIComponent(defaultMessage)}`;
}

export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}
