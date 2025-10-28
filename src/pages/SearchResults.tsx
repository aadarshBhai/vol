import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import PackageCard from "@/components/packages/PackageCard";
import ItineraryModal from "@/components/packages/ItineraryModal";
import { Button } from "@/components/ui/button";
import { packages as demoPackages, Package } from "@/lib/mockData";

const SearchResults = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const query = (params.get("q") || "").trim();

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [apiPackages, setApiPackages] = useState<Package[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/packages");
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
        // ignore; fall back to demo data
      }
    }
    load();
  }, []);

  const allPackages = apiPackages.length ? apiPackages : demoPackages;

  const results = useMemo(() => {
    if (!query) return [] as Package[];
    const q = query.toLowerCase();
    return allPackages.filter((p) =>
      p.destination.toLowerCase().includes(q)
    );
  }, [allPackages, query]);

  const handleViewDetails = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsItineraryOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 text-3xl font-bold md:text-4xl"
          >
            Search Results
          </motion.h1>
          <p className="text-muted-foreground">Showing trips for: <span className="font-medium">{query || "(no query)"}</span></p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                onViewDetails={handleViewDetails}
                onBookNow={(p) => navigate(`/packages#packages`)}
                highlight={query}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-8 text-center">
            <h2 className="mb-2 text-2xl font-semibold">No matching trips found</h2>
            <p className="mb-6 text-muted-foreground">We can craft a personalized itinerary for you.</p>
            <Button onClick={() => navigate("/plan-trip")}>Customize Your Trip with Us</Button>
          </div>
        )}
      </section>

      <ItineraryModal
        package={selectedPackage}
        isOpen={isItineraryOpen}
        onClose={() => setIsItineraryOpen(false)}
        onBookNow={(p) => navigate(`/packages#packages`)}
      />

      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default SearchResults;
