"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { User } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const testimonials = [
  {
    name: "Dr. Ayesha Tahir",
    role: "Parent",
    message:
      "My son was diagnosed with ASD at 2.7 years. After 2.5 years of early intervention, he moved to ARCL. It has been 7 months since joining, and I am truly impressed with the therapists' dedication to improving his progress. Alhamdulillah, I have full trust in the ARCL team, and I’m confident we’ll reach our goal of inclusion. Best of luck, ARCL!",
    img: "/femaledr.jpg",
  },
  {
    name: "Ms. Naila Adil",
    role: "Parent",
    message:
      "My son was diagnosed with CP at 1 year old. Initially, we sought therapies from various centers. By the age of 4-5, I felt the need for schooling alongside therapy and found ARCL. He’s been attending since he was 5, and now at 7.9, his progress is remarkable.",
    img: "/femaledr.jpg",
  },
  {
    name: "Dr. Irfan Saleem",
    role: "Parent",
    message:
      "Autism doesn't come with a manual; it comes with a patient family and competent therapists who never give up. My son Usman was diagnosed with ASD in 2010. We joined ARCL in 2017, and the team has been amazing.",
    img: "/maledr.jpg",
  },
  {
    name: "Dr. Raazia Altaf",
    role: "Parent",
    message:
      "My son was diagnosed with CP at 1 year old. ARCL’s team worked tirelessly, and he is about to join a regular school. I am deeply grateful for their efforts.",
    img: "/femaledr.jpg",
  },
];

export default function TestimonialSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-16 bg-[#f4f1ff] text-center overflow-hidden">

      {/* ================= HEADING ================= */}
      <p className="text-lg">Happiness Worldwide</p>
      <h2 className="text-4xl font-bold text-[#2a1a7b] mt-2">
        Autism Testimonials
      </h2>

      {/* ================= DESKTOP / TABLET SLIDER ================= */}
      <div className="hidden md:block mt-12 max-w-6xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((t, index) => (
            <div key={index} className="px-4">
              <div className="bg-white rounded-xl p-6 relative shadow-md h-[400px] flex flex-col">

                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden">
                  {t.img ? (
                    <Image
                      src={t.img}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <User className="w-10 h-10 text-gray-400" />
                  )}
                </div>

                <div className="mt-12 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-[#2a1a7b]">
                      {t.name}
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                      {t.message}
                    </p>
                  </div>
                  <p className="mt-4 font-semibold text-[#2a1a7b]">
                    {t.role}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* ================= MOBILE VIEW (NO SLIDER) ================= */}
      <div className="md:hidden mt-12 max-w-xl mx-auto px-4 space-y-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 relative shadow-md"
          >
            <div className="w-20 h-20 mx-auto -mt-12 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden relative">
              {t.img ? (
                <Image
                  src={t.img}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <User className="w-10 h-10 text-gray-400 mx-auto mt-5" />
              )}
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-lg text-[#2a1a7b]">
                {t.name}
              </h3>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                {t.message}
              </p>
              <p className="mt-4 font-semibold text-[#2a1a7b]">
                {t.role}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
