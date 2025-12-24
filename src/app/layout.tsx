import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { Chatbot } from "@/components/chat";
import { OrganizationJsonLd, LawyerJsonLd, WebSiteJsonLd, LocalBusinessJsonLd } from "@/components/seo";

// Using system fonts for offline compatibility
// In production, replace with DM_Sans from next/font/google
const fontClass = "font-sans";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.flaviaargolo.adv.br"),
  title: {
    default: "Dra. Flávia Argolo | Advogada de Família em Aracaju",
    template: "%s | Dra. Flávia Argolo",
  },
  description:
    "Advogada especialista em Direito de Família com 24 anos de experiência em Aracaju/SE. Divórcio, pensão alimentícia, guarda de filhos e inventário com atendimento humanizado.",
  keywords: [
    "advogada de família Aracaju",
    "divórcio Aracaju",
    "pensão alimentícia Sergipe",
    "guarda de filhos",
    "inventário Aracaju",
    "direito de família",
    "Flávia Argolo",
  ],
  authors: [{ name: "Dra. Flávia Argolo" }],
  creator: "Dra. Flávia Argolo",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.flaviaargolo.adv.br",
    siteName: "Dra. Flávia Argolo - Advogada de Família",
    title: "Dra. Flávia Argolo | Advogada de Família em Aracaju",
    description:
      "24 anos de experiência em Direito de Família. Atendimento humanizado para divórcio, pensão, guarda e inventário.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dra. Flávia Argolo - Advogada de Família",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dra. Flávia Argolo | Advogada de Família em Aracaju",
    description:
      "24 anos de experiência em Direito de Família. Atendimento humanizado.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* JSON-LD Structured Data for SEO */}
        <OrganizationJsonLd />
        <LawyerJsonLd />
        <WebSiteJsonLd />
        <LocalBusinessJsonLd />
      </head>
      <body className={`${fontClass} min-h-screen flex flex-col`}>
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
