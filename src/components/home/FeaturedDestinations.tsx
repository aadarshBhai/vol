import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import manaliImg from "@/assets/destinations/manali.jpg";
import shimlaImg from "@/assets/destinations/shimla.jpg";
import jaisalmerImg from "@/assets/destinations/jaisalmer.jpg";
import udaipurImg from "@/assets/destinations/udaipur.jpg";
import mussoorieImg from "@/assets/destinations/mussoorie.jpg";
import choptaImg from "@/assets/destinations/chopta.jpg";

const destinations = [
  { name: "Manali", image: manaliImg, price: "₹5,000" },
  { name: "Shimla", image: shimlaImg, price: "₹4,000" },
  { name: "Jaisalmer", image: jaisalmerImg, price: "₹8,500" },
  { name: "Udaipur", image: udaipurImg, price: "₹6,000" },
  { name: "Mussoorie", image: mussoorieImg, price: "₹3,500" },
  { name: "Chopta", image: choptaImg, price: "₹7,000" },
];

const FeaturedDestinations = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-4xl font-bold"
        >
          Featured Destinations
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground"
        >
          Discover handpicked travel experiences starting from Delhi
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination, index) => (
          <motion.div
            key={destination.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-2xl"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={destination.image}
                alt={destination.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="mb-2 text-2xl font-bold">{destination.name}</h3>
              <p className="mb-4 text-sm">Starting from {destination.price}</p>
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-secondary"
              >
                View Packages <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link to="/packages">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-shadow hover:shadow-xl"
          >
            View All Packages
          </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
