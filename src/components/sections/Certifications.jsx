import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, ExternalLink, Award, CheckCircle, Shield } from 'lucide-react';

const certificates = [
  {
    id: 'kc',
    title: 'KC 인증서',
    subtitle: 'Korea Certification',
    file: '/KC인증서.pdf',
    icon: Shield,
    color: 'from-blue-500 to-blue-600',
    description: '국가통합인증마크를 획득하여 제품의 안전성을 보장합니다.'
  },
  {
    id: 'iso',
    title: 'ISO 9001 인증서',
    subtitle: 'Quality Management System',
    file: '/ISO9001인증서.pdf',
    icon: Award,
    color: 'from-sky-500 to-sky-600',
    description: '국제 표준 품질 경영 시스템 인증을 통해 체계적인 품질 관리를 실현합니다.'
  },
  {
    id: 'mainbiz',
    title: '메인비즈 확인서',
    subtitle: 'Main-Biz Certification',
    file: '/메인비즈 확인서(기한27.09.13.).pdf',
    icon: CheckCircle,
    color: 'from-indigo-500 to-indigo-600',
    description: '경영혁신형 중소기업 인증으로 기업의 성장성과 혁신성을 인정받았습니다.'
  }
];

const Certifications = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  const openPdf = (file) => {
    setSelectedPdf(file);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closePdf = () => {
    setSelectedPdf(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="certifications" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-secondary mb-4">인증 및 자격보유</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full" />
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            비에이텍은 엄격한 기준의 국내외 인증을 통해 <br className="hidden md:block" />
            기술력과 신뢰성을 객관적으로 증명하고 있습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {certificates.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cert.color} flex items-center justify-center mb-6 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white" size={32} />
                </div>
                
                <h3 className="text-xl font-bold text-secondary mb-1">{cert.title}</h3>
                <p className="text-sm font-medium text-primary mb-4">{cert.subtitle}</p>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  {cert.description}
                </p>

                <button
                  onClick={() => openPdf(cert.file)}
                  className="flex items-center gap-2 text-secondary font-bold text-sm group/btn"
                >
                  <span className="relative">
                    인증서 보기
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300" />
                  </span>
                  <div className="p-2 rounded-full bg-white shadow-sm group-hover/btn:bg-primary group-hover/btn:text-white transition-colors duration-300">
                    <FileText size={18} />
                  </div>
                </button>

                {/* Decorative background icon */}
                <div className="absolute top-4 right-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
                  <Icon size={120} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* PDF Modal */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-secondary/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-5xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-8 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary">문서 뷰어</h4>
                    <p className="text-xs text-slate-400">Certificates & Quality Assurance</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href={selectedPdf} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-secondary transition-colors"
                    title="새 창에서 열기"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <button
                    onClick={closePdf}
                    className="p-2.5 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* PDF Viewer Content */}
              <div className="flex-1 bg-slate-200 relative">
                {/* PDF Loading state background or placeholder could go here */}
                <iframe
                  src={`${selectedPdf}#toolbar=0`}
                  className="w-full h-full border-none"
                  title="PDF Viewer"
                />
              </div>
              
              {/* Modal Footer */}
              <div className="px-8 py-4 bg-slate-50 text-center">
                <p className="text-xs text-slate-400 font-medium">
                  본 문서는 비에이텍의 자산이며 무단 복제 및 배포를 금합니다.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
