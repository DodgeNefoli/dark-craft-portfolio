import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import SocialSection from "@/components/SocialSection";
import SystemInfoSection from "@/components/SystemInfoSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <SocialSection />
      <SystemInfoSection />
      <footer className="border-t border-border py-8 text-center font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Index;
