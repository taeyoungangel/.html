import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get current filename to determine active state
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', to: 'index.html' },
    { name: 'About Us', to: 'AboutUs.html' },
    { name: 'History', to: 'History.html' },
    { name: 'Facility', to: 'Facility.html' },
    { name: 'Location', to: 'Location.html' },
    { name: 'Contact', to: 'Contact.html' },
  ];

  const isHome = filename === 'index.html' || filename === '';

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="cursor-pointer">
          <a href="index.html">
            <span className={`text-2xl font-bold tracking-tight ${isScrolled || !isHome ? 'text-secondary' : 'text-white'}`}>
              <span className="text-primary">BA</span> TECH
            </span>
          </a>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className={`cursor-pointer font-medium hover:text-primary transition-colors ${isScrolled || !isHome ? 'text-slate-700' : 'text-slate-200'} ${filename === item.to ? 'text-primary' : ''}`}
            >
              {item.name}
            </a>
          ))}

          {/* 임직원 전용 버튼 */}
          <a
            id="employee-portal-btn"
            href="Login.html"
            className={`
              flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold
              border transition-all duration-200
              ${isScrolled || !isHome
                ? 'border-primary text-primary hover:bg-primary hover:text-white'
                : 'border-white/60 text-white hover:bg-white hover:text-secondary'
              }
            `}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            임직원 전용
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} className={isScrolled || !isHome ? 'text-secondary' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col space-y-4">
          {navItems.map((item) => (
            <a
              key={item.to}
              href={item.to}
              className={`font-medium cursor-pointer hover:text-primary transition-colors ${filename === item.to ? 'text-primary' : 'text-slate-700'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          {/* 모바일 임직원 전용 버튼 */}
          <a
            href="Login.html"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-center justify-center bg-primary text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            임직원 전용
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
