import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Hero from "@/components/home/Hero";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import TeamSection from "@/components/home/TeamSection";
import GallerySection from "@/components/home/GallerySection";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import BookingForm from "@/components/booking/BookingForm";
import PackageCard from "@/components/packages/PackageCard";
import ItineraryModal from "@/components/packages/ItineraryModal";
import { packages, Package } from "@/lib/mockData";
import { motion } from "framer-motion";

const Index = () => {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const handleViewDetails = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsItineraryOpen(true);
  };

  const handleBookNow = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsPaymentOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. Hero Section */}
      <Hero />
      
      {/* 2. Featured Destinations */}
      <FeaturedDestinations />
      
      {/* 3. About Us (Team) */}
      <TeamSection />
      
      {/* 4. Why Choose Us */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Why Choose Us
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience travel planning at its finest with our exceptional services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '24/7',
                title: "24/7 Customer Support",
                description: "Round-the-clock assistance for all your travel needs, anytime, anywhere."
              },
              {
                icon: '✈️',
                title: "Customized Packages",
                description: "Tailor-made itineraries designed specifically for your preferences and budget."
              },
              {
                icon: '🏨',
                title: "Verified Partners",
                description: "Carefully vetted hotels and transportation for your peace of mind."
              },
              {
                icon: '💰',
                title: "Transparent Pricing",
                description: "No hidden fees or surprise charges - what you see is what you pay."
              },
              {
                icon: '🔍',
                title: "No Hidden Charges",
                description: "Complete cost breakdown before you book, guaranteed."
              },
              {
                icon: '⭐',
                title: "98-100% Satisfaction",
                description: "Consistently high ratings from thousands of happy travelers."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 5. Gallery & Experiences */}
      <GallerySection />
      
      {/* 6. Trust & Reviews (Testimonials) */}
      <TestimonialsSection />
      {/* Modals */}
      <ItineraryModal
        package={selectedPackage}
        isOpen={isItineraryOpen}
        onClose={() => setIsItineraryOpen(false)}
        onBookNow={handleBookNow}
      />
      
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Index;
