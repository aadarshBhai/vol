import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane, Package, Users, FileText, MapPin, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { packages as demoPackages, bookings } from "@/lib/mockData";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [usersList, setUsersList] = useState<Array<{ _id: string; name: string; email: string; phone?: string }>>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [pkgList, setPkgList] = useState<any[]>([]);
  const [loadingPkgs, setLoadingPkgs] = useState(false);
  const [form, setForm] = useState<{ id?: string; destination: string; duration: string; type: "Family"|"Couple"|"Solo"|""; price: string; image?: string }>(
    { destination: "", duration: "", type: "", price: "" }
  );
  const [itinerary, setItinerary] = useState<Array<{ day: number; title: string; description: string }>>([]);
  const [rawItineraryText, setRawItineraryText] = useState<string>("");
  const [savingPkg, setSavingPkg] = useState(false);
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

  async function savePackage() {
    try {
      setSavingPkg(true);
      const isEdit = !!form.id;
      const derived = itinerary.length ? itinerary : parseRawItinerary(rawItineraryText);
      const payload: any = {
        destination: form.destination,
        duration: form.duration,
        type: form.type,
        price: Number(form.price),
        image: form.image || "",
        itinerary: derived,
      };
      const API = import.meta.env.VITE_API_URL || "";
      const url = isEdit ? `${API}/api/packages/${form.id}` : `${API}/api/packages`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to save package");
      if (isEdit) {
        setPkgList((prev) => prev.map((p) => (p._id === data.package._id ? data.package : p)));
      } else {
        setPkgList((prev) => [data.package, ...prev]);
      }
      setForm({ destination: "", duration: "", type: "", price: "" });
      setItinerary([]);
    } catch (e) {
    } finally {
      setSavingPkg(false);
    }
  }

  async function deletePackage(id: string) {
    try {
      const API = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API}/api/packages/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to delete package");
      setPkgList((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
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
    { id: "packages", title: "Total Packages", value: pkgList.length, icon: Package },
    { id: "users", title: "Total Users", value: usersList.length, icon: Users },
    { id: "bookings", title: "Total Bookings", value: bookings.length, icon: FileText },
    { id: "destinations", title: "Destinations", value: new Set(pkgList.map(pkg => pkg.destination)).size, icon: MapPin },
  ];

  const handleStatClick = (tabId: string) => {
    setActiveTab(tabId);
    // Scroll to the tabs section for better UX
    document.getElementById('dashboard-tabs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <Plane className="h-6 w-6" />
            <span>Volvoro Admin</span>
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

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
                            setForm({ destination: "", duration: "", type: "", price: "" });
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
                            setForm({ id: pkg._id, destination: pkg.destination, duration: pkg.duration, type: pkg.type, price: String(pkg.price), image: pkg.image || "" });
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
