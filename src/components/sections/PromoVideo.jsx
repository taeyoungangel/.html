import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const PromoVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="bg-slate-900 py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            산업용 펌프의 새로운 혁신
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          ></motion.div>
          <motion.p
            className="text-slate-400 text-lg md:text-xl font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            비에이텍의 첨단 기술력과 압도적인 퍼포먼스를 영상으로 확인해보세요.
          </motion.p>
        </div>

        <motion.div 
          className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video max-w-5xl mx-auto bg-black ring-1 ring-white/10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls={isPlaying}
            src="/비에이텍 광고영상.mp4"
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            Your browser does not support the video tag.
          </video>

          {/* Custom Play Button Overlay */}
          {!isPlaying && (
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 hover:bg-black/30 transition-all duration-300 cursor-pointer group"
              onClick={handlePlayClick}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-transform duration-300 shadow-[0_0_30px_rgba(59,130,246,0.5)] backdrop-blur-sm mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4l12 6-12 6z" />
                </svg>
              </div>
              <span className="text-white font-medium tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">영상 재생하기</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PromoVideo;
