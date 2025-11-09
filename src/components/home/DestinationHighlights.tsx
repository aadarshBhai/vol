import { motion } from 'framer-motion';

const DestinationHighlights = () => {
  // Note: Replace these placeholder images with your actual destination images
// These are just for demonstration purposes
const destinations = [
    {
      id: 1,
      name: 'Manali',
      image: 'https://source.unsplash.com/random/600x800/?manali,hillstation',
      alt: 'Manali - A beautiful hill station in the Himalayas',
      delay: 0.2
    },
    {
      id: 2,
      name: 'Kashmir',
      image: 'https://source.unsplash.com/random/600x800/?kashmir,valley',
      alt: 'Kashmir - The paradise on Earth',
      delay: 0.3
    },
    {
      id: 3,
      name: 'Ladakh',
      image: 'https://source.unsplash.com/random/600x800/?ladakh,mountains',
      alt: 'Ladakh - The land of high passes',
      delay: 0.4
    }
  ];

  return (
    <div className="container mx-auto px-4 -mt-24 mb-8 relative z-10">
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 lg:gap-8">
        {destinations.map((destination, index) => (
          <motion.div
            key={destination.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: destination.delay,
              type: 'spring',
              stiffness: 100
            }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className={`relative group cursor-pointer ${index !== destinations.length - 1 ? 'md:mb-0' : ''}`}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl h-48 md:h-64 w-full">
              <img
                src={destination.image}
                alt={destination.alt}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNDAwIDUwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y1ZjVmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjRweCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiM2YzcyOGIiPntkZXN0aW5hdGlvbi5uYW1lfTwvdGV4dD48L3N2Zz4='.replace('{destination.name}', destination.name);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-2xl" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-bold text-white">{destination.name}</h3>
                <div className="w-12 h-1 bg-primary mt-2 mb-3 rounded-full"></div>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="text-white text-sm font-medium flex items-center group-hover:text-primary transition-colors"
                >
                  Explore {destination.name}
                  <svg 
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </div>
            </div>
            
            {/* Connection line for desktop view */}
            {index < destinations.length - 1 && (
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-primary/50 to-primary/10"></div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DestinationHighlights;
