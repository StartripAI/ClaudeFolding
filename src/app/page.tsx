import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { FoldStack } from "@/components/ui/FoldStack";
import { AnalysisRail } from "@/components/ui/AnalysisRail";
import { sectionLinks } from "@/data/stats";

export default function Home() {
  return (
    <>
      <AnalysisRail sections={sectionLinks} />
      <main className="relative overflow-x-clip">
        <HeroSection />
        <FoldStack />
        <Footer />
      </main>
    </>
  );
}
