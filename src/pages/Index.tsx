import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Hero from "@/components/home/Hero";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import BookingForm from "@/components/booking/BookingForm";
import PackageCard from "@/components/packages/PackageCard";
import ItineraryModal from "@/components/packages/ItineraryModal";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import TeamSection from "@/components/home/TeamSection";
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
      
      {/* Hero Section */}
      <Hero />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Team Section */}
      <TeamSection />
      
      {/* Booking Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Start Your Dream Trip
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Book your perfect getaway in just a few simple steps
          </motion.p>
        </div>
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <BookingForm />
          </motion.div>
        </div>
      </section>
      
      {/* Featured Destinations */}
      <FeaturedDestinations />
      
      {/* Featured Packages */}
      <section id="packages" className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-4xl font-bold"
          >
            Popular Packages
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Curated experiences for every type of traveler
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packages.slice(0, 6).map((pkg) => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              onViewDetails={handleViewDetails}
              onBookNow={handleBookNow}
            />
          ))}
        </div>
      </section>
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
