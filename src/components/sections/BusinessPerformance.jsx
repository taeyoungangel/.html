import React, { useState } from 'react';
import { motion } from 'framer-motion';

const performanceData = [
  { id: 419, client: "철원군농업기술센터", name: "2019년 철원 대마지구(대마리990번지) 수리시설 정비사업 수중펌프", date: "2019" },
  { id: 418, client: "철원군농업기술센터", name: "2019년 만경보 수중펌프", date: "2019.07." },
  { id: 417, client: "삼척시하수도사업소", name: "읍상빗물펌프장 펌프 수리수선", date: "2019.06." },
  { id: 416, client: "양구군상하수도사업소", name: "죽곡 공공하수처리시설 관급자재-펌프류", date: "2019" },
  { id: 415, client: "양구군상하수도사업소", name: "구암 공공하수처리시설 관급자재-펌프류", date: "2019" },
  { id: 414, client: "양구군상하수도사업소", name: "송현 공공하수처리시설 설치공사 펌프류", date: "2019" },
  { id: 413, client: "양양군상하수도사업소", name: "강현가압장 가압시설 증설공사 부스터펌프", date: "2019.08." },
  { id: 412, client: "삼척시상수도사업소", name: "미로상수도 확장공사 부스터펌프", date: "2019" },
  { id: 411, client: "홍천군", name: "솔무치지구 밭기반 정비사업 1차분 심정펌프", date: "2019" },
  { id: 410, client: "춘천시상하수도사업본부", name: "수중펌프", date: "2019.06." },
  { id: 409, client: "강원도인재개발원", name: "본관기계실 노후펌프 교체공사", date: "2019.06." },
  { id: 408, client: "춘천시상하수도사업본부", name: "근화동 유수지 지배수펌프 증설공사 수중펌프", date: "2019.06." },
  { id: 407, client: "철원군상하수도사업소", name: "김화하수처리구역(와수3처리분구) 하수관거정비사업 수중볼텍스펌프", date: "2019.05." },
  { id: 406, client: "춘천시상하수도사업본부", name: "용산정수장 샘플링펌프", date: "2019.06." },
  { id: 405, client: "춘천시상하수도사업본부", name: "2019년 상수도시설 확충공사 (서면당림리 272번지일원외) 부스터펌프", date: "2019.08" },
  { id: 404, client: "홍천군", name: "농업용수(양덕원리 취수펌프) 배수관로 설치공사 진공펌프", date: "2019.06." }
];

const BusinessPerformance = () => {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <section id="performance" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-secondary mb-4">Business Performance</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-600">
            주요 사업 실적을 통해 비에이텍의 기술력과 신뢰를 증명합니다.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th className="py-5 px-6 font-semibold w-24 text-center">번호</th>
                  <th className="py-5 px-6 font-semibold w-1/4">발주처</th>
                  <th className="py-5 px-6 font-semibold">건명</th>
                  <th className="py-5 px-6 font-semibold w-32 text-center">납품일자</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {performanceData.map((item, index) => (
                  <tr 
                    key={item.id}
                    className="transition-colors duration-300 hover:bg-primary/5"
                    onMouseEnter={() => setHoveredRow(item.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="py-4 px-6 text-slate-400 text-center font-medium">
                      {item.id}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-700">
                      {item.client}
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${hoveredRow === item.id ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                        {item.date}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessPerformance;
