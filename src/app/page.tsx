import { Header, Footer } from "@/components/layout";
import {
  HeroSection,
  ServicesSection,
  DifferentialsSection,
  AboutSection,
  CTASection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <DifferentialsSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
