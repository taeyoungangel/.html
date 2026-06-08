import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const historyData = [
  { year: "2010.11.01", title: "(주)강원유체 설립", desc: "" },
  { year: "2012.12.10", title: "벤처기업인증", desc: "중소기업청" },
  { year: "2013.02.19", title: "상호 및 대표자 변경", desc: "상호 : (주)강원유체 -> 비에이텍(주)" },
  { year: "2017.12.19", title: "강원도지사 표창", desc: "" }
];

const History = () => {
  const containerRef = useRef(null);
  
  // Scroll progress for the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="history" className="py-32 relative overflow-hidden bg-slate-50/50">
      {/* Abstract Backgrounds for Glassmorphism to stand out */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl -z-10 -translate-x-1/2"></div>
      <div className="absolute bottom-40 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl -z-10 translate-x-1/3"></div>

      <div className="container mx-auto px-6 max-w-5xl" ref={containerRef}>
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">History</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            끝없는 도전과 혁신으로 걸어온 비에이텍의 발자취입니다.
          </p>
        </motion.div>

        <div className="relative md:mx-auto md:w-full md:max-w-4xl pb-10">
          {/* Static Background Line */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-slate-200 rounded-full"></div>
          
          {/* Animated Foreground Line (Framer Motion) */}
          <motion.div 
            className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 w-1 bg-gradient-to-b from-primary to-secondary rounded-full origin-top"
            style={{ height: lineHeight }}
          ></motion.div>

          {historyData.map((item, index) => (
            <div key={index} className="relative z-10 mb-16 md:mb-28 last:mb-0 w-full flex md:justify-between items-center group">
              
              {/* Timeline Dot with Pulse Effect */}
              <div className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full shadow-lg z-20 group-hover:scale-125 transition-transform duration-300 group-hover:border-secondary">
                {/* Ping animation effect */}
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30"></div>
              </div>

              {/* Spacer for alternating layout on Desktop */}
              <div className={`hidden md:block md:w-5/12 ${index % 2 !== 0 ? 'order-1' : 'order-3'}`}></div>

              {/* Glassmorphism Card */}
              <motion.div 
                className={`w-full pl-14 md:pl-0 md:w-5/12 ${index % 2 !== 0 ? 'order-3' : 'order-1'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 100 }}
              >
                <div className="relative p-6 md:p-8 rounded-3xl bg-white/70 backdrop-blur-lg border border-white shadow-xl shadow-slate-200/50 hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-white/90">
                  {/* Subtle inner reflection */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/60 to-transparent pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary inline-block mb-2 md:mb-3">
                      {item.year}
                    </h3>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                    {item.desc && (
                      <p className="text-slate-600 font-medium leading-relaxed bg-slate-100/80 inline-block px-3 py-1.5 rounded-lg mt-1 text-sm md:text-base border border-slate-200/50">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default History;
