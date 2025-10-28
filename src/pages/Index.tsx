import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/home/SearchBar";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import PackageCard from "@/components/packages/PackageCard";
import ItineraryModal from "@/components/packages/ItineraryModal";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
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
      
      {/* Search Bar */}
      <SearchBar />
      
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
      
      {/* Testimonials */}
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
