import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { PainSection } from "@/components/sections/PainSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { PersonaSection } from "@/components/sections/PersonaSection";
import { ScenesSection } from "@/components/sections/ScenesSection";
import { WhyNotSolvedSection } from "@/components/sections/WhyNotSolvedSection";
import { SolutionSection } from "@/components/sections/SolutionSection";
import { StepsSection } from "@/components/sections/StepsSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PainSection />
        <JourneySection />
        <PersonaSection />
        <ScenesSection />
        <WhyNotSolvedSection />
        <SolutionSection />
        <StepsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
