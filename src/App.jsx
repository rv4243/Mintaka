import { useState } from "react";
import "./App.css";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProductsSection from "./components/ProductsSection";
import TechnicalSpecsTable from "./components/TechnicalSpecsTable";
import IndustriesSection from "./components/IndustriesSection";
import WhyMintakaSection from "./components/WhyMintakaSection";
import SustainabilitySection from "./components/SustainabilitySection";
import SupplyChainSection from "./components/SupplyChainSection";
import CertificationsSection from "./components/CertificationsSection";
import FAQSection from "./components/FAQSection";
import ContactRFQSection from "./components/ContactRFQSection";
import Footer from "./components/Footer";

export default function App() {
  const [selectedFamily, setSelectedFamily] = useState("ALL");
  const [prefilledGrade, setPrefilledGrade] = useState(null);
  const [prefilledFamily, setPrefilledFamily] = useState("PP");

  const handleSelectFamily = (familyCode) => {
    setSelectedFamily(familyCode);
  };

  const handleQuoteGrade = (grade) => {
    setPrefilledGrade(grade);
    setPrefilledFamily(grade.family);
  };

  const handleQuoteFamily = (familyCode) => {
    setPrefilledFamily(familyCode);
    setPrefilledGrade(null);
  };

  const handleOpenRFQ = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-layout">
      {/* Utility Top Bar */}
      <TopBar />

      {/* Main Sticky Navigation */}
      <Navbar onQuoteClick={handleOpenRFQ} />

      <main id="main-content">
        {/* Hero Section */}
        <Hero
          onSelectFamily={handleSelectFamily}
          onOpenRFQ={handleOpenRFQ}
        />

        {/* About Company & Capabilities */}
        <AboutSection />

        {/* Products Showcase (PP, PE, PVC) */}
        <ProductsSection
          onSelectFamily={handleSelectFamily}
          onQuoteFamily={handleQuoteFamily}
        />

        {/* Data-Heavy Interactive Technical Specifications Matrix */}
        <TechnicalSpecsTable
          selectedFamily={selectedFamily}
          onSelectFamily={handleSelectFamily}
          onQuoteGrade={handleQuoteGrade}
        />

        {/* Industries Served */}
        <IndustriesSection
          onSelectGrade={(gradeCode) => {
            // Find family from gradeCode
            if (gradeCode.startsWith("PP")) setSelectedFamily("PP");
            else if (gradeCode.startsWith("HDPE") || gradeCode.startsWith("LDPE") || gradeCode.startsWith("LLDPE")) setSelectedFamily("PE");
            else if (gradeCode.startsWith("PVC")) setSelectedFamily("PVC");
          }}
        />

        {/* Why Mintaka Pillars */}
        <WhyMintakaSection />

        {/* Sustainability & ESG */}
        <SustainabilitySection />

        {/* Supply Chain & Dispatch Workflow */}
        <SupplyChainSection />

        {/* Certifications & Compliance */}
        <CertificationsSection />

        {/* Frequently Asked Questions */}
        <FAQSection />

        {/* Formal RFQ & Contact Center */}
        <ContactRFQSection
          key={`${prefilledGrade?.id || 'default'}-${prefilledFamily}`}
          prefilledGrade={prefilledGrade}
          prefilledFamily={prefilledFamily}
        />
      </main>

      {/* Enterprise Footer */}
      <Footer />
    </div>
  );
}