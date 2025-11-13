import { motion } from "framer-motion";

// Import local destination images
import manaliImage from "@/assets/destinations/manali.jpg";
import shimlaImage from "@/assets/destinations/shimla.jpg";
import jaisalmerImage from "@/assets/destinations/jaisalmer.jpg";
import udaipurImage from "@/assets/destinations/udaipur.jpg";
import mussoorieImage from "@/assets/destinations/mussoorie.jpg";
import choptaImage from "@/assets/destinations/chopta.jpg";

const GallerySection = () => {
  const galleryImages = [
    {
      id: 1,
      src: manaliImage,
      alt: "Manali Valley",
      title: "Manali Valley",
      highlights: ["Solang Valley", "Rohtang Pass", "Old Manali"]
    },
    {
      id: 2,
      src: shimlaImage,
      alt: "Shimla",
      title: "Shimla",
      highlights: ["Mall Road", "Kufri", "Jakhoo Temple"]
    },
    {
      id: 3,
      src: jaisalmerImage,
      alt: "Jaisalmer",
      title: "Jaisalmer",
      highlights: ["Golden Fort", "Desert Safari", "Sam Sand Dunes"]
    },
    {
      id: 4,
      src: udaipurImage,
      alt: "Udaipur",
      title: "Udaipur",
      highlights: ["City Palace", "Lake Pichola", "Jag Mandir"]
    },
    {
      id: 5,
      src: mussoorieImage,
      alt: "Mussoorie",
      title: "Mussoorie",
      highlights: ["Kempty Falls", "Mall Road", "Gun Hill"]
    },
    {
      id: 6,
      src: choptaImage,
      alt: "Chopta",
      title: "Chopta",
      highlights: ["Tungnath Trek", "Chandrashila", "Deoria Tal"]
    }
  ];

  return (
    <section id="gallery" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Gallery & Experiences
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover breathtaking moments and unforgettable experiences from our travelers' journeys
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(index * 0.1, 0.5), duration: 0.5 }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                    <div className="space-y-1">
                      {image.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center text-sm text-white/90">
                          <svg className="w-3 h-3 mr-2 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
