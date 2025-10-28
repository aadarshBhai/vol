import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const PlanMyTrip = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    origin: "",
    destination: "",
    budget: "",
    travelers: "",
    tripType: "",
    startDate: "",
    endDate: "",
    specialRequests: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.origin || !formData.destination || !formData.travelers || !formData.tripType) {
      toast.error("Please fill in all required fields");
      return;
    }

    const message = encodeURIComponent(
      `Hi Volvoro Team! I'd like to plan a custom trip.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nFrom: ${formData.origin}\nDestination: ${formData.destination}\nBudget: ${formData.budget}\nTravelers: ${formData.travelers}\nTrip Type: ${formData.tripType}\nDates: ${formData.startDate} to ${formData.endDate}\nSpecial Requests: ${formData.specialRequests || "None"}`
    );
    
    window.location.href = `https://api.whatsapp.com/send?phone=918434903291&text=${message}`;
    toast.success("Redirecting to WhatsApp...");
  };

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
            Plan Your Custom Trip
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Tell us your dream destination, and we'll create the perfect itinerary
          </motion.p>
        </div>
      </section>

      {/* Form */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Details */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="e.g., +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Origin */}
            <div className="space-y-2">
              <Label htmlFor="origin">From (Origin) *</Label>
              <Input
                id="origin"
                placeholder="Where are you starting from?"
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                required
              />
            </div>
            {/* Destination */}
            <div className="space-y-2">
              <Label htmlFor="destination">Destination *</Label>
              <Input
                id="destination"
                placeholder="Where do you want to go?"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                required
              />
            </div>

            {/* Budget Range */}
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-5000">Under ₹5,000</SelectItem>
                  <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                  <SelectItem value="10000-20000">₹10,000 - ₹20,000</SelectItem>
                  <SelectItem value="above-20000">Above ₹20,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Number of Travelers */}
            <div className="space-y-2">
              <Label htmlFor="travelers">Number of Travelers *</Label>
              <Input
                id="travelers"
                type="number"
                placeholder="How many people?"
                min="1"
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                required
              />
            </div>

            {/* Trip Type */}
            <div className="space-y-2">
              <Label htmlFor="tripType">Trip Type *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, tripType: value })} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select trip type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Couple">Couple</SelectItem>
                  <SelectItem value="Solo">Solo</SelectItem>
                  <SelectItem value="Friends">Friends</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Travel Dates */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests</Label>
              <Textarea
                id="specialRequests"
                placeholder="Any specific requirements or preferences?"
                rows={4}
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Submit & Connect on WhatsApp
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Our team will reach out to you on WhatsApp within 24 hours
            </p>
          </form>
        </motion.div>
      </section>

      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default PlanMyTrip;
