import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Users, Briefcase, ShieldCheck } from 'lucide-react';

// ─── 조직도 데이터 ────────────────────────────────────────────────────────────
const ceo = {
  name: '조세연',
  title: '대표이사',
};

const departments = [
  {
    id: 'production',
    name: '생산부',
    duties: ['제품생산', '원자재구입'],
    icon: Briefcase,
    members: [
      { name: '정충구', rank: '부장' },
      { name: '조태연', rank: '부장' },
      { name: '김진수', rank: '과장' },
    ],
  },
  {
    id: 'management',
    name: '관리부',
    duties: ['계약 및 공정관리'],
    icon: Users,
    members: [
      { name: '이원석', rank: '이사' },
      { name: '김홍인', rank: '실장' },
    ],
  },
  {
    id: 'quality',
    name: '품질보증부',
    duties: ['품질관리 및 A/S'],
    icon: ShieldCheck,
    members: [
      { name: '정영호', rank: '사원' },
    ],
  },
];

// ─── 부서 카드 컴포넌트 ───────────────────────────────────────────────────────
const DepartmentCard = ({ dept, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = dept.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
      className="flex-1 min-w-[220px] max-w-xs"
    >
      {/* 연결선 — 상단 수직선 */}
      <div className="flex flex-col items-center">
        <div className="w-px h-10 bg-gradient-to-b from-primary/60 to-primary" />

        {/* 카드 */}
        <motion.div
          onClick={() => setIsOpen((prev) => !prev)}
          whileHover={{ y: -6, boxShadow: '0 20px 40px -8px rgba(14,165,233,0.35)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`
            w-full rounded-2xl border cursor-pointer overflow-hidden
            transition-colors duration-300
            ${isOpen
              ? 'bg-gradient-to-br from-secondary to-secondary/90 border-primary/40 shadow-xl shadow-secondary/30'
              : 'bg-white border-slate-200 shadow-md shadow-slate-200/60 hover:border-primary/50'}
          `}
        >
          {/* 카드 헤더 — 항상 표시 */}
          <div className="p-6">
            {/* 아이콘 + 부서명 */}
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${isOpen ? 'bg-primary/20' : 'bg-primary/10'}`}>
                <Icon
                  size={22}
                  className={isOpen ? 'text-primary' : 'text-primary'}
                />
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <ChevronDown
                  size={20}
                  className={isOpen ? 'text-primary' : 'text-slate-400'}
                />
              </motion.div>
            </div>

            <h3 className={`text-xl font-bold mb-3 ${isOpen ? 'text-white' : 'text-secondary'}`}>
              {dept.name}
            </h3>

            {/* 업무 배지 */}
            <div className="flex flex-wrap gap-1.5">
              {dept.duties.map((duty) => (
                <span
                  key={duty}
                  className={`
                    text-xs font-medium px-2.5 py-1 rounded-full
                    ${isOpen
                      ? 'bg-primary/20 text-sky-200'
                      : 'bg-primary/10 text-primary'}
                  `}
                >
                  {duty}
                </span>
              ))}
            </div>
          </div>

          {/* 아코디언 — 팀원 목록 */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="members"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/10 mx-4" />
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    visible: { transition: { staggerChildren: 0.06 } },
                    hidden: {},
                  }}
                  className="px-6 pb-5 pt-4 space-y-2.5"
                >
                  {dept.members.map((member) => (
                    <motion.li
                      key={member.name}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-sm font-semibold text-white">
                          {member.name}
                        </span>
                      </div>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-sky-200">
                        {member.rank}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── 메인 섹션 컴포넌트 ───────────────────────────────────────────────────────
const OrganizationChart = () => {
  return (
    <section id="organization" className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">

        {/* 섹션 헤더 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-secondary mb-4">조직도 및 업무분장</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 rounded-full" />
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            체계적인 조직 구조와 전문화된 업무 분장으로 최고의 서비스를 제공합니다.
          </p>
        </motion.div>

        {/* 조직도 트리 */}
        <div className="flex flex-col items-center">

          {/* CEO 카드 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'backOut' }}
            className="relative z-10"
          >
            <div className="
              relative bg-gradient-to-br from-secondary to-secondary/80
              text-white rounded-2xl px-10 py-6 shadow-2xl shadow-secondary/40
              border border-primary/30 text-center min-w-[220px]
            ">
              {/* 글로우 효과 */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 pointer-events-none" />

              <div className="
                w-14 h-14 mx-auto mb-3 rounded-full
                bg-gradient-to-br from-primary to-sky-400
                flex items-center justify-center shadow-lg shadow-primary/40
              ">
                <span className="text-white font-bold text-xl">
                  {ceo.name.charAt(0)}
                </span>
              </div>

              <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1">
                {ceo.title}
              </p>
              <h3 className="text-2xl font-bold text-white">{ceo.name}</h3>
            </div>
          </motion.div>

          {/* CEO → 부서 연결선 구조 */}
          <div className="relative flex flex-col items-center w-full max-w-3xl">
            {/* 세로선 (CEO 하단 → 가로선) */}
            <div className="w-px h-8 bg-gradient-to-b from-primary to-primary/70" />

            {/* 가로 연결선 */}
            <div className="relative w-full flex justify-center">
              {/* 가로선 전체 */}
              <div className="absolute top-0 left-[16.67%] right-[16.67%] h-px bg-primary/60" />
            </div>

            {/* 부서 카드들 */}
            <div className="w-full flex flex-col sm:flex-row justify-center gap-6 pt-0">
              {departments.map((dept, index) => (
                <DepartmentCard key={dept.id} dept={dept} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* 하단 안내 텍스트 */}
        <motion.p
          className="text-center text-sm text-slate-400 mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          각 부서 카드를 클릭하면 소속 팀원 정보를 확인할 수 있습니다.
        </motion.p>
      </div>
    </section>
  );
};

export default OrganizationChart;
