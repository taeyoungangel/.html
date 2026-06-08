import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Sparkles, MessageSquare, ExternalLink, ArrowRight } from 'lucide-react';

const MaintenanceHub = () => {
  // Common prompts to inspire the user
  const recommendedPrompts = [
    "다단벌류트펌프 진동/소음 발생 시 대처법",
    "수중펌프 절연저항 측정 및 절차",
    "부스터펌프 인버터 에러 발생 시 조치",
    "슬러지펌프 일상 점검 항목"
  ];

  // List of pump maintenance manuals
  const documents = [
    {
      name: "일축나사식 모노펌프 유지관리지침서",
      desc: "모노펌프(전진공동) 운용 및 구조 가이드",
      file: "/일축나사식_모노펌프_유지관리지침서.hwp",
    },
    {
      name: "부스터펌프 유지관리 지침서",
      desc: "개별 급수 가압 펌프 시스템 점검 가이드",
      file: "/부스터펌프_유지관리지침서.hwp",
    },
    {
      name: "편흡입볼류트펌프 유지관리지침서",
      desc: "편흡입 원심 펌프 정비 및 조립 가이드",
      file: "/편흡입볼류트펌프_유지관리지침서.hwp",
    }
  ];

  const handlePromptClick = (prompt) => {
    // Copy prompt text to clipboard to make it extremely easy to paste into NotebookLM
    navigator.clipboard.writeText(prompt);
    alert(`"${prompt}" 질문이 클립보드에 복사되었습니다!\nNotebookLM 채팅창에 붙여넣어(Ctrl+V) 질문해 보세요.`);
  };

  return (
    <section id="maintenance-hub" className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
            <Sparkles size={12} />
            Smart Operation & Maintenance
          </span>
          <h2 className="text-4xl font-bold text-secondary mb-4">스마트 유지관리 & 지침서</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            비에이텍 펌프 설비의 안전한 운용과 편리한 유지보수를 위해 지침서 다운로드와 스마트 AI 가이드를 함께 제공합니다.
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Download Section (5/12 cols) */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-between p-8 bg-white rounded-2xl shadow-sm border border-slate-100"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-4">유지관리 지침서 다운로드</h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                설비의 상세 구조, 분해 조립, 소모품 교체 주기 및 부품 규격이 포함된 한글(.hwp) 형식의 정식 유지관리 지침서입니다.
              </p>

              {/* Document List Cards */}
              <div className="space-y-4">
                {documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-slate-50/50 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">
                        HWP
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-slate-800 group-hover:text-primary transition-colors line-clamp-1">{doc.name}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{doc.desc}</p>
                      </div>
                    </div>
                    <a 
                      href={doc.file} 
                      download
                      className="p-2 rounded-lg bg-white hover:bg-primary hover:text-white border border-slate-200 text-slate-500 transition-all shadow-sm shrink-0"
                      title="다운로드"
                    >
                      <Download size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                최종 업데이트: 2026.05 | HWP (한글 문서 포맷)
              </div>
            </div>
          </motion.div>

          {/* Right Column: AI Assistant (7/12 cols) */}
          <motion.div 
            className="lg:col-span-7 relative overflow-hidden p-8 bg-gradient-to-br from-secondary to-slate-900 rounded-2xl shadow-xl border border-slate-800 flex flex-col justify-between text-white"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Background Decorative Blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              {/* Badge */}
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-sky-400 border border-white/5 mb-6">
                <MessageSquare size={12} className="text-sky-400" />
                Google NotebookLM Integration
              </span>

              <h3 className="text-3xl font-extrabold mb-4 leading-tight">
                NotebookLM 기반<br />
                <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">스마트 AI 지침서 가이드</span>
              </h3>
              
              <p className="text-slate-300 mb-8 leading-relaxed max-w-xl">
                두껍고 복잡한 매뉴얼을 전부 다 정독하지 마세요! 지침서 파일을 분석한 구글 NotebookLM에 자연어로 질문하면, 원하는 정비 절차나 조치 방법을 인공지능이 즉시 찾아 대답해 줍니다.
              </p>

              {/* Recommended Prompts Area */}
              <div className="mb-8">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">AI에게 이렇게 질문해 보세요 (클릭 시 자동 복사):</p>
                <div className="flex flex-wrap gap-2">
                  {recommendedPrompts.map((prompt, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handlePromptClick(prompt)}
                      className="text-xs bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white px-3 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-all text-left flex items-center gap-1.5 group cursor-pointer"
                    >
                      <span className="text-primary text-[10px]">●</span>
                      <span>{prompt}</span>
                      <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-sky-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-slate-400 max-w-xs">
                * 아래 버튼을 눌러 개설된 비에이텍 NotebookLM 스마트 전용 노트북으로 이동해 지침서와 대화하세요.
              </p>
              
              {/* Replace 'https://notebooklm.google.com/' with the actual shared link if available */}
              <a 
                href="https://notebooklm.google.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-sky-400 text-white font-semibold transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 group"
              >
                <span>AI 지침서 대화하기</span>
                <ExternalLink size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MaintenanceHub;
