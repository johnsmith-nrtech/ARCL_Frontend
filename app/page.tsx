import type { Metadata } from "next";

// Components
import HeroSection from "@/components/hero";
import TherapistHero from "@/components/TherapistHero";
import WhatWeOffer from "@/components/WhatWeOffer";
import CareHighlights from "@/components/CareHighlights";
import Footer from "@/components/footer";
import AutismStories from "@/components/AutismStories";
import TestimonialSection from "@/components/TestimonialSection";
import ServicesSection from "@/components/ServicesSection";
import ContactUs from "@/components/ContactUs";
import Navbar from "@/components/Navbar";



export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <HeroSection />
      <CareHighlights />
      <TherapistHero />
      <WhatWeOffer />
      <ServicesSection />
      <AutismStories />
      <TestimonialSection />
      <ContactUs id="contact-us" />
      <Footer />
    </main>
  );
}
