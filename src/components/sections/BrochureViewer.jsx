import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BrochureViewer = () => {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section className="py-24 bg-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            홍보 브로슈어
          </motion.h2>
          <motion.div 
            className="w-16 h-1 bg-primary mx-auto mb-6"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="text-slate-600 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            비에이텍의 주요 사업과 핵심 가치를 한눈에 확인해 보세요.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Web Viewer Container */}
          <motion.div 
            className="relative bg-white p-2 md:p-3 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-200 group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Toolbar Overlay */}
            <div className="absolute top-6 right-6 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a 
                href="/brochure.png" 
                download="BA_TECH_Brochure.png"
                className="bg-primary/90 hover:bg-primary text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                title="다운로드"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
                className="bg-slate-800/90 hover:bg-slate-800 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-transform hover:scale-110 hidden md:block"
                title="전체보기/축소"
              >
                {isZoomed ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                )}
              </button>
            </div>

            {/* Image Container with Custom Scrollbar if zoomed */}
            <div 
              className={`rounded-lg transition-all duration-700 ease-in-out ${isZoomed ? 'max-h-none' : 'max-h-[600px] overflow-hidden'}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img 
                src="/brochure.png" 
                alt="BA TECH Promotional Brochure" 
                className={`w-full h-auto object-top transition-transform duration-700 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in group-hover:scale-[1.02]'}`}
              />
            </div>
            
            {/* Fade out effect at the bottom if not zoomed */}
            {!isZoomed && (
              <div 
                className="absolute bottom-2 left-2 right-2 h-40 bg-gradient-to-t from-white via-white/80 to-transparent rounded-b-lg pointer-events-none flex items-end justify-center pb-8"
              >
                <button 
                  className="bg-white/90 text-primary border border-primary/20 font-semibold px-6 py-3 rounded-full shadow-lg backdrop-blur-sm pointer-events-auto hover:bg-primary hover:text-white transition-colors"
                  onClick={() => setIsZoomed(true)}
                >
                  브로슈어 전체 보기
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrochureViewer;
