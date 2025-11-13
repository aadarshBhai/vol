import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plane, Package, Users, FileText, MapPin, LogOut, 
  Plus, ArrowLeft, ArrowRight, Check, X, Calendar, 
  DollarSign, Map, Users as UsersIcon, Briefcase, 
  CheckCircle, XCircle, Building2, Presentation, 
  Languages, Wifi, Utensils, Dumbbell, WashingMachine,
  Sun, Moon, Coffee, WifiOff, Tv, Wind, Droplets, CircleDashed, Flag, Mountain, GitBranch, Circle, Table2, Film,
  Waves, ParkingCircle, Snowflake, ShowerHead, 
  Shirt, ShoppingCart, Smartphone, Smile, Star,
  Ticket, Train, TreePine, Umbrella, UtensilsCrossed,
  Volume2, VolumeX, Watch, Wrench, XCircle as XCircleIcon,
  Zap, ZoomIn, ZoomOut, Bike, BookOpen, Activity, PawPrint, 
  Mic, Hand, Music, Car, type LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { packages as demoPackages, bookings } from "@/lib/mockData";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Define amenity options with icons
const amenityIcons: Record<string, LucideIcon> = {
  'wifi': Wifi,
  'restaurant': Utensils,
  'swimming_pool': Waves,
  'gym': Dumbbell,
  'parking': ParkingCircle,
  'air_conditioning': Snowflake,
  'laundry': WashingMachine,
  'spa': Droplets,
  'bar': Coffee,
  'airport_shuttle': Train,
  'business_center': Briefcase,
  'concierge': UsersIcon,
  'fitness_center': Dumbbell,
  'meeting_rooms': Presentation,
  'room_service': UtensilsCrossed,
  'sauna': ShowerHead,
  'shopping': ShoppingCart,
  'smoking_area': XCircleIcon,
  'wheelchair_accessible': Users,
  'beach_access': Sun,
  'bicycle_rental': Bike,
  'garden': TreePine,
  'library': BookOpen,
  'sun_deck': Sun,
  'terrace': Sun,
  'water_park': Waves,
  'water_sports': Waves,
  'water_slide': Waves,
  'yoga': Activity,
  'zoo': PawPrint,
  'aqua_park': Waves,
  'beach': Waves,
  'bowling': CircleDashed,  // Using CircleDashed as a placeholder for bowling
  'casino': DollarSign,
  'diving': Waves,
  'fishing': Waves,         // Using Waves as a placeholder for fishing
  'golf_course': Flag,      // Using Flag as a placeholder for golf
  'hiking': Mountain,       // Using Mountain as a placeholder for hiking
  'horse_riding': GitBranch, // Using GitBranch as a placeholder for horse riding
  'hot_spring': Droplets,
  'karaoke': Mic,
  'kids_club': Users,
  'massage': Hand,
  'mini_golf': Flag,        // Using Flag as a placeholder for mini golf
  'nightclub': Music,
  'outdoor_pool': Waves,
  'pool_bar': Coffee,
  'private_beach': Waves,
  'scuba_diving': Waves,
  'shuttle_service': Car,
  'squash': Circle,         // Using Circle as a placeholder for squash
  'tennis_court': Table2,   // Using Table2 as a placeholder for tennis court
  'theater': Film,          // Using Film as a placeholder for theater
  'windsurfing': Wind
};

type PackageType = "Family" | "Couple" | "Solo" | "Corporate" | "";

interface CorporateOptions {
  meetingRooms: boolean;
  teamBuilding: boolean;
  customBranding: boolean;
  maxCapacity: number;
  amenities: string[];
  specialRequirements: string;
}

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  meals?: string[];
  activities?: string[];
  accommodation?: string;
}

