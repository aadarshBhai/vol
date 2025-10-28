import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Testimonial } from "@/lib/mockData";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl border border-border bg-card p-6 shadow-lg transition-shadow hover:shadow-xl"
    >
      {/* Rating */}
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < testimonial.rating
                ? "fill-secondary text-secondary"
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>

      {/* Review */}
      <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
        "{testimonial.review}"
      </p>

      {/* Author */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">Trip to {testimonial.tripTo}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          {new Date(testimonial.date).toLocaleDateString("en-IN", {
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
