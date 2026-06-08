import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const CardNewsSlider = () => {
  const scrollContainerRef = useRef(null);

  const cards = [
    { id: 1, src: '/cardnews1.png', alt: '물 활용 캠페인 카드뉴스 1' },
    { id: 2, src: '/cardnews2.png', alt: '물 활용 캠페인 카드뉴스 2' },
    { id: 3, src: '/cardnews3.png', alt: '물 활용 캠페인 카드뉴스 3' },
    { id: 4, src: '/cardnews4.png', alt: '물 활용 캠페인 카드뉴스 4' },
    { id: 5, src: '/cardnews5.png', alt: '물 활용 캠페인 카드뉴스 5' },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              비에이텍과 함께하는 <br className="md:hidden" />
              <span className="text-primary">물 활용 캠페인</span>
            </motion.h2>
            <motion.div 
              className="w-16 h-1 bg-primary mb-6"
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
              지속 가능한 미래와 환경을 생각하는 우리의 노력을 카드뉴스로 만나보세요.
            </motion.p>
          </div>
          
          {/* Navigation Buttons (Desktop) */}
          <div className="hidden md:flex gap-3 mt-6 md:mt-0">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-colors focus:outline-none"
              aria-label="이전 카드"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-colors focus:outline-none"
              aria-label="다음 카드"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <motion.div 
          className="relative -mx-6 px-6 md:mx-0 md:px-0"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-4 px-2"
          >
            {cards.map((card) => (
              <div 
                key={card.id}
                className="snap-center shrink-0 w-[280px] md:w-[350px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden group hover:-translate-y-2 hover:shadow-[0_15px_40px_rgb(0,0,0,0.12)] transition-all duration-300"
              >
                <img 
                  src={card.src} 
                  alt={card.alt} 
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Mobile Scroll Indicator Instruction */}
          <div className="text-center mt-2 md:hidden text-slate-400 text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            좌우로 스와이프하여 확인하세요
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CardNewsSlider;
