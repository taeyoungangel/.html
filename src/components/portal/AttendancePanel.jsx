import React, { useState } from 'react';

const ATTENDANCE = [
  { date: '2026-06-02', in: '08:55', out: '18:10', hours: '9h 15m', status: '정상' },
  { date: '2026-06-03', in: '09:01', out: '18:30', hours: '9h 29m', status: '정상' },
  { date: '2026-06-04', in: '08:50', out: '18:05', hours: '9h 15m', status: '정상' },
  { date: '2026-06-05', in: '09:15', out: '18:20', hours: '9h 05m', status: '지각' },
  { date: '2026-06-08', in: '08:48', out: '18:00', hours: '9h 12m', status: '정상' },
];

const TEAM_VACATIONS = [
  { name: '김민수', type: '연차', start: 10, end: 11 },
  { name: '박지영', type: '반차', start: 15, end: 15 },
  { name: '이준호', type: '연차', start: 18, end: 20 },
];

export default function AttendancePanel() {
  const [vacType, setVacType] = useState('연차');
  const [vacStart, setVacStart] = useState('');
  const [vacEnd, setVacEnd] = useState('');
  const [vacReason, setVacReason] = useState('');
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500); };

  // 캘린더: 2026년 6월
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const startWeekday = 1; // 2026년 6월 1일 = 월요일

  return (
    <div style={s.wrap}>
      {toast && <div style={s.toast}>{toast}</div>}

      <h2 style={s.title}>🕐 근태관리</h2>

      {/* 요약 카드 */}
      <div style={s.summaryRow}>
        {[
          { icon: '📅', label: '출근일수', value: '18', unit: '일', color: '#0EA5E9' },
          { icon: '⏰', label: '지각', value: '1', unit: '회', color: '#F59E0B' },
          { icon: '🌴', label: '잔여연차', value: '9', unit: '일', color: '#10B981' },
          { icon: '🏠', label: '재택근무', value: '2', unit: '일', color: '#8B5CF6' },
        ].map((c) => (
          <div key={c.label} style={{ ...s.card, borderColor: c.color + '44' }}>
            <span style={s.cardIcon}>{c.icon}</span>
            <span style={{ ...s.cardVal, color: c.color }}>{c.value}<span style={s.cardUnit}>{c.unit}</span></span>
            <span style={s.cardLabel}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* 출퇴근 기록 */}
      <div style={s.panel}>
        <div style={s.panelTitle}>📊 이번 달 출퇴근 기록</div>
        <table style={s.table}>
          <thead>
            <tr>{['날짜', '출근', '퇴근', '근무시간', '상태'].map((h) => <th key={h} style={s.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {ATTENDANCE.map((row) => (
              <tr key={row.date} style={s.tr}>
                <td style={s.td}>{row.date}</td>
                <td style={s.td}>{row.in}</td>
                <td style={s.td}>{row.out}</td>
                <td style={s.td}>{row.hours}</td>
                <td style={s.td}>
                  <span style={{
                    ...s.badge,
                    background: row.status === '정상' ? 'rgba(16,185,129,0.15)' : 'rgba(234,179,8,0.15)',
                    color: row.status === '정상' ? '#34D399' : '#FCD34D',
                  }}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={s.grid2}>
        {/* 휴가 신청 폼 */}
        <div style={s.panel}>
          <div style={s.panelTitle}>📝 휴가 신청</div>
          <div style={s.form}>
            <div style={s.field}>
              <label style={s.label}>휴가 종류</label>
              <select style={s.input} value={vacType} onChange={(e) => setVacType(e.target.value)}>
                <option>연차</option><option>반차(오전)</option><option>반차(오후)</option><option>병가</option><option>경조사</option>
              </select>
            </div>
            <div style={s.field}>
              <label style={s.label}>시작일</label>
              <input type="date" style={s.input} value={vacStart} onChange={(e) => setVacStart(e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>종료일</label>
              <input type="date" style={s.input} value={vacEnd} onChange={(e) => setVacEnd(e.target.value)} />
            </div>
            <div style={s.field}>
              <label style={s.label}>사유</label>
              <textarea style={{ ...s.input, height: '70px', resize: 'none' }} placeholder="사유를 입력하세요" value={vacReason} onChange={(e) => setVacReason(e.target.value)} />
            </div>
            <button style={s.submitBtn} onClick={() => { showToast('✅ 휴가 신청이 완료되었습니다.'); setVacReason(''); }}>
              신청하기
            </button>
          </div>
        </div>

        {/* 팀 휴가 캘린더 */}
        <div style={s.panel}>
          <div style={s.panelTitle}>📆 팀원 휴가 현황 — 2026년 6월</div>
          <div style={s.calGrid}>
            {['월', '화', '수', '목', '금', '토', '일'].map((d) => (
              <div key={d} style={s.calHead}>{d}</div>
            ))}
            {/* 빈 칸 */}
            {Array.from({ length: startWeekday }).map((_, i) => <div key={'empty' + i} />)}
            {days.map((day) => {
              const vac = TEAM_VACATIONS.find((v) => day >= v.start && day <= v.end);
              return (
                <div key={day} style={{
                  ...s.calCell,
                  background: vac ? 'rgba(99,102,241,0.2)' : 'transparent',
                  border: vac ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(255,255,255,0.05)',
                }}>
                  <span style={s.calDay}>{day}</span>
                  {vac && <span style={s.calVac}>{vac.name}</span>}
                </div>
              );
            })}
          </div>
          <div style={s.legend}>
            <span style={s.legendDot} />
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>팀원 휴가</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrap: { display: 'flex', flexDirection: 'column', gap: '16px' },
  toast: { position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(56,189,248,0.4)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' },
  title: { fontSize: '18px', fontWeight: 700, color: 'white', margin: 0 },
  summaryRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' },
  card: { background: 'rgba(255,255,255,0.05)', border: '1px solid', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', textAlign: 'center' },
  cardIcon: { fontSize: '22px' },
  cardVal: { fontSize: '24px', fontWeight: 700 },
  cardUnit: { fontSize: '13px', marginLeft: '3px' },
  cardLabel: { fontSize: '11px', color: 'rgba(255,255,255,0.45)' },
  panel: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '20px' },
  panelTitle: { fontSize: '14px', fontWeight: 600, color: 'white', marginBottom: '14px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '8px 12px', textAlign: 'left', fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.08)', letterSpacing: '0.5px' },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.05)' },
  td: { padding: '11px 12px', fontSize: '13px', color: 'rgba(255,255,255,0.65)' },
  badge: { fontSize: '11px', padding: '2px 10px', borderRadius: '20px', fontWeight: 600 },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontWeight: 600 },
  input: { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', padding: '9px 12px', fontSize: '13px', outline: 'none' },
  submitBtn: { padding: '11px', background: 'linear-gradient(135deg,#0EA5E9,#6366F1)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer' },
  calGrid: { display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '3px' },
  calHead: { fontSize: '10px', color: 'rgba(255,255,255,0.35)', textAlign: 'center', padding: '4px 0', fontWeight: 600 },
  calCell: { borderRadius: '6px', padding: '4px 2px', minHeight: '36px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' },
  calDay: { fontSize: '11px', color: 'rgba(255,255,255,0.6)' },
  calVac: { fontSize: '8px', color: '#a5b4fc', textAlign: 'center', lineHeight: 1.2 },
  legend: { display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' },
  legendDot: { width: '10px', height: '10px', borderRadius: '3px', background: 'rgba(99,102,241,0.4)', border: '1px solid rgba(99,102,241,0.6)' },
};
