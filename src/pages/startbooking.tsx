'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, ArrowLeft, ArrowRight, Plane } from 'lucide-react';

type TravelType = 'solo' | 'family' | 'friends' | 'couple' | 'corporate';

interface TravelTypeOption {
  id: TravelType;
  label: string;
  icon: JSX.Element;
  defaultPeople: number;
}

const travelTypes: TravelTypeOption[] = [
  {
    id: 'solo',
    label: 'Solo',
    icon: <Users className="w-5 h-5" />,
    defaultPeople: 1,
  },
  {
    id: 'friends',
    label: 'Friends',
    icon: <Users className="w-5 h-5" />,
    defaultPeople: 2,
  },
  {
    id: 'couple',
    label: 'Couple',
    icon: <Users className="w-5 h-5" />,
    defaultPeople: 2,
  },
  {
    id: 'family',
    label: 'Family',
    icon: <Users className="w-5 h-5" />,
    defaultPeople: 4,
  },
  {
    id: 'corporate',
    label: 'Corporate',
    icon: <Users className="w-5 h-5" />,
    defaultPeople: 3,
  },
];

const TripPlanner = () => {
  const [selectedType, setSelectedType] = useState<TravelType | null>(null);
  const [people, setPeople] = useState(1);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [departureTime, setDepartureTime] = useState('09:00');
  const [returnTime, setReturnTime] = useState('17:00');
  const [currentStep, setCurrentStep] = useState(1);

  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const period = i < 12 ? 'AM' : 'PM';
    return `${hour.toString().padStart(2, '0')}:00 ${period}`;
  });

  useEffect(() => {
    if (selectedType) {
      const type = travelTypes.find((t) => t.id === selectedType);
      if (type) {
        setPeople(type.defaultPeople);
      }
    }
  }, [selectedType]);

  const handlePeopleChange = (increment: number) => {
    const newValue = people + increment;
    if (newValue >= 1 && newValue <= 10) {
      setPeople(newValue);
    }
  };

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      travelType: selectedType,
      people,
      departureDate,
      returnDate,
      departureTime,
      returnTime,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12 sm:py-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-border relative"
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-teal-100 dark:bg-teal-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-10 right-20 w-40 h-40 bg-purple-100 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          
          <div className="p-6 md:p-10 relative z-10">
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  Plan My Trip
                </h2>
                <p className="text-muted-foreground mt-3 text-lg">
                  Book your perfect getaway in just a few simple steps
                </p>
                <div className="mt-4 flex justify-center space-x-2">
                  {[1, 2, 3].map((step) => (
                    <div 
                      key={step} 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentStep === step 
                          ? 'w-6 bg-gradient-to-r from-blue-500 to-teal-500' 
                          : 'w-2 bg-gray-200 dark:bg-gray-700'
                      }`}
                    ></div>
                  ))}
                </div>
              </motion.div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Travel Type
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {travelTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setSelectedType(type.id)}
                            className={`p-5 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer transform hover:-translate-y-1 hover:shadow-md ${
                              selectedType === type.id
                                ? 'border-primary bg-primary/10 text-primary dark:bg-primary/20 dark:border-primary/70 shadow-lg scale-[1.02]'
                                : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground bg-white dark:bg-gray-800/50 backdrop-blur-sm'
                            }`}
                          >
                            <div className="mb-2">{type.icon}</div>
                            <span className="text-sm font-medium">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Number of People
                      </label>
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => handlePeopleChange(-1)}
                          className="bg-muted hover:bg-muted/80 text-foreground rounded-l-lg p-3 transition-colors"
                          disabled={people <= 1}
                        >
                          -
                        </button>
                        <div className="bg-background text-foreground text-center py-3 px-6 flex-1 border-t border-b border-border dark:border-gray-700 font-medium">
                          <span className="text-lg font-semibold">{people}</span> {people === 1 ? 'Person' : 'People'}
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePeopleChange(1)}
                          className="bg-muted hover:bg-muted/80 text-foreground rounded-r-lg p-3 transition-colors"
                          disabled={people >= 10}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Departure Date
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <input
                            type="date"
                            value={departureDate}
                            onChange={(e) => setDepartureDate(e.target.value)}
                            className="w-full bg-background border border-input rounded-lg pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Departure Time
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <select
                            value={departureTime}
                            onChange={(e) => setDepartureTime(e.target.value)}
                            className="w-full bg-background border border-input rounded-lg pl-10 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none"
                            required
                          >
                            {times.map((time) => (
                              <option key={time} value={time} className="bg-background text-foreground">
                                {time}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Return Date (Optional)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            min={departureDate}
                            className="w-full bg-background border border-input rounded-lg pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">
                          Return Time
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Clock className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <select
                            value={returnTime}
                            onChange={(e) => setReturnTime(e.target.value)}
                            className="w-full bg-background border border-input rounded-lg pl-10 pr-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                            required={!!returnDate}
                            disabled={!returnDate}
                          >
                            {times.map((time) => (
                              <option key={time} value={time} className="bg-background text-foreground">
                                {time}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
</motion.div>
                )}
              </AnimatePresence>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-border/50"
              >
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    currentStep === 1
                      ? 'text-white/30 cursor-not-allowed'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>

                {currentStep === 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!selectedType}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                      !selectedType
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    Next
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-teal-500 text-white hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    <Plane className="w-5 h-5 mr-2" />
                    Search Trips
                  </motion.button>
                )}
              </motion.div>
            </form>
          </div>
        </motion.div> {/* ✅ Fixed: Added this missing closing div */}
      </main>
      <Footer />
    </div>
  );
};

export default TripPlanner;