interface PackageFormData {
  id?: string;
  destination: string;
  duration: string;
  type: PackageType;
  price: string;
  image?: string;
  description: string;
  isFeatured: boolean;
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  startDate?: string;
  endDate?: string;
  groupSize: {
    min: number;
    max: number;
  };
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme' | '';
  bestTimeToVisit: string[];
  cancellationPolicy: string;
  termsAndConditions: string;
  corporateOptions?: CorporateOptions;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [usersList, setUsersList] = useState<Array<{ _id: string; name: string; email: string; phone?: string }>>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [pkgList, setPkgList] = useState<any[]>([]);
  const [savingPkg, setSavingPkg] = useState(false);
  const [loadingPkgs, setLoadingPkgs] = useState(false);
  // Default form values
  const defaultFormValues: PackageFormData = { 
    destination: "", 
    duration: "", 
    type: "", 
    price: "",
    description: "",
    isFeatured: false,
    inclusions: [],
    exclusions: [],
    highlights: [],
    groupSize: { min: 1, max: 10 },
    difficulty: '',
    bestTimeToVisit: [],
    cancellationPolicy: '',
    termsAndConditions: '',
    corporateOptions: {
      meetingRooms: false,
      teamBuilding: false,
      customBranding: false,
      maxCapacity: 0,
      amenities: [],
      specialRequirements: ''
    }
  };
  
  // Form state for multi-step package creation
  const [form, setForm] = useState<PackageFormData>({ 
    destination: "", 
    duration: "", 
    type: "", 
    price: "",
    description: "",
    isFeatured: false,
    inclusions: [],
    exclusions: [],
    highlights: [],
    groupSize: { min: 1, max: 10 },
    difficulty: '',
    bestTimeToVisit: [],
    cancellationPolicy: "",
    termsAndConditions: ""
  }); // Form steps state
  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [newHighlight, setNewHighlight] = useState('');
  const [newInclusion, setNewInclusion] = useState('');
  const [newExclusion, setNewExclusion] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form validation function
  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    
    switch (step) {
      case 1: // Basic Info
        if (!form.destination.trim()) errors.destination = 'Destination is required';
        if (!form.duration.trim()) errors.duration = 'Duration is required';
        if (!form.type) errors.type = 'Package type is required';
        if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) 
          errors.price = 'Valid price is required';
        if (!form.description.trim()) errors.description = 'Description is required';
        break;
        
      case 2: // Itinerary
        if (itinerary.length === 0) errors.itinerary = 'At least one itinerary item is required';
        break;
        
      case 3: // Inclusions/Exclusions
        if (form.inclusions.length === 0) errors.inclusions = 'At least one inclusion is required';
        if (form.exclusions.length === 0) errors.exclusions = 'At least one exclusion is required';
        break;
        
