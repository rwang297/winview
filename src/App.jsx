import "./App.css"
import Header from "./components/winview/Header"
import HeroSection from "./components/winview/HeroSection";
import FeaturesSection from "./components/winview/FeaturesSection";
import AppDownloadSection from "./components/winview/AppDownloadSection";
import FAQSection from "./components/winview/FAQSection";
import CTASection from "./components/winview/CTASection";
import SavingsPackagesSection from "./components/winview/SavingsPackagesSection"; // added
import Footer from "./components/winview/Footer";
import HirePurchaseShowcase from "./components/winview/HirePurchaseShowcase";

export default function Homepage() {
  return (
    <div className="w-full min-h-screen bg-[#FAF7F2]">
      <Header />
      <HeroSection />
      {/* Newly added iOS-style hire purchase image slider + copy */}
      <HirePurchaseShowcase />
      {/* Move Smart Savings Packages to appear just above Features */}
      <SavingsPackagesSection />
      <FeaturesSection />
      <AppDownloadSection />
      <FAQSection />
      <CTASection />
      {/* Removed SavingsPackagesSection from below CTA to avoid duplication */}
      <Footer />
    </div>
  );
}
