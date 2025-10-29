import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import PackageCard from "@/components/packages/PackageCard";
import ItineraryModal from "@/components/packages/ItineraryModal";
import BookingModal from "@/components/booking/BookingModal";
import { packages as demoPackages, Package } from "@/lib/mockData";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Packages = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [filterType, setFilterType] = useState<"All" | "Family" | "Couple" | "Solo">("All");
  const [apiPackages, setApiPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);

  const handleViewDetails = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsItineraryOpen(true);
  };

  const handleBookNow = (pkg: Package) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      const current = encodeURIComponent(window.location.pathname);
      navigate(`/login?redirect=${current}`);
      return;
    }
    setSelectedPackage(pkg);
    setIsBookingOpen(true);
  };

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const API = import.meta.env.VITE_API_URL || "";
        const res = await fetch(`${API}/api/packages`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to fetch packages");
        const mapped: Package[] = (data.packages || []).map((p: any, idx: number) => ({
          id: idx + 1000,
          destination: p.destination,
          duration: p.duration,
          type: p.type,
          price: Number(p.price) || 0,
          image: p.image || "placeholder",
          highlights: Array.isArray(p.highlights) ? p.highlights : [],
          inclusions: Array.isArray(p.inclusions) ? p.inclusions : [],
          excludes: Array.isArray(p.excludes) ? p.excludes : [],
          itinerary: Array.isArray(p.itinerary) ? p.itinerary : [],
        }));
        setApiPackages(mapped);
      } catch (e) {
        // silent; keep demo data as fallback
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const allPackages = apiPackages.length ? apiPackages : demoPackages;

  const filteredPackages = filterType === "All"
    ? allPackages
    : allPackages.filter(pkg => pkg.type === filterType);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-bold md:text-5xl"
          >
            Explore Our Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Handpicked travel experiences from Delhi
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="All" className="w-full" onValueChange={(value) => setFilterType(value as any)}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Family">Family</TabsTrigger>
            <TabsTrigger value="Couple">Couple</TabsTrigger>
            <TabsTrigger value="Solo">Solo</TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      {/* Packages Grid */}
      <section id="packages" className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg) => (
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
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        presetDestination={selectedPackage?.destination}
      />

      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Packages;
