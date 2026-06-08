import React from 'react';
import { motion } from 'framer-motion';
import { Settings, ShieldCheck, Zap, Droplet } from 'lucide-react';

const strengths = [
  {
    icon: <Zap size={40} className="text-primary mb-4" />,
    title: "혁신적 기술력",
    desc: "최신 엔지니어링 기술을 바탕으로 고효율 펌프 시스템을 구축합니다."
  },
  {
    icon: <ShieldCheck size={40} className="text-primary mb-4" />,
    title: "최상의 신뢰도",
    desc: "엄격한 품질 관리와 테스트를 거쳐 안전한 설비를 제공합니다."
  },
  {
    icon: <Settings size={40} className="text-primary mb-4" />,
    title: "맞춤형 솔루션",
    desc: "고객의 다양한 산업 환경에 맞춘 최적화된 설계를 제안합니다."
  },
  {
    icon: <Droplet size={40} className="text-primary mb-4" />,
    title: "친환경 프로세스",
    desc: "에너지 절감 및 환경 보호를 고려한 친환경 시스템을 지향합니다."
  }
];

const AboutUs = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-secondary mb-4">About Us</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            비에이텍은 차별화된 기술력과 깊은 전문성을 바탕으로, 대한민국 산업 현장의 심장 역할을 하는 펌프 및 엔지니어링 설비를 책임집니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {strengths.map((item, index) => (
            <motion.div
              key={index}
              className="bg-slate-50 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.icon}
              <h3 className="text-xl font-bold text-secondary mb-3">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
