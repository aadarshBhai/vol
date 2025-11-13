import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Option {
  label: string;
  icon: string;
}

const travelOptions: Option[] = [
  { label: 'Solo', icon: '🧍' },
  { label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { label: 'Friends', icon: '🧑‍🤝‍🧑' },
  { label: 'Couple', icon: '💑' },
  { label: 'Corporate', icon: '💼' },
];

const foodOptions: Option[] = [
  { label: 'Veg', icon: '🥦' },
  { label: 'Non-Veg', icon: '🍗' },
  { label: 'Vegan', icon: '🌱' },
  { label: 'Any', icon: '🍔' },
];

const transportOptions: Option[] = [
  { label: 'Car', icon: '🚗' },
  { label: 'Flight', icon: '✈️' },
  { label: 'Train', icon: '🚆' },
  { label: 'Bus', icon: '🚌' },
  { label: 'Own Vehicle', icon: '🚘' },
];

const activityOptions: Option[] = [
  { label: 'Beaches', icon: '🏖️' },
  { label: 'City Sightseeing', icon: '🏙️' },
  { label: 'Outdoor Adventures', icon: '🧗' },
  { label: 'Food Exploration', icon: '🍜' },
  { label: 'Shopping', icon: '🛍️' },
  { label: 'Spa & Wellness', icon: '💆' },
];

const DreamTripForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    budget: '',
    departureDate: '',
    returnDate: '',
    departureTime: '',
    returnTime: '',
    people: 1,
    travelType: '',
    food: '',
    transport: '',
    activities: '',
  });

  const handleOptionClick = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 0) {
      if (!formData.from.trim()) newErrors.from = 'From location is required';
      if (!formData.to.trim()) newErrors.to = 'To location is required';
      if (!formData.budget) newErrors.budget = 'Budget is required';
    } 
    else if (currentStep === 1) {
      if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
      if (!formData.returnDate) newErrors.returnDate = 'Return date is required';
      if (!formData.departureTime) newErrors.departureTime = 'Departure time is required';
      if (!formData.returnTime) newErrors.returnTime = 'Return time is required';
      if (!formData.people) newErrors.people = 'Number of people is required';
      if (!formData.travelType) newErrors.travelType = 'Travel type is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 2));
    }
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(prev - 1, 0));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBookNow = () => {
    // Format dates for better readability
    const formatDate = (dateStr: string) => {
      if (!dateStr) return '';
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        weekday: 'short'
      };
      return new Date(dateStr).toLocaleDateString('en-IN', options);
    };

    // Format time (HH:MM to 12-hour format)
    const formatTime = (timeStr: string) => {
      if (!timeStr) return '';
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      return hour > 12 
        ? `${hour - 12}:${minutes} PM` 
        : `${hour}:${minutes} AM`;
    };

    // Create a clean, professional message
    const message = `*✈️ NEW TRIP BOOKING*%0A%0A` +
      `*From:* ${formData.from}%0A` +
      `*To:* ${formData.to}%0A` +
      `*Travel Type:* ${formData.travelType}%0A` +
      `*People:* ${formData.people}%0A%0A` +
      `*📅 Departure:* ${formatDate(formData.departureDate)} at ${formatTime(formData.departureTime)}%0A` +
      `*🛬 Return:* ${formatDate(formData.returnDate)} at ${formatTime(formData.returnTime)}%0A%0A` +
      `*💰 Budget:* ₹${formData.budget}%0A` +
      `*🍽️ Food:* ${formData.food || 'Any'}%0A` +
      `*🚗 Transport:* ${formData.transport || 'Any'}%0A` +
      `*🏄 Activities:* ${formData.activities || 'Open to suggestions'}`;

    // Phone number in international format without spaces or special characters
    const whatsappNumber = '918434903291';
    
    // Encode the entire message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  const OptionSelector: React.FC<{ options: Option[]; field: string }> = ({ options, field }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '10px' }}>
      {options.map(opt => (
        <div
          key={opt.label}
          onClick={() => handleOptionClick(field, opt.label)}
          style={{
            flex: '1 1 30%',
            padding: '15px',
            border: formData[field as keyof typeof formData] === opt.label ? '2px solid #008080' : '1px solid #ccc',
            borderRadius: '12px',
            cursor: 'pointer',
            textAlign: 'center',
            background: formData[field as keyof typeof formData] === opt.label ? '#e0f5f5' : 'white',
            transition: 'all 0.3s',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}
        >
          <span style={{ fontSize: '28px' }}>{opt.icon}</span>
          <div style={{ marginTop: '5px', fontWeight: 500 }}>{opt.label}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div style={{ maxWidth: '650px', margin: '0 auto', padding: '30px', borderRadius: '20px', background: '#fff', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', fontFamily: 'Poppins, sans-serif' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '5px', fontSize: '2rem', fontWeight: 'bold', color: '#1a365d' }}>Start Your Dream Trip</h1>
          <p style={{ textAlign: 'center', color: '#555', marginBottom: '30px' }}>Book your perfect getaway in just a few simple steps</p>

      {step === 0 && (
        <div>
          <h3>Step 1 of 3</h3>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="text" 
              name="from" 
              placeholder="From Location" 
              value={formData.from} 
              onChange={handleInputChange} 
              style={{ 
                width: '100%', 
                padding: '12px', 
                margin: '5px 0', 
                borderRadius: '8px', 
                border: errors.from ? '1px solid #ef4444' : '1px solid #ccc' 
              }} 
              required
            />
            {errors.from && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{errors.from}</div>}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="text" 
              name="to" 
              placeholder="To Location" 
              value={formData.to} 
              onChange={handleInputChange} 
              style={{ 
                width: '100%', 
                padding: '12px', 
                margin: '5px 0', 
                borderRadius: '8px', 
                border: errors.to ? '1px solid #ef4444' : '1px solid #ccc' 
              }} 
              required
            />
            {errors.to && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{errors.to}</div>}
          </div>
          <div style={{ marginBottom: '15px' }}>
            <input 
              type="number" 
              name="budget" 
              placeholder="Budget (₹)" 
              value={formData.budget} 
              onChange={handleInputChange} 
              style={{ 
                width: '100%', 
                padding: '12px', 
                margin: '5px 0', 
                borderRadius: '8px', 
                border: errors.budget ? '1px solid #ef4444' : '1px solid #ccc' 
              }} 
              required
              min="1"
            />
            {errors.budget && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '4px' }}>{errors.budget}</div>}
          </div>
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <button 
              onClick={handleNextStep} 
              style={{ 
                backgroundColor: '#008080', 
                color: 'white', 
                padding: '12px 25px', 
                borderRadius: '10px', 
                fontWeight: 600,
                cursor: 'pointer',
                border: 'none'
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3>Step 2 of 3</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 45%', minWidth: '200px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#333' }}>Departure Date</label>
                <input 
                  type="date" 
                  name="departureDate" 
                  value={formData.departureDate} 
                  onChange={handleInputChange} 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} 
                />
              </div>
              <div style={{ flex: '1 1 45%', minWidth: '200px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#333' }}>Return Date</label>
                <input 
                  type="date" 
                  name="returnDate" 
                  value={formData.returnDate} 
                  onChange={handleInputChange} 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} 
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 45%', minWidth: '200px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#333' }}>Departure Time</label>
                <input 
                  type="time" 
                  name="departureTime" 
                  value={formData.departureTime} 
                  onChange={handleInputChange} 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} 
                />
              </div>
              <div style={{ flex: '1 1 45%', minWidth: '200px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#333' }}>Return Time</label>
                <input 
                  type="time" 
                  name="returnTime" 
                  value={formData.returnTime} 
                  onChange={handleInputChange} 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} 
                />
              </div>
            </div>
            <input type="number" name="people" min={1} value={formData.people} onChange={handleInputChange} placeholder="Number of People" style={{ flex: '1 1 100%', padding: '12px', borderRadius: '10px', border: '1px solid #ccc' }} />
          </div>

          <h4>Travel Type</h4>
          <OptionSelector options={travelOptions} field="travelType" />

          {errors.travelType && (
            <div style={{ color: '#ef4444', fontSize: '0.9rem', margin: '10px 0', textAlign: 'center' }}>
              {errors.travelType}
            </div>
          )}
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <button 
              onClick={handlePrevStep} 
              style={{ 
                backgroundColor: '#f0f0f0', 
                color: '#333', 
                padding: '12px 25px', 
                borderRadius: '10px', 
                fontWeight: 600,
                border: '1px solid #ddd',
                cursor: 'pointer'
              }}
            >
              Back
            </button>
            <button 
              onClick={handleNextStep} 
              style={{ 
                backgroundColor: '#008080', 
                color: 'white', 
                padding: '12px 25px', 
                borderRadius: '10px', 
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Step 3 of 3</h3>
          <h4>Food Preference</h4>
          <OptionSelector options={foodOptions} field="food" />

          <h4>Transport Preference</h4>
          <OptionSelector options={transportOptions} field="transport" />

          <h4>Activities</h4>
          <OptionSelector options={activityOptions} field="activities" />

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <button 
              onClick={handlePrevStep} 
              style={{ 
                backgroundColor: '#f0f0f0', 
                color: '#333', 
                padding: '12px 25px', 
                borderRadius: '10px', 
                fontWeight: 600,
                border: '1px solid #ddd',
                cursor: 'pointer'
              }}
            >
              Back
            </button>
            <button 
              onClick={handleBookNow} 
              style={{ 
                backgroundColor: '#008080', 
                color: 'white', 
                padding: '12px 25px', 
                borderRadius: '10px', 
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      )}

          <div style={{ background: '#f0f8f8', padding: '20px', borderRadius: '15px', marginTop: '30px', fontSize: '0.95rem' }}>
            <h4>Summary</h4>
            <p><strong>Trip:</strong> {formData.from && formData.to ? `${formData.from} → ${formData.to}` : 'Not set'}</p>
            <p><strong>Dates:</strong> {formData.departureDate} to {formData.returnDate}</p>
            <p><strong>People / Type:</strong> {formData.people} — {formData.travelType}</p>
            <p><strong>Budget:</strong> {formData.budget ? `₹${formData.budget}` : '—'}</p>
            <p><strong>Food / Transport:</strong> {formData.food} / {formData.transport}</p>
            <p><strong>Activities:</strong> {formData.activities}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DreamTripForm;
