import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Plane } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
<Link to="/" className="flex items-center gap-3">
  <img
    src="/logo.jpg"
    alt="VolvoRo Logo"
    className="h-10 w-10 rounded-full object-cover shadow-md hover:scale-105 transition-transform duration-300"
  />
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
