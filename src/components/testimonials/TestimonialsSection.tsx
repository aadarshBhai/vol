import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';
import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/lib/mockData";

const TestimonialsSection = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.review-dropdown') && !target.closest('#review-button')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    const options = document.getElementById('review-options');
    const overlay = document.getElementById('dropdown-overlay');
    if (options && overlay) {
      options.classList.toggle('hidden');
      overlay.classList.toggle('hidden');
    }
  };

  return (
    <>
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-4xl font-bold"
            >
              What Our Travelers Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Real experiences from real travelers
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 pt-8 border-t border-border/20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-primary">500+</div>
                <p className="text-muted-foreground">Happy Travelers</p>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-primary">4.9</div>
                <p className="text-muted-foreground">Google Rating</p>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-primary">98%</div>
                <p className="text-muted-foreground">Satisfaction Rate</p>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <p className="text-muted-foreground">Customer Support</p>
              </div>
            </div>
          </motion.div>

          {/* Share Your Experience section removed as per request */}
        </div>
      </section>

      {/* Click outside to close dropdown */}
      <div 
        id="dropdown-overlay" 
        className="fixed inset-0 z-0 hidden"
        onClick={() => document.getElementById('review-options')?.classList.add('hidden')}
      ></div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .group:focus-within #review-options {
            display: block;
          }
          #dropdown-overlay.active {
            display: block;
          }
        `
      }} />
    </>
  );
};

export default TestimonialsSection;
