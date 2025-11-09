import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, Heart, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Sample data - replace with your actual data source
const popularDestinations = [
  {
    id: 1,
    name: "Manali",
    location: "Himachal Pradesh, India",
    image: "/images/manali.jpg",
    rating: 4.8,
    reviews: 1243,
    price: "₹12,999"
  },
  {
    id: 2,
    name: "Goa",
    location: "Goa, India",
    image: "/images/goa.jpg",
    rating: 4.7,
    reviews: 2156,
    price: "₹9,999"
  },
  {
    id: 3,
    name: "Shimla",
    location: "Himachal Pradesh, India",
    image: "/images/shimla.jpg",
    rating: 4.6,
    reviews: 987,
    price: "₹10,499"
  },
  {
    id: 4,
    name: "Rajasthan",
    location: "Rajasthan, India",
    image: "/images/rajasthan.jpg",
    rating: 4.9,
    reviews: 1789,
    price: "₹14,999"
  },
  {
    id: 5,
    name: "Kerala",
    location: "Kerala, India",
    image: "/images/kerala.jpg",
    rating: 4.8,
    reviews: 2345,
    price: "₹16,499"
  },
  {
    id: 6,
    name: "Ladakh",
    location: "Ladakh, India",
    image: "/images/ladakh.jpg",
    rating: 4.9,
    reviews: 1987,
    price: "₹21,999"
  },
];

