"use client";

import Image from "next/image";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

export default function TherapistHero() {

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-us");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Desktop & Tablet Hero */}
      <section className="w-full min-h-screen h-200 bg-white flex items-center px-6 md:px-12 lg:px-24 hidden md:flex">
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 md:-ml-15">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              Presidential <span className="text-[#3f1a7b]">Message</span>
            </h1>
            <p className="text-gray-700 text-lg text-justify leading-relaxed max-w-2xl">
              ARCL, founded in 2015, is committed to providing compassionate
              care and support for children with autism. We believe autism is
              not a disease to be cured but a condition to be understood,
              managed, and embraced. Through personalized therapies such as
              speech, physical, and vocational training, we aim to help each
              child reach their full potential.
            </p>

            <p className="text-gray-700 text-lg text-justify leading-relaxed max-w-2xl">
              Inspired by personal experience, our mission extends to creating a residential autism village to
              empower adults with autism, fostering independence and dignity. We
              invite you to support our cause and join us in building a more
              inclusive world for children and families affected by autism.
            </p>

            <div className="pt-6">
              <p className="text-lg text-gray-700 font-medium">Sincerely,</p>
              <p className="text-2xl font-bold text-[#3f1a7b] mt-2">Dr. Ahmad Faraz Bhatti</p>
              <p className="text-lg text-gray-700">President, Autism Resource Centre Lahore</p>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative flex md:-mr-10 justify-center md:justify-end">
            <div className="relative">
              <Image
                src="/message.png"
                alt="Dr. Ahmad Faraz Bhatti - President ARCL"
                width={450}
                height={550}
                className="rounded-lg object-cover shadow-2xl"
                priority
              />

              {/* Social Icons */}
              <div className="absolute top-8 -left-4 flex flex-col gap-3">
                <div className="bg-yellow-400 text-[#3f1a7b] p-3 rounded-full shadow-lg hover:scale-110 transition-transform"><Facebook size={20} /></div>
                <div className="bg-yellow-400 text-[#3f1a7b] p-3 rounded-full shadow-lg hover:scale-110 transition-transform"><Twitter size={20} /></div>
                <div className="bg-yellow-400 text-[#3f1a7b] p-3 rounded-full shadow-lg hover:scale-110 transition-transform"><Linkedin size={20} /></div>
              </div>

              {/* Info Card */}
              <div className="absolute -bottom-14 left-1/4 md:left-1/12 md:-ml-10 -translate-x-1/2 w-80 bg-[#3f1a7b] text-white rounded-2xl p-8 shadow-2xl text-center">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-[#3f1a7b] text-4xl font-bold mb-4 -mt-16 shadow-xl">
                    <Mail size={40} />
                  </div>

                  <h3 className="text-2xl font-bold">Dr. Ahmad Faraz Bhatti</h3>
                  <p className="text-sm opacity-90 mb-6">President & Founder</p>

                  <button
                    onClick={scrollToContact}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#3f1a7b] font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                  >
                    CONTACT US
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Hero */}
      <section className="w-full min-h-screen bg-white flex flex-col items-center px-4 py-10 md:hidden">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Presidential <span className="text-[#3f1a7b]">Message</span>
        </h1>

        <div className="relative mb-6 w-64 h-80">
          <Image
            src="/message.png" 
            alt="Dr. Ahmad Faraz Bhatti - President ARCL"
            fill
            className="object-cover rounded-lg shadow-2xl"
            priority
          />

          <div className="absolute -top-4 right-0 flex flex-row gap-2">
            <div className="bg-yellow-400 text-[#3f1a7b] p-2 rounded-full shadow-lg hover:scale-110 transition-transform"><Facebook size={18} /></div>
            <div className="bg-yellow-400 text-[#3f1a7b] p-2 rounded-full shadow-lg hover:scale-110 transition-transform"><Twitter size={18} /></div>
            <div className="bg-yellow-400 text-[#3f1a7b] p-2 rounded-full shadow-lg hover:scale-110 transition-transform"><Linkedin size={18} /></div>
          </div>
        </div>

        <div className="space-y-4 text-center px-2">
          <p className="text-gray-700 text-justify leading-relaxed">
            ARCL, founded in 2015, provides compassionate care...
          </p>
          <p className="text-gray-700 text-justify leading-relaxed">
            Our mission includes creating a residential autism village...
          </p>

          <div className="pt-4">
            <p className="text-gray-700 text-base font-medium">Sincerely,</p>
            <p className="text-xl font-bold text-[#3f1a7b] mt-1">Dr. Ahmad Faraz Bhatti</p>
            <p className="text-gray-700 text-base">President, Autism Resource Centre Lahore</p>
          </div>
        </div>

        <div className="mt-8 w-72 bg-[#3f1a7b] text-white rounded-2xl p-6 shadow-2xl text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-[#3f1a7b] text-3xl font-bold mb-4 shadow-xl">
              <Mail size={28} />
            </div>

            <h3 className="text-xl font-bold">Dr. Ahmad Faraz Bhatti</h3>
            <p className="text-sm opacity-90 mb-4">President & Founder</p>

            <button
              onClick={scrollToContact}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#3f1a7b] font-bold py-2 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              CONTACT US
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
