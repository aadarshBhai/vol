'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, ChevronRight } from 'lucide-react';

const SearchForm = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted:', formData);
    // You can add navigation or API call here
  };

  return (
    <div className="container mx-auto px-4 -mt-16 relative z-10">
      <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto"
      >
        <div className="flex flex-col md:flex-row">
          {/* From Input */}
          <div className="relative flex-1 border-r border-gray-200">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <MapPin size={20} />
            </div>
            <input
              type="text"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="w-full h-full py-5 pl-12 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-tl-2xl md:rounded-tl-none md:rounded-bl-2xl"
              placeholder="From: City, Station Or Airport"
              required
            />
          </div>
          
          {/* To Input */}
          <div className="relative flex-1 border-r border-gray-200">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <MapPin size={20} />
            </div>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full h-full py-5 pl-12 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="To: City, Station Or Airport"
              required
            />
          </div>
          
          {/* Date Input */}
          <div className="relative flex-1 border-r border-gray-200">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Calendar size={20} />
            </div>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full h-full py-5 pl-12 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>
          
          {/* Search Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary hover:bg-primary/90 text-white font-medium py-5 px-8 flex items-center justify-center gap-2 transition-colors"
          >
            <Search size={20} />
            <span>Search</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
