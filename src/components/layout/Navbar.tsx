import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { breakpoints } from '@/styles/breakpoints';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Packages", path: "/packages" },
    { name: "Plan My Trip", path: "/StartBooking", isExternal: true },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= parseInt(breakpoints.md) && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
        >
          <img
            src="/logo.jpg"
            alt="VolvoRo Logo"
            className="h-9 w-9 rounded-full object-cover shadow-sm sm:h-10 sm:w-10"
            width={40}
            height={40}
          />
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-xl font-bold tracking-tight text-transparent sm:text-2xl">
            VolvoRo
          </span>
        </Link>


        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
          {navItems.map((item) =>
            item.isExternal ? (
              <a
                key={item.path}
                href={item.path}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors',
                  'hover:text-foreground/90 cursor-pointer',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md',
                  'after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2',
                  'after:bg-gradient-to-r after:from-primary after:to-primary/80',
                  'after:transition-all after:duration-300 hover:after:w-4/5',
                  isActive(item.path)
                    ? 'text-foreground font-semibold after:w-4/5'
                    : 'text-foreground/60 hover:text-foreground/80'
                )}
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors',
                  'hover:text-foreground/90',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md',
                  'after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2',
                  'after:bg-gradient-to-r after:from-primary after:to-primary/80',
                  'after:transition-all after:duration-300 hover:after:w-4/5',
                  isActive(item.path)
                    ? 'text-foreground font-semibold after:w-4/5'
                    : 'text-foreground/60 hover:text-foreground/80'
                )}
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground/70 transition-colors hover:bg-accent hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="absolute inset-x-0 top-16 z-50 origin-top border-b bg-popover shadow-lg md:hidden"
          >
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navItems.map((item) =>
                item.isExternal ? (
                  <a
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block rounded-md px-3 py-2 text-base font-medium transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      isActive(item.path)
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground/80 hover:bg-accent/50 hover:text-foreground cursor-pointer'
                    )}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block rounded-md px-3 py-2 text-base font-medium transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      isActive(item.path)
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground/80 hover:bg-accent/50 hover:text-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
