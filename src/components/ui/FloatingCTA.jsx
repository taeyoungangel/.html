import React, { useState, useEffect } from 'react';
import { Phone, Mail } from 'lucide-react';


const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
      <a
        href="tel:0212345678"
        className="w-12 h-12 bg-primary text-white rounded-full flex justify-center items-center shadow-lg hover:bg-blue-500 transition-colors transform hover:scale-110"
        title="전화 문의"
      >
        <Phone size={20} />
      </a>
      <a
        href="#contact"
        className="w-12 h-12 bg-secondary text-white rounded-full flex justify-center items-center shadow-lg hover:bg-slate-700 transition-colors cursor-pointer transform hover:scale-110"
        title="이메일 문의"
      >
        <Mail size={20} />
      </a>
    </div>
  );
};

export default FloatingCTA;
