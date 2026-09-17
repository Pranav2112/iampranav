import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WorkSection from "@/components/sections/WorkSection";
import AboutSection from "@/components/sections/AboutSection";
import StackSection from "@/components/sections/StackSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <main>
        <HeroSection />
        <WorkSection />
        <AboutSection />
        <StackSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
