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
      
      {/* Meet Our Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our dedicated team of travel enthusiasts and experts work tirelessly to create unforgettable experiences for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Founder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20">
                <img 
                  src="/images/destinations/ayush.jpg" 
                  alt="Ayush Singh"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgZmlsbD0iI2QwZDRlYSI+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSI0OHB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iMDAwMDAwIj5BUzwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Ayush Singh</h3>
              <p className="text-sm text-primary mb-3 font-medium">Founder</p>
              <p className="text-sm text-muted-foreground text-justify">
                The visionary force behind Volvoro Tour Explorer. His passion for exploring the world through travel inspired the creation of a brand built on trust, experience, and excellence. With a deep understanding of the travel industry, Ayush leads the company with innovation, personalized service, and a commitment to creating unforgettable journeys for every traveler.
              </p>
            </motion.div>

            {/* CEO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20 relative">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full">
                    <img 
                      src="/images/destinations/puja.jpg" 
                      alt="Puja Singh"
                      className="absolute top-1/2 left-1/2 w-auto h-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
                      style={{ objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgZmlsbD0iI2QwZDRlYSI+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSI0OHB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iMDAwMDAwIj5QPC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">Puja Singh</h3>
              <p className="text-sm text-primary mb-3 font-medium">CEO</p>
              <p className="text-sm text-muted-foreground text-justify">
                Serves as the CEO of Volvoro Tour Explorer, guiding the company's strategic direction with expertise and precision. She focuses on key decisions, customer relationships, and maintaining Volvoro's standards of professionalism and reliability. Her leadership combines insight with dedication, ensuring that every journey reflects the brand's promise of quality and care.
              </p>
            </motion.div>

            {/* MD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-36 h-36 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center text-4xl font-bold text-primary">
                AU
              </div>
              <h3 className="text-xl font-semibold mb-1">Abhijeet Upadhyay</h3>
              <p className="text-sm text-primary mb-3 font-medium">Managing Director</p>
              <p className="text-sm text-muted-foreground text-justify">
                The Managing Director at Volvoro Tour Explorer, responsible for finance, marketing, and booking coordination. With his sharp operational sense and strong leadership, he ensures that every process — from tour planning to execution — runs efficiently. His commitment to excellence keeps Volvoro organized, dependable, and client-focused.
              </p>
            </motion.div>

            {/* Tech Head */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/20">
                <img 
                  src="/images/destinations/aadarsh.jpg" 
                  alt="Aadarsh Kumar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCIgZmlsbD0iI2QwZDRlYSI+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIGZpbGw9IiNlZWUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSI0OHB4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iMDAwMDAwIj5BSzwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Aadarsh Kumar</h3>
              <p className="text-sm text-primary mb-3 font-medium">Head of Technology</p>
              <p className="text-sm text-muted-foreground text-justify">
                The Head of Technology at Volvoro Tour Explorer, managing the website, digital systems, and all tech-related operations. His technical expertise ensures a smooth, secure, and user-friendly online experience for every customer. Adarsh's innovative approach keeps Volvoro ahead in digital performance and customer convenience.
              </p>
            </motion.div>
          </div>
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
