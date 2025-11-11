export interface Package {
  id: number;
  destination: string;
  duration: string;
  type: "Family" | "Couple" | "Solo";
  price: number;
  image: string;
  highlights: string[];
  inclusions: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  excludes?: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface Booking {
  id: number;
  userId: number;
  packageId: number;
  status: "Pending" | "Confirmed" | "Cancelled";
  payment: "QR" | "WhatsApp";
  date: string;
  travelers: number;
}

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  review: string;
  tripTo: string;
  date: string;
}

export const packages: Package[] = [
  {
    id: 1,
    destination: "Manali",
    duration: "2N/3D",
    type: "Family",
    price: 5000,
    image: "manali",
    highlights: ["Solang Valley", "Sissu", "Atal Tunnel", "Kasol & Manikaran", "Bonfire Night"],
    inclusions: ["AC Bus from Delhi", "2 Nights Hotel", "2 Breakfasts", "2 Dinners", "Sightseeing", "Trip Captain"],
    itinerary: [
      {
        day: 0,
        title: "Departure",
        description: "Board AC bus from Delhi/Chandigarh. Briefing from Trip Captain. Overnight journey to Manali."
      },
      {
        day: 1,
        title: "Manali Local Sightseeing",
        description: "Check-in & relax. Sightseeing: Hadimba Temple, Old Manali, Mall Road. Dinner with bonfire & music."
      },
      {
        day: 2,
        title: "Solang Valley & Sissu",
        description: "Visit Solang Valley. Travel via Atal Tunnel to Sissu. Explore Sissu’s scenery. Return to hotel, dinner & overnight stay."
      },
      {
        day: 3,
        title: "Kasol & Manikaran",
        description: "Breakfast & check-out. Visit Kasol & Manikaran Sahib (hot springs & local market). Evening departure."
      }
    ],
    excludes: ["Travel Insurance", "Extra Activities", "Personal Expenses", "Entry Fees"]
  },
  {
    id: 2,
    destination: "Shimla",
    duration: "2N/3D",
    type: "Couple",
    price: 4000,
    image: "shimla",
    highlights: ["Mall Road", "Kufri", "Jakhoo Temple", "Candlelight Dinner"],
    inclusions: ["AC Bus from Delhi", "2 Nights Hotel", "2 Breakfasts", "1 Candlelight Dinner", "Sightseeing"],
    itinerary: [
      {
        day: 0,
        title: "Departure from Delhi",
        description: "Evening departure from Delhi to Shimla."
      },
      {
        day: 1,
        title: "Shimla Arrival & Local Tour",
        description: "Check-in to hotel. Visit Mall Road, Ridge, Christ Church. Evening at leisure."
      },
      {
        day: 2,
        title: "Kufri Excursion",
        description: "Day trip to Kufri for adventure activities. Visit Jakhoo Temple. Romantic candlelight dinner."
      },
      {
        day: 3,
        title: "Departure",
        description: "Check-out and return journey to Delhi."
      }
    ],
    excludes: ["Travel Insurance", "Extra Activities", "Personal Expenses"]
  },
  {
    id: 3,
    destination: "Jaisalmer",
    duration: "3N/4D",
    type: "Family",
    price: 8500,
    image: "jaisalmer",
    highlights: ["Golden Fort", "Sam Sand Dunes", "Camel Safari", "Desert Camp", "Cultural Evening"],
    inclusions: ["Train/Bus from Delhi", "3 Nights Stay (Hotel + Desert Camp)", "All Meals", "Camel Safari", "Cultural Programs"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Jaisalmer",
        description: "Arrive and check-in. Visit Jaisalmer Fort, Patwon Ki Haveli, Gadisar Lake."
      },
      {
        day: 2,
        title: "Desert Safari",
        description: "Visit Sam Sand Dunes. Camel safari at sunset. Overnight stay in desert camp with cultural program."
      },
      {
        day: 3,
        title: "Local Sightseeing",
        description: "Visit Bada Bagh, Kuldhara abandoned village. Evening at leisure on Mall Road."
      },
      {
        day: 4,
        title: "Departure",
        description: "Check-out and departure to Delhi."
      }
    ],
    excludes: ["Travel Insurance", "Extra Activities", "Personal Expenses"]
  },
  {
    id: 4,
    destination: "Udaipur",
    duration: "2N/3D",
    type: "Couple",
    price: 6000,
    image: "udaipur",
    highlights: ["City Palace", "Lake Pichola Boat Ride", "Jag Mandir", "Sunset Point"],
    inclusions: ["Train from Delhi", "2 Nights Hotel", "Breakfast", "Boat Ride", "Sightseeing"],
    itinerary: [
      {
        day: 1,
        title: "Arrival & City Tour",
        description: "Arrive in Udaipur. Visit City Palace, Jagdish Temple. Evening boat ride on Lake Pichola."
      },
      {
        day: 2,
        title: "Romantic Udaipur",
        description: "Visit Saheliyon Ki Bari, Fateh Sagar Lake, Sajjangarh Palace for sunset views."
      },
      {
        day: 3,
        title: "Departure",
        description: "Morning at leisure. Departure to Delhi."
      }
    ],
    excludes: ["Travel Insurance", "Lunch & Dinner", "Personal Expenses"]
  },
  {
    id: 5,
    destination: "Mussoorie",
    duration: "2N/3D",
    type: "Solo",
    price: 3500,
    image: "mussoorie",
    highlights: ["Mall Road", "Kempty Falls", "Gun Hill", "Lal Tibba"],
    inclusions: ["Bus from Delhi", "2 Nights Hotel", "Breakfast", "Sightseeing"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Mussoorie",
        description: "Arrive and check-in. Explore Mall Road and local markets."
      },
      {
        day: 2,
        title: "Mussoorie Sightseeing",
        description: "Visit Kempty Falls, Gun Hill, Lal Tibba viewpoint, Company Garden."
      },
      {
        day: 3,
        title: "Departure",
        description: "Morning at leisure. Departure to Delhi."
      }
    ],
    excludes: ["Travel Insurance", "Lunch & Dinner", "Personal Expenses"]
  },
  {
    id: 6,
    destination: "Chopta",
    duration: "3N/4D",
    type: "Solo",
    price: 7000,
    image: "chopta",
    highlights: ["Tungnath Trek", "Chandrashila Summit", "Deoria Tal", "Alpine Meadows"],
    inclusions: ["Bus from Delhi", "3 Nights Stay", "All Meals", "Trek Guide", "Camping Equipment"],
    itinerary: [
      {
        day: 1,
        title: "Delhi to Chopta",
        description: "Overnight journey from Delhi to Chopta."
      },
      {
        day: 2,
        title: "Tungnath Trek",
        description: "Trek to Tungnath Temple (highest Shiva temple). Optional Chandrashila summit."
      },
      {
        day: 3,
        title: "Deoria Tal",
        description: "Visit beautiful Deoria Tal lake. Evening bonfire."
      },
      {
        day: 4,
        title: "Return to Delhi",
        description: "Departure back to Delhi."
      }
    ],
    excludes: ["Travel Insurance", "Extra Activities", "Personal Expenses"]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    review: "Amazing experience with Volvoro! The Manali trip was perfectly organized. Our trip captain was very helpful and the itinerary was well-planned.",
    tripTo: "Manali",
    date: "2024-09-15"
  },
  {
    id: 2,
    name: "Rahul & Neha",
    rating: 5,
    review: "Our honeymoon trip to Shimla was magical! The candlelight dinner and romantic setup exceeded our expectations. Highly recommend for couples!",
    tripTo: "Shimla",
    date: "2024-10-02"
  },
  {
    id: 3,
    name: "Amit Verma",
    rating: 4,
    review: "Great value for money. The Jaisalmer desert safari was the highlight. Only suggestion would be more time at the sand dunes!",
    tripTo: "Jaisalmer",
    date: "2024-08-20"
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    rating: 5,
    review: "Solo traveled to Mussoorie and felt completely safe. The hotel was clean, staff was friendly, and the itinerary was flexible for solo travelers.",
    tripTo: "Mussoorie",
    date: "2024-09-28"
  },
  {
    id: 5,
    name: "The Mehta Family",
    rating: 5,
    review: "Wonderful family vacation! Kids loved the bonfire and adventure activities. Everything was taken care of from start to finish.",
    tripTo: "Manali",
    date: "2024-10-10"
  },
  {
    id: 6,
    name: "Arjun Patel",
    rating: 5,
    review: "The Udaipur package was worth every penny! The boat ride on Lake Pichola at sunset was breathtaking. Will definitely book with Volvoro again.",
    tripTo: "Udaipur",
    date: "2024-10-18"
  },
  {
    id: 7,
    name: "Neha & Rohan",
    rating: 4,
    review: "Celebrated our anniversary in Shimla. The candlelight dinner was beautifully arranged. The only minor issue was the slightly delayed pick-up.",
    tripTo: "Shimla",
    date: "2024-10-05"
  },
  {
    id: 8,
    name: "Vikram Singh",
    rating: 5,
    review: "As a solo traveler, I was a bit nervous, but the Chopta trek was the best experience of my life! The guide was knowledgeable and the views were spectacular.",
    tripTo: "Chopta",
    date: "2024-09-20"
  },
  {
    id: 9,
    name: "The Kapoor Family",
    rating: 5,
    review: "Our kids are still talking about the camel ride in Jaisalmer! The desert camp was comfortable and the cultural show was the highlight of our trip.",
    tripTo: "Jaisalmer",
    date: "2024-10-15"
  },
  {
    id: 10,
    name: "Ananya Reddy",
    rating: 5,
    review: "Mussoorie in the rains was magical! The hotel had the best views and the local sightseeing was well-organized. Special thanks to our guide Ramesh!",
    tripTo: "Mussoorie",
    date: "2024-09-10"
  },
  {
    id: 11,
    name: "Rahul Khanna",
    rating: 4,
    review: "Great experience overall. The Manali trip was fantastic, though I wish we had more time at Solang Valley. The hotel was excellent with great mountain views.",
    tripTo: "Manali",
    date: "2024-10-22"
  },
  {
    id: 12,
    name: "The Malhotras",
    rating: 5,
    review: "Perfect family vacation! The kids loved the toy train ride in Shimla. The hotel was family-friendly and the staff went out of their way to accommodate us.",
    tripTo: "Shimla",
    date: "2024-10-08"
  }
];

// Demo users
export const users: User[] = [
  {
    id: 1,
    name: "Demo User",
    email: "demo@volvoro.com",
    phone: "9999999999",
    password: "demo123"
  }
];

// Demo bookings
export const bookings: Booking[] = [
  {
    id: 1,
    userId: 1,
    packageId: 1,
    status: "Confirmed",
    payment: "QR",
    date: "2024-11-15",
    travelers: 4
  }
];
