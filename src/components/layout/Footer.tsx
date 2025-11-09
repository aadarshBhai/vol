import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Facebook, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-teal-700 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <p className="text-teal-100 text-lg font-light italic">
            "Crafting Unforgettable Journeys with Passion and Precision."
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xl font-bold text-white">
              <img src="/logo.jpg" alt="Volvoro logo" className="h-10 w-10 object-contain rounded-full" />
              <span>Volvoro</span>
            </div>
            <p className="text-sm text-teal-100 text-center md:text-left">
              Travel, Redefined — Explore India with Comfort, Class, and Confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-sm font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/packages" className="text-teal-100 hover:text-white transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link to="/plan-trip" className="text-teal-100 hover:text-white transition-colors">
                  Plan My Trip
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-teal-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-teal-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-sm font-semibold text-white">Popular Destinations</h3>
            <ul className="space-y-2 text-sm text-teal-100">
              <li className="hover:text-white transition-colors cursor-pointer">Manali</li>
              <li className="hover:text-white transition-colors cursor-pointer">Shimla</li>
              <li className="hover:text-white transition-colors cursor-pointer">Jaisalmer</li>
              <li className="hover:text-white transition-colors cursor-pointer">Udaipur</li>
              <li className="hover:text-white transition-colors cursor-pointer">Mussoorie</li>
              <li className="hover:text-white transition-colors cursor-pointer">Chopta</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="mb-4 text-sm font-semibold text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm text-teal-100">
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 84349 03291</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+91 74818 80404</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>thevolvoro@gmail.com</span>
              </li>
              <li className="mt-6 flex justify-center md:justify-start gap-6">
                <a
                  href="https://www.instagram.com/volvoro_tour_explorer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-teal-200 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://www.facebook.com/share/173W9x9HXv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-teal-200 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://wa.me/918434903291"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-teal-200 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-6 w-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-teal-600 text-center text-sm text-teal-100">
          <p>&copy; {new Date().getFullYear()} Volvoro. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6 text-xs">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
