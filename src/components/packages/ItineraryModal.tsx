import { X, Check, XCircle } from "lucide-react";
import { Package } from "@/lib/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ItineraryModalProps {
  package: Package | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (pkg: Package) => void;
}

const ItineraryModal = ({ package: pkg, isOpen, onClose, onBookNow }: ItineraryModalProps) => {
  if (!pkg) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{pkg.destination} - {pkg.duration}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Overview */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{pkg.type} Package</Badge>
                <Badge variant="outline">₹{pkg.price.toLocaleString()}</Badge>
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Day-wise Itinerary</h3>
              <div className="space-y-4">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="border-l-2 border-primary pl-4 pb-4">
                    <h4 className="font-semibold text-primary">
                      Day {day.day}: {day.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                Inclusions
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {pkg.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            {pkg.excludes && pkg.excludes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                  Exclusions
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {pkg.excludes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Book Now Button */}
            <div className="flex gap-2 pt-4 border-t">
              <button
                onClick={() => {
                  onBookNow(pkg);
                  onClose();
                }}
                className="flex-1 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Book Now - ₹{pkg.price.toLocaleString()}
              </button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ItineraryModal;