      case 4: // Corporate Options (if applicable)
        if (form.type === 'Corporate') {
          if (form.corporateOptions?.maxCapacity <= 0) 
            errors.maxCapacity = 'Maximum capacity must be greater than 0';
        }
        break;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle next step
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };
  
  // Handle previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  // Add highlight
  const addHighlight = () => {
    if (newHighlight.trim() && !form.highlights.includes(newHighlight.trim())) {
      setForm(prev => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()]
      }));
      setNewHighlight('');
    }
  };
  
  // Remove highlight
  const removeHighlight = (index: number) => {
    setForm(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };
  
  // Add inclusion
  const addInclusion = () => {
    if (newInclusion.trim() && !form.inclusions.includes(newInclusion.trim())) {
      setForm(prev => ({
        ...prev,
        inclusions: [...prev.inclusions, newInclusion.trim()]
      }));
      setNewInclusion('');
    }
  };
  
  // Remove inclusion
  const removeInclusion = (index: number) => {
    setForm(prev => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index)
    }));
  };
  
  // Add exclusion
  const addExclusion = () => {
    if (newExclusion.trim() && !form.exclusions.includes(newExclusion.trim())) {
      setForm(prev => ({
        ...prev,
        exclusions: [...prev.exclusions, newExclusion.trim()]
      }));
      setNewExclusion('');
    }
  };
  
  // Remove exclusion
  const removeExclusion = (index: number) => {
    setForm(prev => ({
      ...prev,
      exclusions: prev.exclusions.filter((_, i) => i !== index)
    }));
  };
  
  // Toggle amenity
  const toggleAmenity = (amenity: string) => {
    setForm(prev => {
      const currentAmenities = prev.corporateOptions?.amenities || [];
      const updatedAmenities = currentAmenities.includes(amenity)
        ? currentAmenities.filter(a => a !== amenity)
        : [...currentAmenities, amenity];
        
      return {
        ...prev,
        corporateOptions: {
          ...prev.corporateOptions!,
          amenities: updatedAmenities
        }
      };
    });
  };
  
  // Reset form to default values
  const resetForm = () => {
    setForm({ ...defaultFormValues });
    setItinerary([]);
    setCurrentStep(1);
    setFormErrors({});
    setNewHighlight('');
    setNewInclusion('');
    setNewExclusion('');
    setSelectedAmenities([]);
  };
  
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [rawItineraryText, setRawItineraryText] = useState<string>("");
  const navigate = useNavigate();

  // Check authentication on component mount and when active tab changes
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }
    
    // Add authorization header to all fetch requests
    const originalFetch = window.fetch;
    window.fetch = async (input, init = {}) => {
      const headers = new Headers(init.headers);
      if (!headers.has('Authorization')) {
        headers.append('Authorization', `Bearer ${token}`);
      }
      const response = await originalFetch(input, { ...init, headers });
      
      // If unauthorized, log out the user
      if (response.status === 401) {
        handleLogout();
      }
      
      return response;
    };
    
    return () => {
      window.fetch = originalFetch; // Restore original fetch
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast.success("Successfully logged out");
    navigate("/admin/login");
  };

  async function loadUsers() {
    try {
      setLoadingUsers(true);
      const API = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API}/api/users`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch users");
      setUsersList(data.users || []);
    } catch (e) {
    } finally {
      setLoadingUsers(false);
    }
  }

  async function loadPackages() {
    try {
      setLoadingPkgs(true);
      const API = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API}/api/packages`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch packages");
      setPkgList(data.packages || []);
    } catch (e) {
    } finally {
      setLoadingPkgs(false);
    }
  }

  function parseRawItinerary(raw: string) {
    const lines = raw.split(/\r?\n/);
    const items: Array<{ day: number; title: string; description: string }> = [];
    let current: { day: number; title: string; desc: string[] } | null = null;
    const dayHeader = /^\s*Day\s*(\d+)\s*[–-]\s*(.+)$/i;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const m = line.match(dayHeader);
      if (m) {
        if (current) {
          items.push({ day: current.day, title: current.title.trim(), description: current.desc.join("\n").trim() });
        }
        current = { day: Number(m[1]), title: m[2], desc: [] };
      } else if (current) {
        const trimmed = line.trim();
        if (trimmed.length) current.desc.push(trimmed);
      }
    }
    if (current) {
      items.push({ day: current.day, title: current.title.trim(), description: current.desc.join("\n").trim() });
    }
    if (items.length === 0 && raw.trim()) {
      // fallback: put entire text as Day 1
      items.push({ day: 1, title: "Itinerary", description: raw.trim() });
    }
    items.sort((a, b) => a.day - b.day);
    return items;
  }

  // Save package function
  const savePackage = async () => {
    try {
      setIsLoading(true);
      
      // Validate all steps before saving
      if (!validateStep(1) || !validateStep(2) || !validateStep(3) || 
          (form.type === 'Corporate' && !validateStep(4))) {
        toast.error('Please fix all validation errors before saving');
        return;
      }
      
      const isEdit = !!form.id;
      const derivedItinerary = itinerary.length ? itinerary : parseRawItinerary(rawItineraryText);
      
      // Prepare the package payload
      const payload: any = {
        ...form,
        price: Number(form.price),
        itinerary: derivedItinerary,
        ...(form.type === 'Corporate' ? {
          corporateOptions: form.corporateOptions
        } : {})
      };
      
      // Remove undefined or empty fields
      Object.keys(payload).forEach(key => {
        if (payload[key] === undefined || payload[key] === '') {
          delete payload[key];
        }
      });
      
      const API = import.meta.env.VITE_API_URL || "";
      const url = isEdit ? `${API}/api/packages/${form.id}` : `${API}/api/packages`;
      const method = isEdit ? "PUT" : "POST";
      
      const response = await fetch(url, { 
        method, 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }, 
        body: JSON.stringify(payload) 
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || "Failed to save package");
      }
      
      const data = await response.json();
      
      // Update the package list
      if (isEdit) {
        setPkgList(prev => prev.map(p => p._id === data.package._id ? data.package : p));
        toast.success('Package updated successfully');
      } else {
        setPkgList(prev => [data.package, ...prev]);
        toast.success('Package created successfully');
      }
      
      // Reset form after successful save
      resetForm();
      
    } catch (error) {
      console.error('Error saving package:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save package');
    } finally {
      setIsLoading(false);
    }
  };

  // Edit package function
  const editPackage = (pkg: any) => {
    // Map the package data to our form state
    const formData: PackageFormData = {
      ...defaultFormValues,
      id: pkg._id,
      destination: pkg.destination || '',
      duration: pkg.duration || '',
      type: pkg.type as PackageType || '',
      price: pkg.price?.toString() || '',
      image: pkg.image || '',
      description: pkg.description || '',
      isFeatured: pkg.isFeatured || false,
      highlights: Array.isArray(pkg.highlights) ? pkg.highlights : [],
      inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions : [],
      exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions : [],
      groupSize: pkg.groupSize || { min: 1, max: 10 },
      difficulty: pkg.difficulty || '',
      bestTimeToVisit: Array.isArray(pkg.bestTimeToVisit) ? pkg.bestTimeToVisit : [],
      cancellationPolicy: pkg.cancellationPolicy || '',
      termsAndConditions: pkg.termsAndConditions || '',
      corporateOptions: pkg.type === 'Corporate' ? {
        meetingRooms: pkg.corporateOptions?.meetingRooms || false,
        teamBuilding: pkg.corporateOptions?.teamBuilding || false,
        customBranding: pkg.corporateOptions?.customBranding || false,
        maxCapacity: pkg.corporateOptions?.maxCapacity || 0,
        amenities: Array.isArray(pkg.corporateOptions?.amenities) 
          ? pkg.corporateOptions.amenities 
          : [],
        specialRequirements: pkg.corporateOptions?.specialRequirements || ''
      } : defaultFormValues.corporateOptions
    };
    
    setForm(formData);
    setItinerary(Array.isArray(pkg.itinerary) ? pkg.itinerary : []);
    setActiveTab("packages");
    setCurrentStep(1); // Reset to first step when editing
    
    // Scroll to the form for better UX
    setTimeout(() => {
      document.getElementById('package-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Delete package function
  async function deletePackage(id: string) {
    try {
      const API = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API}/api/packages/${id}`, { 
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to delete package");
      setPkgList((prev) => prev.filter((p) => p._id !== id));
      toast.success('Package deleted successfully');
    } catch (error) {
      console.error('Error deleting package:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete package');
    }
  }

  // Load data based on active tab
  useEffect(() => {
    const loadTabData = async () => {
      try {
        switch (activeTab) {
          case 'users':
            await loadUsers();
            break;
          case 'packages':
          case 'destinations':
            await loadPackages();
            break;
          case 'bookings':
            // Add booking loading logic here
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(`Error loading ${activeTab} data:`, error);
        toast.error(`Failed to load ${activeTab} data`);
      }
    };

    loadTabData();
  }, [activeTab]);

  const stats = [
    { 
      id: "packages", 
      title: "Total Packages", 
      value: pkgList.length, 
      icon: Package,
      description: "Manage your travel packages"
    },
    { 
      id: "bookings", 
      title: "Total Bookings", 
      value: bookings.length, 
      icon: FileText,
      description: "View and manage bookings"
    },
    { 
      id: "destinations", 
      title: "Destinations", 
      value: new Set(pkgList.map(pkg => pkg.destination)).size, 
      icon: MapPin,
      description: "Explore all destinations"
    },
  ];

  const handleStatClick = (tabId: string) => {
    setActiveTab(tabId);
    // Scroll to the tabs section for better UX
    document.getElementById('dashboard-tabs')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="border-b border-border/40 bg-background/80 backdrop-blur-sm"
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="group flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: -20, scale: 1.1 }}
              className="flex items-center gap-2"
            >
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Volvoro Admin
              </span>
            </motion.div>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="group flex items-center gap-1.5 border-border/50 hover:border-primary/30 hover:bg-primary/5"
          >
            <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Logout</span>
          </Button>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your travel platform</p>
        </motion.div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={() => handleStatClick(stat.id === 'destinations' ? 'packages' : stat.id)}
            >
              <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${activeTab === stat.id ? 'text-primary' : 'text-muted-foreground'}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stat.id === 'destinations' 
                      ? new Set(pkgList.map(pkg => pkg.destination)).size 
                      : stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activeTab === stat.id ? 'Viewing' : 'Click to view'} {stat.title.toLowerCase()}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} id="dashboard-tabs">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is a demo admin dashboard. In a production environment, this would show
                  real-time analytics, recent bookings, and system notifications.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages">
            <Card>
              <CardHeader>
                <CardTitle>Manage Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
                    <input
                      className="rounded border px-3 py-2"
                      placeholder="Destination"
                      value={form.destination}
                      onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
                    />
                    <input
                      className="rounded border px-3 py-2"
                      placeholder="Duration"
                      value={form.duration}
                      onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                    />
                    <select
                      className="rounded border px-3 py-2"
                      value={form.type}
                      onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as any }))}
                    >
                      <option value="">Type</option>
                      <option value="Family">Family</option>
                      <option value="Couple">Couple</option>
                      <option value="Solo">Solo</option>
                    </select>
                    <input
                      className="rounded border px-3 py-2"
                      type="number"
                      placeholder="Price"
                      value={form.price}
                      onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    />
                    <input
                      className="rounded border px-3 py-2"
                      placeholder="Image URL (optional)"
                      value={form.image || ""}
                      onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                    />
                    <input
                      className="rounded border px-3 py-2"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () => {
                          const dataUrl = String(reader.result || "");
                          setForm((f) => ({ ...f, image: dataUrl }));
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    {form.image ? (
                      <div className="col-span-1 md:col-span-5">
                        <img src={form.image} alt="Preview" className="h-24 w-40 object-cover rounded border" />
                      </div>
                    ) : null}
                    <div className="flex items-center gap-2">
                      <Button size="sm" onClick={savePackage} disabled={savingPkg || !form.destination || !form.duration || !form.type || !form.price}>
                        {form.id ? "Update" : "Add"}
                      </Button>
                      {form.id && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setForm({ 
                              destination: "", 
                              duration: "", 
                              type: "", 
                              price: "",
                              description: "",
                              isFeatured: false,
                              inclusions: [],
                              exclusions: [],
                              highlights: [],
                              groupSize: { min: 1, max: 10 },
                              difficulty: '',
                              bestTimeToVisit: [],
                              cancellationPolicy: "",
                              termsAndConditions: ""
                            });
                            setItinerary([]);
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Paste Itinerary Section */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Paste Itinerary (supported format only)</div>
                    <textarea
                      className="w-full rounded border px-3 py-2 text-sm min-h-[160px]"
                      placeholder={
                        "Day 0 – Departure\n\nBoard AC bus from Delhi/Chandigarh.\nBriefing from Trip Captain.\nOvernight journey to Manali.\n\nDay 1 – Manali Local\n\nCheck-in & relax.\nSightseeing: Hadimba Temple, Old Manali, Mall Road.\nDinner with bonfire & music.\n"
                      }
                      value={rawItineraryText}
                      onChange={(e) => setRawItineraryText(e.target.value)}
                    />
                    <div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const lines = rawItineraryText.split(/\r?\n/);
                          const items: Array<{ day: number; title: string; description: string }> = [];
                          let current: { day: number; title: string; desc: string[] } | null = null;
                          const dayHeader = /^\s*Day\s*(\d+)\s*[–-]\s*(.+)$/i;
                          for (let i = 0; i < lines.length; i++) {
                            const line = lines[i];
                            const m = line.match(dayHeader);
                            if (m) {
                              if (current) {
                                items.push({ day: current.day, title: current.title.trim(), description: current.desc.join("\n").trim() });
                              }
                              current = { day: Number(m[1]), title: m[2], desc: [] };
                            } else {
                              if (current) {
                                const trimmed = line.trim();
                                if (trimmed.length) current.desc.push(trimmed);
                              }
                            }
                          }
                          if (current) {
                            items.push({ day: current.day, title: current.title.trim(), description: current.desc.join("\n").trim() });
                          }
                          items.sort((a, b) => a.day - b.day);
                          setItinerary(items);
                        }}
                      >
                        Parse From Text
                      </Button>
                    </div>
                  </div>

                  {loadingPkgs && <p className="text-sm text-muted-foreground">Loading packages...</p>}
                  {!loadingPkgs && pkgList.length === 0 && <p className="text-sm text-muted-foreground">No packages found.</p>}
                  {!loadingPkgs && pkgList.map((pkg: any) => (
                    <div key={pkg._id} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <h3 className="font-semibold">{pkg.destination}</h3>
                        <p className="text-sm text-muted-foreground">
                          {pkg.duration} • {pkg.type} • ₹{Number(pkg.price).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setForm({
                              id: pkg._id,
                              destination: pkg.destination,
                              duration: pkg.duration,
                              type: pkg.type,
                              price: String(pkg.price),
                              image: pkg.image || "",
                              description: pkg.description || "",
                              isFeatured: pkg.isFeatured || false,
                              inclusions: pkg.inclusions || [],
                              exclusions: pkg.exclusions || [],
                              highlights: pkg.highlights || [],
                              groupSize: pkg.groupSize || { min: 1, max: 10 },
                              difficulty: pkg.difficulty || '',
                              bestTimeToVisit: pkg.bestTimeToVisit || [],
                              cancellationPolicy: pkg.cancellationPolicy || "",
                              termsAndConditions: pkg.termsAndConditions || ""
                            });
                            setItinerary(Array.isArray(pkg.itinerary) ? pkg.itinerary : []);
                            setActiveTab("packages");
                          }}
                        >
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deletePackage(pkg._id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Manage Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loadingUsers && <p className="text-sm text-muted-foreground">Loading users...</p>}
                  {!loadingUsers && usersList.length === 0 && <p className="text-sm text-muted-foreground">No users found.</p>}
                  {!loadingUsers &&
                    usersList.map((user) => (
                      <div key={user._id} className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {user.email} {user.phone ? `• ${user.phone}` : ""}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={loadUsers}>
                            Refresh
                          </Button>
                          <Button
                            size="sm"
                            onClick={async () => {
                              try {
                                const API = import.meta.env.VITE_API_URL || "";
                                const res = await fetch(`${API}/api/users/${user._id}`, { method: "DELETE" });
                                const data = await res.json();
                                if (!res.ok) throw new Error(data?.message || "Failed to delete");
                                setUsersList((prev) => prev.filter((u) => u._id !== user._id));
                              } catch (e) {}
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Manage Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => {
                    const pkg = demoPackages.find((p) => p.id === booking.packageId);
                    const user = usersList.find((u: any) => u?._id === (booking as any).userId || u?.id === (booking as any).userId);
                    return (
                      <div key={booking.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                        <div>
                          <h3 className="font-semibold">{pkg?.destination}</h3>
                          <p className="text-sm text-muted-foreground">
                            {user?.name} • {booking.status} • {booking.travelers} travelers
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Confirm</Button>
                          <Button variant="outline" size="sm">Cancel</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
