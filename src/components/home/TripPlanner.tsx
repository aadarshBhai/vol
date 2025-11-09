'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, ArrowLeft, ArrowRight } from 'lucide-react';

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
    // Handle form submission
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
    <div className="container mx-auto px-4 mb-8 -mt-16 relative z-10">
      <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border border-border">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Start your dream trip</h2>
          
          <form onSubmit={handleSubmit}>
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
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {travelTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setSelectedType(type.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center ${
                            selectedType === type.id
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
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
                      <div className="bg-background text-foreground text-center py-3 px-6 flex-1 border-t border-b border-border">
                        {people} {people === 1 ? 'Person' : 'People'}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
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
                <button
                  type="submit"
                  className="flex items-center px-6 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Search Trips
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
