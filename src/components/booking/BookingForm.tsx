import { useState } from 'react';

interface BookingFormProps {
  adminMode?: boolean;
  onSuccess?: () => void;
}

interface FormData {
  // Step 1
  fromLocation: string;
  toLocation: string;
  budget: string;
  
  // Step 2
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  partySize: number;
  travelType: string;
  
  // Step 3
  foodPreference?: string;
  transportPreference?: string;
  activities?: string[];
}

const BookingForm = ({ adminMode = false, onSuccess }: BookingFormProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fromLocation: '',
    toLocation: '',
    budget: '',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    partySize: 1,
    travelType: ''
  });

  const locations = [
    'New York', 'Los Angeles', 'Chicago', 'Miami', 'Las Vegas',
    'San Francisco', 'Seattle', 'Boston', 'Austin', 'Denver'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setActiveStep(prev => Math.min(3, prev + 1));
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(1, prev - 1));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/bookings/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit booking');
      }

      const successMessage = adminMode 
        ? 'Booking created successfully!'
        : 'Thank you! Your booking request has been received. We\'ll contact you soon!';
      
      setSubmitStatus({
        success: true,
        message: successMessage,
      });
      
      if (onSuccess) {
        onSuccess();
      }

      // Reset form after successful submission
      setFormData({
        fromLocation: '',
        toLocation: '',
        budget: '',
        departureDate: '',
        departureTime: '',
        returnDate: '',
        returnTime: '',
        partySize: 1,
        travelType: '',
        foodPreference: '',
        transportPreference: '',
        activities: [],
      });
      setActiveStep(1);
    } catch (error) {
      console.error('Error submitting booking:', error);
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to submit booking. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render step 1: Location and Budget
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">From Location</label>
        <input
          type="text"
          name="fromLocation"
          value={formData.fromLocation}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter pickup location"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">To Location</label>
        <input
          type="text"
          name="toLocation"
          value={formData.toLocation}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter drop location"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Budget (₹)</label>
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="Enter your budget"
          min="0"
          required
        />
      </div>
    </div>
  );

  // Generate time options from 1 AM to 12 PM/AM
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 1; hour <= 12; hour++) {
      times.push(`${hour} AM`);
    }
    for (let hour = 1; hour <= 12; hour++) {
      times.push(`${hour} PM`);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();
  const travelTypes = [
    { emoji: '🧍', label: 'Solo' },
    { emoji: '👨‍👩‍👧‍👦', label: 'Family' },
    { emoji: '🧑‍🤝‍🧑', label: 'Friends' },
    { emoji: '💑', label: 'Couple' },
    { emoji: '💼', label: 'Corporate' }
  ];

  // Render step 2: Departure/Return Times and Travel Type
  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Travel Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Row 1: Dates */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Departure Date</label>
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Return Date</label>
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            min={formData.departureDate || new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Row 2: Times */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Departure Time</label>
          <select
            name="departureTime"
            value={formData.departureTime || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          >
            <option value="">Select Time</option>
            {timeOptions.map((time, index) => (
              <option key={`depart-${index}`} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Return Time</label>
          <select
            name="returnTime"
            value={formData.returnTime || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={!formData.returnDate}
          >
            <option value="">Select Time</option>
            {timeOptions.map((time, index) => (
              <option key={`return-${index}`} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Number of People */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Number of People</label>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, partySize: Math.max(1, prev.partySize - 1) }))}
            className="w-8 h-8 flex items-center justify-center border border-input rounded-full text-foreground hover:bg-accent transition-colors"
          >
            -
          </button>
          <span className="text-lg font-medium w-8 text-center">{formData.partySize}</span>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, partySize: prev.partySize + 1 }))}
            className="w-8 h-8 flex items-center justify-center border border-input rounded-full text-foreground hover:bg-accent transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Travel Type */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Travel Type</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {travelTypes.map((type, index) => (
            <button
              key={index}
              type="button"
              className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-colors ${
                formData.travelType === type.label
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setFormData(prev => ({ ...prev, travelType: type.label }))}
            >
              <span className="text-2xl">{type.emoji}</span>
              <span className="text-sm mt-1">{type.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const foodPreferences = [
    { emoji: '🥦', label: 'Veg' },
    { emoji: '🍗', label: 'Non-Veg' },
    { emoji: '🌱', label: 'Vegan' },
    { emoji: '🍔', label: 'Any' }
  ];

  const transportPreferences = [
    { emoji: '🚗', label: 'Car' },
    { emoji: '✈️', label: 'Flight' },
    { emoji: '🚆', label: 'Train' },
    { emoji: '🚌', label: 'Bus' },
    { emoji: '🚘', label: 'Own Vehicle' }
  ];

  const activities = [
    { emoji: '🏖️', label: 'Beaches' },
    { emoji: '🏙️', label: 'City Sightseeing' },
    { emoji: '🧗', label: 'Outdoor adventures' },
    { emoji: '🍜', label: 'Food exploration' },
    { emoji: '🛍️', label: 'Shopping' },
    { emoji: '💆', label: 'Spa & wellness' }
  ];

  // Render step 3: Preferences
  const renderStep3 = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Your Preferences</h2>
      
      {/* Food Preference */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-800">Food Preference</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {foodPreferences.map((item, index) => (
            <button
              key={index}
              type="button"
              className={`flex items-center justify-center p-3 border rounded-lg transition-colors ${
                formData.foodPreference === item.label
                  ? 'border-primary bg-primary/10 text-primary-foreground'
                  : 'border-input hover:border-primary/50 hover:bg-accent/50'
              }`}
              onClick={() => setFormData(prev => ({ ...prev, foodPreference: item.label }))}
            >
              <span className="mr-2 text-xl">{item.emoji}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Transport Preference */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-800">Transport Preference</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {transportPreferences.map((item, index) => (
            <button
              key={index}
              type="button"
              className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-colors ${
                formData.transportPreference === item.label
                  ? 'border-primary bg-primary/10 text-primary-foreground'
                  : 'border-input hover:border-primary/50 hover:bg-accent/50'
              }`}
              onClick={() => setFormData(prev => ({ ...prev, transportPreference: item.label }))}
            >
              <span className="text-2xl mb-1">{item.emoji}</span>
              <span className="text-xs text-center">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-800">Which activities are you interested in?</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {activities.map((item, index) => (
            <button
              key={index}
              type="button"
              className={`flex items-center p-3 border rounded-lg transition-colors ${
                formData.activities?.includes(item.label)
                  ? 'border-primary bg-primary/10 text-primary-foreground'
                  : 'border-input hover:border-primary/50 hover:bg-accent/50'
              }`}
              onClick={() => {
                setFormData(prev => {
                  const currentActivities = prev.activities || [];
                  const newActivities = currentActivities.includes(item.label)
                    ? currentActivities.filter(a => a !== item.label)
                    : [...currentActivities, item.label];
                  return { ...prev, activities: newActivities };
                });
              }}
            >
              <span className="mr-2 text-xl">{item.emoji}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${!adminMode ? 'max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden' : ''}`}>
      {/* Progress Bar */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-gray-700">Step {activeStep} of 3</div>
          <div className="text-sm font-medium text-gray-500">
            {activeStep === 1 ? 'Location & Budget' : activeStep === 2 ? 'Date & Time' : 'Your Details'}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(activeStep / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6">
        {activeStep === 1 && renderStep1()}
        {activeStep === 2 && renderStep2()}
        {activeStep === 3 && renderStep3()}
        
        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={activeStep === 1}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeStep === 1
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-input'
            }`}
          >
            Back
          </button>
          <button
            type={activeStep === 3 ? 'submit' : 'button'}
            onClick={activeStep < 3 ? handleNext : undefined}
            className={`px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : activeStep === 3 ? 'Book Now' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
