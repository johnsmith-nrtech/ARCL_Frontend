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

/* =========================
   SEO METADATA
========================= */

export const metadata: Metadata = {
  title: {
    default: "ARCL",
    template: "%s | Autism Care Center",
  },
  description:
    "We provide professional autism therapy, ABA programs, speech therapy, occupational therapy, and personalized care plans for children and families.",
  keywords: [
    "autism therapy",
    "ABA therapy",
    "speech therapy",
    "occupational therapy",
    "autism care center",
    "child therapy",
    "special needs support",
  ],
  authors: [{ name: "Autism Care Center" }],
  creator: "Autism Care Center",
  publisher: "Autism Care Center",

  metadataBase: new URL("https://www.yourwebsite.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Autism Care & Therapy Center",
    description:
      "Trusted autism therapy center offering ABA, speech & occupational therapy with expert therapists.",
    url: "https://www.yourwebsite.com",
    siteName: "Autism Care Center",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Autism Therapy Center",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Autism Care & Therapy Center",
    description:
      "Expert autism therapy services with compassionate care for children and families.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "Healthcare",
};

/* =========================
   PAGE COMPONENT
========================= */

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
      <ContactUs />
      <Footer />
    </main>
  );
}
