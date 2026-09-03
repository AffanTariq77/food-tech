import { lazy } from "react";
import HeroSection from "@/components/foodtech/HeroSection";
import SectionBoundary from "@/components/foodtech/SectionBoundary";
import SiteNav from "@/components/foodtech/SiteNav";
import TechMarquee from "@/components/foodtech/TechMarquee";
import WhatWeDoSection from "@/components/foodtech/WhatWeDoSection";

// Below-the-fold sections are split out of the initial bundle
const MathSection = lazy(() => import("@/components/foodtech/MathSection"));
const FourGapsSection = lazy(() => import("@/components/foodtech/FourGapsSection"));
const WhatWeBuildSection = lazy(() => import("@/components/foodtech/WhatWeBuildSection"));
const ExistingSystemSection = lazy(() => import("@/components/foodtech/ExistingSystemSection"));
const AIUsefulSection = lazy(() => import("@/components/foodtech/AIUsefulSection"));
const MarketKnowledgeSection = lazy(() => import("@/components/foodtech/MarketKnowledgeSection"));
const ProcessSection = lazy(() => import("@/components/foodtech/ProcessSection"));
const FAQSection = lazy(() => import("@/components/foodtech/FAQSection"));
const ContactSection = lazy(() => import("@/components/foodtech/ContactSection"));
const SiteFooter = lazy(() => import("@/components/foodtech/SiteFooter"));
const ChatWidget = lazy(() => import("@/components/foodtech/ChatWidget"));
const NewsletterPopup = lazy(() => import("@/components/foodtech/NewsletterPopup"));

const SectionFallback = () => <div className="h-64 border-b ab-hairline bg-panel/40" aria-hidden="true" />;

const Index = () => (
  <div className="min-h-screen overflow-x-hidden bg-background">
    <SiteNav />
    <main>
      <HeroSection />
      <TechMarquee />
      <WhatWeDoSection />

      <SectionBoundary fallback={<SectionFallback />}>
        <MathSection />
      </SectionBoundary>

      <SectionBoundary fallback={<SectionFallback />}>
        <FourGapsSection />
      </SectionBoundary>

      <SectionBoundary fallback={<SectionFallback />}>
        <WhatWeBuildSection />
      </SectionBoundary>

      <SectionBoundary fallback={<SectionFallback />}>
        <ExistingSystemSection />
      </SectionBoundary>

      <SectionBoundary fallback={<SectionFallback />}>
        <AIUsefulSection />
      </SectionBoundary>

      <SectionBoundary fallback={<SectionFallback />}>
        <MarketKnowledgeSection />
      </SectionBoundary>

      <SectionBoundary fallback={<SectionFallback />}>
        <ProcessSection />
      </SectionBoundary>

      <SectionBoundary fallback={<SectionFallback />}>
        <FAQSection />
      </SectionBoundary>

      <SectionBoundary fallback={<SectionFallback />}>
        <ContactSection />
      </SectionBoundary>
    </main>

    <SectionBoundary fallback={<SectionFallback />}>
      <SiteFooter />
    </SectionBoundary>

    <SectionBoundary fallback={null}>
      <ChatWidget />
    </SectionBoundary>
    <SectionBoundary fallback={null}>
      <NewsletterPopup />
    </SectionBoundary>
  </div>
);

export default Index;
