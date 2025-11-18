import {
  HeroSection,
  ServicesSection,
  DifferentialsSection,
  AboutSection,
  SocialProofSection,
  CTASection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <ServicesSection />
      <DifferentialsSection />
      <AboutSection />
      <SocialProofSection />
      <CTASection />
    </main>
  );
}
