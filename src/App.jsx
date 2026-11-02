import { useState } from "react";
import "./App.css";

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import TechnicalSpecsTable from "./components/TechnicalSpecsTable";
import IndustriesSection from "./components/IndustriesSection";
import WhyMintakaSection from "./components/WhyMintakaSection";
import SustainabilitySection from "./components/SustainabilitySection";
import SupplyChainSection from "./components/SupplyChainSection";
import CertificationsSection from "./components/CertificationsSection";
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

  const handleOpenRFQ = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      const isMobile = window.innerWidth <= 900;
      const navOffset = isMobile ? 74 : 94;
      const targetY = contactEl.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
    }
  };

  return (
    <div className="app-layout">
      {/* Utility Top Bar */}
      <TopBar />

      {/* Main Sticky Navigation */}
      <Navbar onQuoteClick={handleOpenRFQ} />

      <main id="main-content">
        {/* 1. Home / Hero Section */}
        <Hero
          onSelectFamily={handleSelectFamily}
          onOpenRFQ={handleOpenRFQ}
        />

        {/* 2. Industries Served */}
        <IndustriesSection
          onSelectGrade={(gradeCode) => {
            // Find family from gradeCode
            if (gradeCode.startsWith("PP")) setSelectedFamily("PP");
            else if (gradeCode.startsWith("HDPE") || gradeCode.startsWith("LDPE") || gradeCode.startsWith("LLDPE")) setSelectedFamily("PE");
            else if (gradeCode.startsWith("PVC")) setSelectedFamily("PVC");
          }}
        />

        {/* 3. Materials & Technical Specifications Matrix */}
        <TechnicalSpecsTable
          selectedFamily={selectedFamily}
          onSelectFamily={handleSelectFamily}
          onQuoteGrade={handleQuoteGrade}
        />

        {/* 5. Manufacturing Capabilities & Supply Infrastructure */}
        <SupplyChainSection />

        {/* Why Mintaka Pillars & Competitive Advantages */}
        <WhyMintakaSection />

        {/* Sustainability & ESG Commitments */}
        <SustainabilitySection />

        {/* 6. About Us - Company Heritage & Technical Highlights */}
        <AboutSection />

        {/* Certifications & Compliance */}
        <CertificationsSection />

        {/* 7. Formal RFQ & Contact Center */}
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