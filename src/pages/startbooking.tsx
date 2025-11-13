import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

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

interface BookingData {
  from?: string;
  to?: string;
  travelType?: string;
  people?: string;
  departure?: string;
  return?: string;
  budget?: string;
  food?: string;
  transport?: string;
  activities?: string;
}

const DreamTripForm: React.FC = (): JSX.Element => {
  const location = useLocation();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [selectedTravelType, setSelectedTravelType] = useState<string>('');
  const [selectedFood, setSelectedFood] = useState<string>('');
  const [selectedTransport, setSelectedTransport] = useState<string>('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  
  // Initialize form state with default values
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    budget: '',
    departureDate: '',
    departureTime: '12:00',
    returnDate: '',
    returnTime: '12:00',
    people: 1,
    travelType: '',
    food: '',
    transport: '',
    activities: ''
  });

  // Debug effect to log form data changes
  useEffect(() => {
    console.log('Form data updated:', formData);
  }, [formData]);
  
  // Parse URL parameters when component mounts
  useEffect(() => {
    const data: BookingData = {};
    const queryString = window.location.search.substring(1);
    
    // Check if it's a WhatsApp-style message
    if (queryString.includes('NEW TRIP BOOKING')) {
      try {
        // Decode the entire query string
        const decoded = decodeURIComponent(queryString);
        
        // Split into lines and process each line
        const lines = decoded.split('\n').filter(line => line.trim() !== '');
        
        // Process each line to extract data
        let currentLine = '';
        
        // Combine lines that were split by URL encoding
        const processedLines: string[] = [];
        for (const line of lines) {
          if (line.match(/^\*\s*[A-Za-z]+:/) && currentLine) {
            processedLines.push(currentLine.trim());
            currentLine = line;
          } else {
            currentLine += (currentLine ? ' ' : '') + line.trim();
          }
        }
        if (currentLine) processedLines.push(currentLine.trim());
        
        // Process the combined lines
        let currentKey = '';
        let currentValue = '';
        
        for (const line of processedLines) {
          const match = line.match(/^\*\s*([A-Za-z\s]+):(.*)/);
          if (match) {
            // Save previous key-value pair if exists
            if (currentKey && currentValue) {
              data[currentKey.toLowerCase().replace(/\s+/g, '') as keyof BookingData] = currentValue.trim();
            }
            
            // Start new key-value pair
            currentKey = match[1].trim();
            currentValue = match[2].trim();
          } else if (currentKey) {
            // Continue the current value if line doesn't start with a key
            currentValue += ' ' + line.trim();
          }
        }
        
        // Save the last key-value pair
        if (currentKey && currentValue) {
          data[currentKey.toLowerCase().replace(/\s+/g, '') as keyof BookingData] = currentValue.trim();
        }
        
        // Special handling for budget to remove currency symbol
        if (data.budget) {
          data.budget = data.budget.replace(/[^0-9]/g, '');
        }
        
      } catch (error) {
        console.error('Error parsing WhatsApp message:', error);
      }
    } else {
      // Handle regular URL parameters
      const params = new URLSearchParams(location.search);
      params.forEach((value, key) => {
        const decodedValue = decodeURIComponent(value.replace(/\*/g, ' '));
        data[key as keyof BookingData] = decodedValue;
      });
    }

    // Update form data with parsed values
    if (Object.keys(data).length > 0) {
      setBookingData(data);
      console.log('Parsed URL data:', data); // Debug log
      
      // Format dates from strings like 'Fri, 14 Nov, 2025 at 2:39 PM'
      const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        
        // Try to parse the date string (handling formats like 'Fri, 14 Nov, 2025 at 2:39 PM')
        const months: Record<string, number> = {
          'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
          'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };
        
        // Try to match date formats
        const dateMatch = dateStr.match(/(\w+),\s*(\d+)\s*(\w+),\s*(\d+)/);
        if (dateMatch) {
          const [_, _day, day, month, year] = dateMatch;
          const monthIndex = months[month];
          if (monthIndex !== undefined) {
            const date = new Date(Number(year), monthIndex, Number(day));
            if (!isNaN(date.getTime())) {
              return date.toISOString().split('T')[0];
            }
          }
        }
        
        // If parsing fails, try default Date parsing
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
      };

      // Format time from strings like '2:39 PM'
      const formatTime = (dateTimeStr: string) => {
        if (!dateTimeStr) return '12:00';
        
        const timeMatch = dateTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (timeMatch) {
          let [_, hours, minutes, period] = timeMatch;
          let h = parseInt(hours, 10);
          const m = parseInt(minutes, 10);
          
          if (period.toUpperCase() === 'PM' && h < 12) h += 12;
          if (period.toUpperCase() === 'AM' && h === 12) h = 0;
          
          return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        }
        
        return '12:00'; // Default time
      };

      // Extract date and time from the original strings
      const departureDateTime = data.departure || '';
      const returnDateTime = data.return || '';
      
      // Update the form state
      setFormData(prev => ({
        ...prev,
        from: data.from || prev.from,
        to: data.to || prev.to,
        budget: data.budget || prev.budget,
        departureDate: formatDate(departureDateTime) || prev.departureDate,
        departureTime: formatTime(departureDateTime) || prev.departureTime,
        returnDate: formatDate(returnDateTime) || prev.returnDate,
        returnTime: formatTime(returnDateTime) || prev.returnTime,
        people: data.people ? parseInt(data.people, 10) || 1 : 1,
        travelType: data.travelType || prev.travelType,
        food: data.food || prev.food,
        transport: data.transport || prev.transport,
        activities: data.activities || prev.activities
      }));
      
      // Update selected states for UI components
      if (data.travelType) setSelectedTravelType(data.travelType);
      if (data.food) setSelectedFood(data.food);
      if (data.transport) setSelectedTransport(data.transport);
      if (data.activities) {
        setSelectedActivities(
          data.activities
            .split(',')
            .map(a => a.trim())
            .filter(Boolean)
        );
      }
    }
  }, [location.search]);

  // Form state is already initialized at the top of the component

  const handleOptionClick = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 0) {
      // Validate From field
      if (!formData.from.trim()) {
        newErrors.from = 'From location is required';
      } else if (formData.from.trim().length < 2) {
        newErrors.from = 'Please enter a valid location';
      }
      
      // Validate To field
      if (!formData.to.trim()) {
        newErrors.to = 'To location is required';
      } else if (formData.to.trim().length < 2) {
        newErrors.to = 'Please enter a valid location';
      }
      
      // Validate Budget field
      if (!formData.budget) {
        newErrors.budget = 'Budget is required';
      } else if (!/^\d+$/.test(formData.budget)) {
        newErrors.budget = 'Please enter a valid number';
      } else if (parseInt(formData.budget) < 100) {
        newErrors.budget = 'Minimum budget is ₹100';
      }
    } 
    else if (currentStep === 1) {
      // Date validations
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (!formData.departureDate) {
        newErrors.departureDate = 'Departure date is required';
      } else if (new Date(formData.departureDate) < today) {
        newErrors.departureDate = 'Departure date cannot be in the past';
      }
      
      if (!formData.returnDate) {
        newErrors.returnDate = 'Return date is required';
      } else if (formData.departureDate && new Date(formData.returnDate) < new Date(formData.departureDate)) {
        newErrors.returnDate = 'Return date cannot be before departure date';
      }
      
      // Time validations
      if (!formData.departureTime) newErrors.departureTime = 'Departure time is required';
      if (!formData.returnTime) newErrors.returnTime = 'Return time is required';
      
      // People validation
      if (!formData.people) {
        newErrors.people = 'Number of people is required';
      } else if (!/^\d+$/.test(formData.people.toString())) {
        newErrors.people = 'Please enter a valid number';
      } else if (parseInt(formData.people.toString()) < 1) {
        newErrors.people = 'At least 1 person is required';
      } else if (parseInt(formData.people.toString()) > 50) {
        newErrors.people = 'Maximum 50 people allowed';
      }
      
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
    
    // Special handling for numeric fields
    if (name === 'budget' || name === 'people') {
      // Only allow numbers
      if (value !== '' && !/^\d*$/.test(value)) {
        return; // Don't update if not a number
      }
    }

    // Update form data
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

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    return hour > 12 
      ? `${hour - 12}:${minutes} PM` 
      : `${hour}:${minutes} AM`;
  };

  // 👇 Use raw text with %0A line breaks (no encodeURIComponent)
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

  const whatsappNumber = '918434903291';

  // ✅ Don’t re-encode the message again
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
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

          {/* Booking Summary */}
          <div style={{ 
            background: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '10px', 
            margin: '20px 0',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Booking Summary</h3>
            <div style={{ lineHeight: '1.8' }}>
              <p><strong>Trip:</strong> {formData.from || 'Not specified'} → {formData.to || 'Not specified'}</p>
              <p><strong>Dates:</strong> {formData.departureDate || 'Not specified'} to {formData.returnDate || 'Not specified'}</p>
              <p><strong>People / Type:</strong> {formData.people} {formData.travelType ? `— ${formData.travelType}` : ''}</p>
              <p><strong>Budget:</strong> {formData.budget ? `₹${formData.budget}` : 'Not specified'}</p>
              <p><strong>Food / Transport:</strong> {formData.food || 'Any'} / {formData.transport || 'Any'}</p>
              <p><strong>Activities:</strong> {formData.activities || 'Open to suggestions'}</p>
            </div>
          </div>

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
                cursor: 'pointer',
                border: 'none'
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DreamTripForm;
