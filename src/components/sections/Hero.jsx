import React from 'react';
import { motion } from 'framer-motion';

import heroBg from '../../assets/hero_bg.png';

const Hero = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-secondary/70"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <motion.h1 
          className="text-5xl md:text-8xl font-bold mb-8 tracking-tight leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          산업용 펌프의 <br className="md:hidden" /><span className="text-primary">새로운 혁신</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-3xl mb-12 text-slate-200 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          안전하고 효율적인 설비 엔지니어링 솔루션을 제공합니다.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a 
            href="Contact.html" 
            className="inline-block bg-primary hover:bg-blue-500 text-white font-semibold text-xl py-5 px-12 rounded-full transition-all transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
          >
            프로젝트 문의하기
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
