import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const facilities = [
  { 
    id: 1, 
    name: "다단벌류트펌프", 
    desc: "고압 송수가 요구되는 가압 설비 및 발전소, 보일러 급수용으로 설계된 고효율 다단 펌프입니다. 여러 개의 임펠러를 직렬 배치하여 뛰어난 양정 성능과 내구성을 보장하며, 안정적인 대용량 유량 공급을 제공합니다.", 
    image: "/pumps/다단벌류트2.png" 
  },
  { 
    id: 2, 
    name: "단단벌류트펌프", 
    desc: "상수도 공급, 공업용수 이송 및 일반 산업 시설에서 가장 광범위하게 사용되는 표준형 단단 벌류트 펌프입니다. 구조가 심플하여 정비가 용이하며, 뛰어난 운전 효율성과 탁월한 경제성을 자랑합니다.", 
    image: "/pumps/단단벌류트2.png" 
  },
  { 
    id: 3, 
    name: "양흡입벌류트펌프", 
    desc: "대규모 수처리 및 용수 이송 공정에 최적화된 대용량 양흡입 구조의 벌류트 펌프입니다. 임펠러 양측에서 유체를 대칭으로 흡입하여 축추력을 상쇄함으로써 진동과 소음을 최소화하고 구동 베어링의 수명을 대폭 향상시켰습니다.", 
    image: "/pumps/양흡입벌류트1.png" 
  },
  { 
    id: 4, 
    name: "편흡입벌류트펌프", 
    desc: "빌딩 설비, 일반 산업용 냉난방 순환 및 공조 설비에 다목적으로 사용되는 편흡입 펌프입니다. 공간 효율적인 콤팩트 디자인과 편리한 백 풀 아웃(Back Pull-Out) 구조로 배관을 분해하지 않고도 손쉬운 유지보수가 가능합니다.", 
    image: "/pumps/편흡입벌류트1.png" 
  },
  { 
    id: 5, 
    name: "정량펌프", 
    desc: "정밀 화학 공정 및 화학적 수처리 공정에서 약품을 오차 없이 정밀한 유량으로 주입하는 데 최적화된 펌프입니다. 고도의 정밀 유량 제어를 지원하고 우수한 내부식성 재질로 제작되어 부식성 약품 이송에도 안전합니다.", 
    image: "/pumps/정량2.png" 
  },
  { 
    id: 6, 
    name: "수중펌프", 
    desc: "지하수 개발, 배수 처리, 농업용수 공급 및 건설 현장 등 수중 침전 상태에서 가동되는 가혹한 환경에 특화된 수중 모터 펌프입니다. 완전 방수형 모터와 최적의 열방출 구조를 갖추어 장시간 안정적인 작동을 약속합니다.", 
    image: "/pumps/수중1.png" 
  },
  { 
    id: 7, 
    name: "오수펌프", 
    desc: "생활 하수 및 오수가 모이는 빌딩 배수조, 하수처리장 등에서 이물질과 찌꺼기가 포함된 배출수를 처리하기 위한 펌프입니다. 막힘을 최소화하는 특수 논클로그(Non-clog) 임펠러를 적용해 막힘 현상 없이 원활하게 작동합니다.", 
    image: "/pumps/오수1.png" 
  },
  { 
    id: 8, 
    name: "슬러지펌프", 
    desc: "산업 공정성 폐수, 축산 분뇨, 침전지 슬러지 등 고농도 고형물과 거친 입자를 함유한 현탁액을 이송하는 강력한 산업용 펌프입니다. 특수 내마모 재질 부품을 적용하여 마모에 강하고 수명이 매우 깁니다.", 
    image: "/pumps/슬러지1.png" 
  },
  { 
    id: 9, 
    name: "심정용펌프", 
    desc: "깊은 우물이나 지하 깊은 곳에 삽입하여 깨끗한 지하수를 가압 인양하는 초슬림 고성능 수중 다단 펌프입니다. 외경이 콤팩트하여 좁은 심정 내부에 안정적으로 안착되며 고압 양정 성능이 매우 우수합니다.", 
    image: "/pumps/심정용1.png" 
  },
  { 
    id: 10, 
    name: "전진공동펌프", 
    desc: "회전하는 금속제 나사형 로터와 고무 스테이터의 맞물림을 통해 점도가 매우 높은 고점도 유체나 고형물이 포함된 원료를 맥동 없이 부드럽게 이송하는 펌프(모노펌프)입니다. 고정밀 정량 이송 능력이 뛰어납니다.", 
    image: "/pumps/전진공동1.png" 
  },
  { 
    id: 11, 
    name: "부스터펌프", 
    desc: "아파트 단지, 고층 빌딩 및 산업 시설에 안정적이고 균일한 수압으로 급수를 가압 공급하는 개별 가압 펌프 시스템입니다. 스마트 인버터가 유량 변동을 실시간 감지하여 모터 속도를 제어함으로써 뛰어난 에너지 절감 효율을 실현합니다.", 
    image: "/pumps/부스터1.png" 
  },
];

const Facility = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section id="facility" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-secondary mb-4">Equipment & Facility</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-slate-600">
            비에이텍의 첨단 설비와 장비 갤러리입니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((item, index) => (
            <motion.div 
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer aspect-video lg:aspect-square bg-slate-100"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImg(item)}
            >
              <div>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-secondary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-4 text-center">
                <ZoomIn size={32} className="mb-2 text-primary" />
                <h3 className="font-bold text-lg mb-1">{item.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <X size={36} />
            </button>
            <motion.div 
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full h-64 md:h-96 bg-slate-200">
                <img src={selectedImg.image} alt={selectedImg.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-secondary mb-2">{selectedImg.name}</h3>
                <p className="text-slate-600 leading-relaxed">{selectedImg.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Facility;