const categories = [
  { id: 1, name: "All", icon: "🌍" },
  { id: 2, name: "Beaches", icon: "🏖️" },
  { id: 3, name: "Mountains", icon: "⛰️" },
  { id: 4, name: "Heritage", icon: "🏛️" },
  { id: 5, name: "Adventure", icon: "🧗" },
  { id: 6, name: "Honeymoon", icon: "💑" },
];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    duration: "",
    rating: 0,
    sortBy: "popularity",
    amenities: [] as string[]
  });
  const navigate = useNavigate();

  // Available filter options
  const durationOptions = [
    { value: "", label: "Any Duration" },
    { value: "weekend", label: "Weekend Getaway" },
    { value: "3-5", label: "3-5 Days" },
    { value: "week", label: "1 Week" },
    { value: "10+", label: "10+ Days" }
  ];

  const ratingOptions = [
    { value: 0, label: "Any Rating" },
    { value: 4, label: "4+ Stars" },
    { value: 4.5, label: "4.5+ Stars" },
    { value: 5, label: "5 Stars Only" }
  ];

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
    { value: "duration", label: "Duration" }
  ];

  const amenitiesOptions = [
    { id: "breakfast", label: "Breakfast Included" },
    { id: "wifi", label: "Free WiFi" },
    { id: "pool", label: "Swimming Pool" },
    { id: "parking", label: "Free Parking" },
    { id: "ac", label: "Air Conditioning" },
    { id: "gym", label: "Gym" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search parameters
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (activeCategory > 1) params.set("category", categories[activeCategory - 1].name.toLowerCase());
    
    // Add filters to URL
    if (filters.priceRange[0] > 0) params.set("minPrice", filters.priceRange[0].toString());
    if (filters.priceRange[1] < 50000) params.set("maxPrice", filters.priceRange[1].toString());
    if (filters.duration) params.set("duration", filters.duration);
    if (filters.rating > 0) params.set("minRating", filters.rating.toString());
    if (filters.sortBy !== "popularity") params.set("sortBy", filters.sortBy);
    if (filters.amenities.length > 0) params.set("amenities", filters.amenities.join(","));
    
    navigate(`/search?${params.toString()}`);
  };

  const toggleAmenity = (amenityId: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  // Load initial filters from URL
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    
    setFilters({
      priceRange: [
        params.minPrice ? parseInt(params.minPrice) : 0,
        params.maxPrice ? parseInt(params.maxPrice) : 50000
      ],
      duration: params.duration || "",
      rating: params.minRating ? parseFloat(params.minRating) : 0,
      sortBy: params.sortBy || "popularity",
      amenities: params.amenities ? params.amenities.split(",") : []
    });
    
    if (params.q) setSearchQuery(params.q);
    if (params.category) {
      const categoryIndex = categories.findIndex(
        cat => cat.name.toLowerCase() === params.category
      );
      if (categoryIndex !== -1) setActiveCategory(categoryIndex + 1);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Search */}
      <div className="relative bg-gradient-to-r from-primary/5 to-secondary/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center"
            >
              Discover Your Next Adventure
            </motion.h1>
            
            <motion.form 
              onSubmit={handleSearch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a destination or activity..."
                  className="w-full pl-12 pr-6 py-3 rounded-full border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-1.5 rounded-full font-medium transition-colors text-sm"
                >
                  Search
                </button>
              </div>
              
              {/* Filter Toggle */}
              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Filter by:</span>
                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-1 text-foreground hover:text-primary"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span>Filters</span>
                    {showFilters ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    className="bg-transparent border-0 text-sm font-medium text-foreground focus:outline-none focus:ring-0 p-0"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Filters Panel */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 p-4 bg-background border border-border rounded-xl shadow-sm"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {/* Price Range */}
                      <div>
                            <h3 className="font-medium mb-2">Price Range</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm text-muted-foreground">
                                <span>₹{filters.priceRange[0].toLocaleString()}</span>
                                <span>₹{filters.priceRange[1].toLocaleString()}+</span>
                              </div>
                              <div className="px-2">
                                <input
                                  type="range"
                                  min="0"
                                  max="50000"
                                  step="1000"
                                  value={filters.priceRange[0]}
                                  onChange={(e) => 
                                    setFilters({
                                      ...filters,
                                      priceRange: [parseInt(e.target.value), filters.priceRange[1]]
                                    })
                                  }
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <input
                                  type="range"
                                  min="0"
                                  max="50000"
                                  step="1000"
                                  value={filters.priceRange[1]}
                                  onChange={(e) => 
                                    setFilters({
                                      ...filters,
                                      priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                                    })
                                  }
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Duration */}
                          <div>
                            <h3 className="font-medium mb-2">Duration</h3>
                            <div className="grid grid-cols-2 gap-2">
                              {durationOptions.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => 
                                    setFilters({...filters, duration: option.value})
                                  }
                                  className={`text-sm py-2 px-3 rounded-full ${
                                    filters.duration === option.value
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-muted hover:bg-muted/80'
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Rating */}
                          <div>
                            <h3 className="font-medium mb-2">Rating</h3>
                            <div className="space-y-2">
                              {ratingOptions.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => 
                                    setFilters({...filters, rating: option.value})
                                  }
                                  className={`w-full text-left py-1.5 px-3 rounded-md flex items-center ${
                                    filters.rating === option.value
                                      ? 'bg-primary/10 text-primary font-medium'
                                      : 'hover:bg-muted/50'
                                  }`}
                                >
                                  <div className="flex items-center mr-2">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`h-4 w-4 ${
                                          i < Math.floor(option.value || 0) 
                                            ? 'text-yellow-400 fill-yellow-400' 
                                            : 'text-muted-foreground/30'
                                        }`} 
                                      />
                                    ))}
                                  </div>
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Amenities */}
                          <div>
                            <h3 className="font-medium mb-2">Amenities</h3>
                            <div className="space-y-2">
                              {amenitiesOptions.map((amenity) => (
                                <div key={amenity.id} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`amenity-${amenity.id}`}
                                    checked={filters.amenities.includes(amenity.id)}
                                    onChange={() => toggleAmenity(amenity.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                  />
                                  <label 
                                    htmlFor={`amenity-${amenity.id}`}
                                    className="ml-2 text-sm text-foreground"
                                  >
                                    {amenity.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4 pt-4 border-t">
                          <button
                            type="button"
                            onClick={() => {
                              setFilters({
                                priceRange: [0, 50000],
                                duration: "",
                                rating: 0,
                                sortBy: "popularity",
                                amenities: []
                              });
                            }}
                            className="text-sm text-muted-foreground hover:text-foreground mr-4"
                          >
                            Clear all
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowFilters(false)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
                          >
                            Apply Filters
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-3">Popular Destinations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our most popular destinations that travelers love. Find your perfect getaway today!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                onClick={() => navigate(`/destination/${destination.id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Destination+Image';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                    <Heart className="h-5 w-5 text-white" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                      <div className="flex items-center text-sm text-white/90">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{destination.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                      <span className="text-xs opacity-80 ml-1">({destination.reviews})</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-sm">Starting from <span className="font-bold">{destination.price}</span></p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchPage;
