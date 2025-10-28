import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type BookingFormValues = {
  name: string;
  phone: string;
  destination: string;
  budget: "Under ₹5,000" | "₹5,000 - ₹10,000" | "₹10,000 - ₹20,000" | "Above ₹20,000" | "";
  travelers: number | "";
  tripType: "Family" | "Couple" | "Solo" | "Friends" | "";
  startDate: string;
  endDate: string;
  requests: string;
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetDestination?: string;
}

export default function BookingModal({ isOpen, onClose, presetDestination }: BookingModalProps) {
  const [form, setForm] = useState<BookingFormValues>({
    name: "",
    phone: "",
    destination: "",
    budget: "",
    travelers: "",
    tripType: "",
    startDate: "",
    endDate: "",
    requests: "",
  });

  useEffect(() => {
    if (isOpen) {
      setForm((f) => ({ ...f, destination: presetDestination || f.destination }));
      try {
        const raw = localStorage.getItem("currentUser");
        if (raw) {
          const u = JSON.parse(raw);
          setForm((f) => ({
            ...f,
            name: u?.name || f.name,
            phone: u?.phone || f.phone,
          }));
        }
      } catch {}
    }
  }, [isOpen, presetDestination]);

  const submit = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      const current = encodeURIComponent(window.location.pathname);
      window.location.href = `/login?redirect=${current}`;
      onClose();
      return;
    }
    if (!form.name || !form.phone || !form.destination || !form.travelers || !form.tripType) return;
    const text = encodeURIComponent(
      [
        `New Trip Inquiry`,
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Destination: ${form.destination}`,
        form.budget ? `Budget: ${form.budget}` : "",
        `Travelers: ${form.travelers}`,
        `Trip Type: ${form.tripType}`,
        form.startDate ? `Start: ${form.startDate}` : "",
        form.endDate ? `End: ${form.endDate}` : "",
        form.requests ? `Requests: ${form.requests}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    );
    const phone = "918434903291"; // optional: put your business WhatsApp number here like "919999999999"
    const url = `https://wa.me/${phone}?text=${text}`;
    window.location.href = url;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-[92vw] sm:w-auto max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Plan Your Trip</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="e.g., 9876543210"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Destination *</Label>
            <Input
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              placeholder="e.g., Manali"
            />
          </div>

          <div className="space-y-2">
            <Label>Budget Range</Label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value as BookingFormValues["budget"] })}
            >
              <option value="">Select budget range</option>
              <option value="Under ₹5,000">Under ₹5,000</option>
              <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
              <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
              <option value="Above ₹20,000">Above ₹20,000</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Number of Travelers *</Label>
            <Input
              type="number"
              min={1}
              value={form.travelers as number | ""}
              onChange={(e) => setForm({ ...form, travelers: Number(e.target.value) || "" })}
              placeholder="e.g., 2"
            />
          </div>

          <div className="space-y-2">
            <Label>Trip Type *</Label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.tripType}
              onChange={(e) => setForm({ ...form, tripType: e.target.value as BookingFormValues["tripType"] })}
            >
              <option value="">Select trip type</option>
              <option value="Family">Family</option>
              <option value="Couple">Couple</option>
              <option value="Solo">Solo</option>
              <option value="Friends">Friends</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Special Requests</Label>
            <textarea
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[90px]"
              placeholder="Anything specific you want to include"
              value={form.requests}
              onChange={(e) => setForm({ ...form, requests: e.target.value })}
            />
          </div>

          <Button className="w-full" onClick={submit}>
            Submit & Connect on WhatsApp
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Our team will reach out to you on WhatsApp within 24 hours
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
