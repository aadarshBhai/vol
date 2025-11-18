import { motion } from "framer-motion";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative h-[600px] w-full overflow-hidden select-none">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Premium Travel Destinations"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/50" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex h-full items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl font-bold leading-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl"
          >
            Travel, Redefined
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl text-xl font-light leading-relaxed text-gray-100 drop-shadow-md md:text-2xl"
          >
            Effortless, Authentic, and Unforgettable Journeys from Delhi.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-6"
          >
            <motion.a 
              href="https://volvorotourexplorer.com/packages"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-teal-700 hover:shadow-xl"
            >
              Explore Packages
            </motion.a>
            <motion.a 
              href="/StartBooking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center rounded-lg border-2 border-teal-600 bg-white px-8 py-4 text-lg font-semibold text-teal-600 transition-all hover:bg-gray-50"
            >
              Plan My Trip
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
