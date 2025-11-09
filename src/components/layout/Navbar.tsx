import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Plane } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      const raw = localStorage.getItem("currentUser");
      const parsed = raw ? JSON.parse(raw) : null;
      setUser(token && parsed ? parsed : null);
    } catch {
      setUser(null);
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key === "currentUser" || e.key === "authToken") {
        try {
          const token = localStorage.getItem("authToken");
          const raw = localStorage.getItem("currentUser");
          const parsed = raw ? JSON.parse(raw) : null;
          setUser(token && parsed ? parsed : null);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
    } catch {}
    setUser(null);
    setIsOpen(false);
    navigate("/");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "Plan My Trip", path: "/plan-trip" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gold-200 bg-white/90 backdrop-blur-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2 font-bold text-foreground">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-teal-800 p-2">
            <Plane className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <span className="bg-gradient-to-r from-teal-800 to-gold-600 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
            VolvoRo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`relative px-2 py-1 text-sm font-medium transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-gradient-to-r before:from-teal-600 before:to-gold-500 before:transition-all before:duration-300 hover:before:w-full ${
                location.pathname === item.path 
                  ? 'font-semibold text-teal-700 before:w-full' 
                  : 'text-gray-700 hover:text-teal-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="border-gold-400 text-gold-700 hover:bg-gold-50 hover:text-gold-800"
              >
                Logout
              </Button>
              <Button 
                size="sm" 
                asChild
                className="bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md hover:from-teal-700 hover:to-teal-800"
              >
                <Link to="/profile">Dashboard</Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                className="border-gold-400 text-gold-700 hover:bg-gold-50 hover:text-gold-800"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button 
                size="sm" 
                asChild
                className="bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md hover:from-teal-700 hover:to-teal-800"
              >
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-20 z-50 w-full bg-white/95 shadow-xl backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col space-y-1 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-teal-50 text-teal-700 font-semibold'
                      : 'text-gray-700 hover:bg-gold-50 hover:text-teal-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-2 border-t border-gold-100 pt-3">
                {user ? (
                  <>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-gold-700 hover:bg-gold-50 hover:text-gold-800" 
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                    <Button 
                      className="mt-2 w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800" 
                      asChild
                    >
                      <Link to="/profile" onClick={() => setIsOpen(false)}>
                        Dashboard
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-gold-700 hover:bg-gold-50 hover:text-gold-800" 
                      asChild
                    >
                      <Link to="/login" onClick={() => setIsOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button 
                      className="mt-2 w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800" 
                      asChild
                    >
                      <Link to="/register" onClick={() => setIsOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
