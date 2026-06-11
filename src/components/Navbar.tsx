import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Programs', path: '/#programs' },
    { name: 'Trainers', path: '/#trainers' },
    { name: 'Memberships', path: '/#pricing' },
    { name: 'Dashboard', path: '/admin' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex flex-col">
          <span className="text-2xl font-bold tracking-tighter text-white font-serif">
            GLORIOUS <span className="text-red-600">FITNESS</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 -mt-1">By Prashant Wadekar</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const isHovered = hoveredPath === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-sm font-medium transition-colors ${
                  isActive ? 'text-red-500' : 'text-gray-300 hover:text-red-500'
                }`}
                onMouseEnter={() => setHoveredPath(link.path)}
                onMouseLeave={() => setHoveredPath(null)}
              >
                {link.name}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-600 rounded-full origin-left"
                  animate={{ scaleX: isActive || isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </Link>
            );
          })}
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105">
            START FREE TRIAL
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-300 hover:text-red-500"
                >
                  {link.name}
                </Link>
              ))}
              <button className="bg-red-600 text-white py-4 rounded-xl font-bold">
                START FREE TRIAL
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;