"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { Book, HeartHandshake, Users, DollarSign, Home, Users2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Interface matching your backend Service model
interface Service {
  _id: string;
  mainTitle: string;
  url: string;
  sections: Array<{
    header: string;
    description: string;
    hasList: boolean;
    listItems: string[];
  }>;
  status: "Active" | "Inactive";
  role: "Admin" | "Services" | "Parent";
}

// Map service titles to icons (for existing services)
const iconMap: Record<string, React.ReactNode> = {
  "Specialized Education": <Book className="w-12 h-12 text-white" />,
  "Therapeutic Support": <HeartHandshake className="w-12 h-12 text-white" />,
  "Parent Training": <Users className="w-12 h-12 text-white" />,
  "Financial Assistance": <DollarSign className="w-12 h-12 text-white" />,
  "Home Services": <Home className="w-12 h-12 text-white" />,
  "Social Skills Development": <Users2 className="w-12 h-12 text-white" />,
};

// Map service titles to colors (for existing services)
const colorMap: Record<string, string> = {
  "Specialized Education": "bg-purple-700",
  "Therapeutic Support": "bg-pink-500",
  "Parent Training": "bg-indigo-600",
  "Financial Assistance": "bg-green-600",
  "Home Services": "bg-yellow-500",
  "Social Skills Development": "bg-red-500",
};

// Fallback icons and colors for new services
const fallbackIcons = [Book, HeartHandshake, Users, DollarSign, Home, Users2];
const fallbackColors = [
  "bg-purple-700",
  "bg-pink-500",
  "bg-indigo-600",
  "bg-green-600",
  "bg-yellow-500",
  "bg-red-500",
  "bg-blue-600",
  "bg-teal-500",
  "bg-orange-500",
  "bg-cyan-500",
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const API_URL = process.env.NEXT_PUBLIC_API_URL!;


  // Fetch services from backend API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/services`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch services: ${res.status}`);
        }
        
        const data: Service[] = await res.json();
        
        // Filter only active services for public display
        const activeServices = data.filter(service => service.status === "Active");
        setServices(activeServices);
        
      } catch (err: any) {
        console.error("Error fetching services:", err);
        setError(err.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Function to get icon for a service
  const getServiceIcon = (serviceTitle: string, index: number): React.ReactNode => {
    if (iconMap[serviceTitle]) {
      return iconMap[serviceTitle];
    }
    // Use fallback icon based on index
    const FallbackIcon = fallbackIcons[index % fallbackIcons.length];
    return <FallbackIcon className="w-12 h-12 text-white" />;
  };

  // Function to get color for a service
  const getServiceColor = (serviceTitle: string, index: number): string => {
    if (colorMap[serviceTitle]) {
      return colorMap[serviceTitle];
    }
    // Use fallback color based on index
    return fallbackColors[index % fallbackColors.length];
  };

  // Function to get description from service sections
  const getServiceDescription = (service: Service): string => {
    // Use the first section's description, or fallback text
    if (service.sections && service.sections.length > 0 && service.sections[0].description) {
      return service.sections[0].description;
    }
    return "Comprehensive program designed to support and enhance development.";
  };

  if (loading) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <Navbar />
        <section className="relative bg-linear-to-b from-[#3f1a7b] to-[#3f1a7b] py-48 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-6xl font-hand font-bold text-white mb-4">
              Our Services
            </h1>
          </div>
        </section>
        <section className="py-24 px-6 max-w-7xl mx-auto text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-700 mx-auto mb-4" />
          <p className="text-gray-600">Loading services...</p>
        </section>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <Navbar />
        <section className="relative bg-linear-to-b from-[#3f1a7b] to-[#3f1a7b] py-48 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-6xl font-hand font-bold text-white mb-4">
              Our Services
            </h1>
          </div>
        </section>
        <section className="py-24 px-6 max-w-7xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-2xl mx-auto">
            <p className="text-red-600 mb-4">Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* HERO */}
      <section className="relative bg-linear-to-b from-[#3f1a7b] to-[#3f1a7b] py-48 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-hand font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-yellow-300 max-w-2xl mx-auto">
            Comprehensive programs and support to help children thrive.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-purple-700 mb-2 uppercase tracking-wide">
            What We Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Our Specialized Services
          </h2>
          <p className="text-gray-600 text-lg">
            We provide comprehensive services designed to support children and families through every stage of care and development.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No services available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service._id}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-start gap-6 group"
              >
                {/* ICON */}
                <div
                  className={`p-5 rounded-xl ${getServiceColor(service.mainTitle, index)} flex items-center justify-center text-white text-3xl transition-transform duration-300 group-hover:scale-110`}
                >
                  {getServiceIcon(service.mainTitle, index)}
                </div>

                {/* TITLE & DESCRIPTION */}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                  {service.mainTitle}
                </h3>
                <p className="text-gray-600 text-sm">{getServiceDescription(service)}</p>

                {/* CTA Button */}
                <Link
                  href={service.url || `/services/${service.mainTitle.toLowerCase().replace(/\s+/g, '-')}`}
                  className="mt-auto px-5 py-2 rounded-xl bg-purple-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:bg-purple-800 text-center w-full"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}