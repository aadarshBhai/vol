import { motion } from "framer-motion";
import { Calendar, Users, MapPin, MessageCircle, Info } from "lucide-react";
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
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all hover:shadow-2xl"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={(pkg.image?.startsWith("http") || pkg.image?.startsWith("data:")) ? pkg.image : `/src/assets/destinations/${pkg.image}.jpg`}
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
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {pkg.type}
            </span>
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
              <Badge variant="outline" className="text-xs">
                +{pkg.highlights.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-3xl font-bold text-primary">₹{pkg.price.toLocaleString()}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(pkg)}
            className="w-full"
          >
            <Info className="mr-2 h-4 w-4" />
            Details
          </Button>
          <Button
            size="sm"
            onClick={() => onBookNow(pkg)}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Book Now
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleWhatsAppEnquiry}
          className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Enquiry on WhatsApp
        </Button>
      </div>
    </motion.div>
  );
};

export default PackageCard;
