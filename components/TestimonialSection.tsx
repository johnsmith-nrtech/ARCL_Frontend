"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { User, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  message: string;
  image?: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const Arrow = ({ onClick, direction }: any) => (
  <button
    aria-label={direction === "left" ? "Previous testimonial" : "Next testimonial"}
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full 
      ${direction === "left" ? "-left-6" : "-right-6"}`}
  >
    {direction === "left" ? (
      <ChevronLeft className="w-5 h-5 text-[#2a1a7b]" />
    ) : (
      <ChevronRight className="w-5 h-5 text-[#2a1a7b]" />
    )}
  </button>
);

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_URL}/api/testimonials`, { cache: "no-store" });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch testimonials");

        setTestimonials(data);
      } catch (err: any) {
        setError(err.message || "Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <Arrow direction="left" />,
    nextArrow: <Arrow direction="right" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  if (loading) return <p className="text-center py-12 text-gray-500">Loading testimonials...</p>;
  if (error) return <p className="text-center py-12 text-red-600">{error}</p>;

  return (
    <section className="py-16 bg-[#f4f1ff] text-center overflow-hidden">
      <p className="text-lg text-gray-600">Happiness Worldwide</p>
      <h2 className="text-4xl font-bold text-[#2a1a7b] mt-2">Autism Testimonials</h2>

      {/* DESKTOP / TABLET */}
      <div className="hidden md:block mt-12 max-w-6xl mx-auto relative">
        <Slider {...settings}>
          {testimonials.map((t) => (
            <div key={t._id} className="px-4">
              <div className="bg-white rounded-xl p-6 shadow-md h-[420px] flex flex-col relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden">
                  {t.image ? (
                    <Image
                      src={`${API_URL}${t.image}`}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                      unoptimized
                    />
                  ) : (
                    <User className="w-10 h-10 text-gray-400 mx-auto mt-5" />
                  )}
                </div>

                <div className="mt-12 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-[#2a1a7b]">{t.name}</h3>
                    <p className="text-gray-600 mt-3 text-sm leading-relaxed">{t.message}</p>
                  </div>
                  <p className="mt-4 font-semibold text-[#2a1a7b]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* MOBILE */}
      <div className="md:hidden mt-12 max-w-xl mx-auto px-4 space-y-8">
        {testimonials.map((t) => (
          <div key={t._id} className="bg-white rounded-xl p-6 shadow-md relative">
            <div className="w-20 h-20 mx-auto -mt-12 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden relative">
              {t.image ? (
                <Image
                  src={`${API_URL}${t.image}`}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                  unoptimized
                />
              ) : (
                <User className="w-10 h-10 text-gray-400 mx-auto mt-5" />
              )}
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-lg text-[#2a1a7b]">{t.name}</h3>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">{t.message}</p>
              <p className="mt-4 font-semibold text-[#2a1a7b]">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
