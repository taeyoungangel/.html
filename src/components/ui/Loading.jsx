import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-slate-50 z-[100] flex flex-col justify-center items-center">
      <div className="relative w-24 h-24 flex justify-center items-center">
        {/* Water Drop Ripple Animation */}
        <motion.div
          className="absolute w-12 h-12 border-4 border-primary rounded-full opacity-0"
          animate={{
            scale: [1, 2, 3],
            opacity: [1, 0.5, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.div
          className="absolute w-12 h-12 border-4 border-primary rounded-full opacity-0"
          animate={{
            scale: [1, 2, 3],
            opacity: [1, 0.5, 0]
          }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <div className="w-6 h-6 bg-primary rounded-full shadow-lg shadow-primary/50" />
      </div>
      <h2 className="mt-6 text-xl font-bold text-secondary tracking-widest">BA TECH</h2>
      <p className="mt-2 text-sm text-slate-500">엔지니어링의 새로운 물결을 준비합니다</p>
    </div>
  );
};

export default Loading;
