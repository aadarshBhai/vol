import { motion } from "framer-motion";
import { Calendar, Users, MapPin, MessageCircle, Info, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package } from "@/lib/mockData";

interface PackageCardProps {
  package: Package;
  onViewDetails: (pkg: Package) => void;
  onBookNow: (pkg: Package) => void;
  highlight?: string;
}

const PackageCard = ({ package: pkg, onViewDetails, onBookNow, highlight }: PackageCardProps) => {
  const highlightText = (text: string) => {
    const q = (highlight || "").trim();
    if (!q) return text;
    try {
      const re = new RegExp(`(${q.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")})`, "ig");
      return (
        <>
          {text.split(re).map((part, i) =>
            re.test(part) ? (
              <mark key={i} className="bg-yellow-200 text-foreground px-0.5 rounded">
                {part}
              </mark>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </>
      );
    } catch {
      return text;
    }
  };

  const handleWhatsAppEnquiry = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${pkg.destination} ${pkg.duration} package for ${pkg.type} travelers.`
    );
    window.location.href = `https://api.whatsapp.com/send?phone=918434903291&text=${message}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
      style={{ borderRadius: '12px' }}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={(pkg.image?.startsWith("http") || pkg.image?.startsWith("data:")) ? pkg.image : `/images/destinations/${pkg.image}.jpg`}
          alt={pkg.destination}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800";
          }}
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary text-primary-foreground">
            {pkg.type}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-bold text-foreground">{highlightText(pkg.destination)}</h3>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {pkg.duration}
            </span>
            <div className="absolute bottom-4 left-4 flex items-center text-white">
              <MapPin className="mr-1 h-4 w-4" />
              <span className="text-sm font-medium drop-shadow-md">{pkg.destination}</span>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div>
          <p className="text-sm font-semibold text-foreground">Highlights:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {pkg.highlights.slice(0, 3).map((h, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {highlight ? <span>{highlightText(h)}</span> : h}
              </Badge>
            ))}
            {pkg.highlights.length > 3 && (
              <div 
                className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground select-none cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  // Show all highlights in an alert or modal
                  alert(`All highlights:\n• ${pkg.highlights.join('\n• ')}`);
                }}
              >
                +{pkg.highlights.length - 3} more
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        {/* Price and Actions */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-xl font-bold text-foreground">₹{pkg.price.toLocaleString()}</p>
          </div>
          <div className="flex flex-col gap-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="w-full border-primary/20 bg-transparent hover:bg-primary/5 group"
                onClick={() => onViewDetails(pkg)}
              >
                <span className="flex items-center justify-center">
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <Button
                className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:from-[#128C7E] hover:to-[#075E54]"
                onClick={handleWhatsAppEnquiry}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Get Plan on WhatsApp
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;
