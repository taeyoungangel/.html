import React, { useState, useEffect } from 'react';

const APPROVAL_TABS = ['고객 문의', '상신함', '결재 대기', '완료', '반려'];

const APPROVALS = {
  '상신함': [
    { id: 1, title: '6월 출장신청서', type: '출장신청', date: '2026-06-07', status: '대기' },
    { id: 2, title: '업무용 소모품 구매요청', type: '지출결의', date: '2026-06-05', status: '승인' },
  ],
  '결재 대기': [
    { id: 3, title: '휴가신청서', requester: '김민수', type: '휴가신청', date: '2026-06-08', status: '대기' },
    { id: 4, title: '지출결의서 6월분', requester: '박지영', type: '지출결의', date: '2026-06-07', status: '대기' },
    { id: 5, title: '출장보고서', requester: '이준호', type: '출장보고', date: '2026-06-06', status: '대기' },
  ],
  '완료': [
    { id: 6, title: '5월 경비정산서', requester: '최수진', type: '경비정산', date: '2026-05-30', status: '승인' },
    { id: 7, title: '교육훈련 신청서', requester: '한도현', type: '교육신청', date: '2026-05-25', status: '승인' },
  ],
  '반려': [
    { id: 8, title: '장비구매 요청서', requester: '오민재', type: '구매요청', date: '2026-05-20', status: '반려' },
  ],
};

const STATUS_STYLE = {
  '대기': { bg: 'rgba(234,179,8,0.15)', color: '#FCD34D', dot: '🟡', label: '대기' },
  '승인': { bg: 'rgba(16,185,129,0.15)', color: '#34D399', dot: '🟢', label: '승인' },
  '반려': { bg: 'rgba(239,68,68,0.15)', color: '#FCA5A5', dot: '🔴', label: '반려' },
  '완료': { bg: 'rgba(16,185,129,0.15)', color: '#34D399', dot: '✅', label: '완료' },
};

const APPROVAL_LINE = ['담당자', '팀장', '임원'];

export default function ApprovalPanel() {
  const [tab, setTab] = useState('고객 문의');
  const [showDraft, setShowDraft] = useState(false);
  const [toast, setToast] = useState('');
  const [customerInquiries, setCustomerInquiries] = useState([]);

  useEffect(() => {
    if (tab === '고객 문의') {
      try {
        const stored = JSON.parse(localStorage.getItem('customer_inquiries') || '[]');
        setCustomerInquiries(stored);
      } catch (e) {
        console.error(e);
      }
    }
  }, [tab]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleCheckInquiry = (id) => {
    const updated = customerInquiries.map(item => item.id === id ? { ...item, status: '완료' } : item);
    setCustomerInquiries(updated);
    localStorage.setItem('customer_inquiries', JSON.stringify(updated));
    showToast('✅ 확인 처리되었습니다.');
  };

  const items = tab === '고객 문의' ? customerInquiries : (APPROVALS[tab] || []);

  return (
    <div style={s.wrap}>
      {/* 토스트 */}
      {toast && <div style={s.toast}>{toast}</div>}

      {/* 기안 작성 버튼 */}
      <div style={s.topRow}>
        <h2 style={s.title}>📋 전자결재</h2>
        <button style={s.draftBtn} onClick={() => setShowDraft(!showDraft)}>
          ✏️ 기안 작성
        </button>
      </div>

      {/* 결재선 시각화 */}
      <div style={s.lineBox}>
        <span style={s.lineLabel}>결재선</span>
        {APPROVAL_LINE.map((step, i) => (
          <React.Fragment key={step}>
            <div style={s.lineStep}>
              <div style={{
                ...s.lineCircle,
                background: i === 0 ? 'rgba(14,165,233,0.3)' : i === 1 ? 'rgba(99,102,241,0.3)' : 'rgba(16,185,129,0.3)',
                borderColor: i === 0 ? '#38BDF8' : i === 1 ? '#818CF8' : '#34D399',
              }}>
                {i === 0 ? '👤' : i === 1 ? '👔' : '🏅'}
              </div>
              <span style={s.lineStepLabel}>{step}</span>
            </div>
            {i < APPROVAL_LINE.length - 1 && <div style={s.lineArrow}>→</div>}
          </React.Fragment>
        ))}
      </div>

      {/* 기안 작성 폼 (토글) */}
      {showDraft && (
        <div style={s.draftBox}>
          <div style={s.draftTitle}>기안 작성</div>
          <div style={s.draftGrid}>
            <div style={s.field}><label style={s.label}>문서 종류</label>
              <select style={s.input}>
                <option>휴가신청서</option><option>지출결의서</option><option>출장신청서</option><option>업무보고서</option>
              </select>
            </div>
            <div style={s.field}><label style={s.label}>제목</label>
              <input style={s.input} placeholder="제목 입력" />
            </div>
            <div style={{ ...s.field, gridColumn: '1/-1' }}>
              <label style={s.label}>내용</label>
              <textarea style={{ ...s.input, height: '80px', resize: 'none' }} placeholder="내용 입력" />
            </div>
          </div>
          <div style={s.draftBtns}>
            <button style={s.cancelBtn} onClick={() => setShowDraft(false)}>취소</button>
            <button style={s.submitBtn} onClick={() => { setShowDraft(false); showToast('✅ 기안이 상신되었습니다.'); }}>상신하기</button>
          </div>
        </div>
      )}

      {/* 탭 */}
      <div style={s.tabRow}>
        {APPROVAL_TABS.map((t) => (
          <button key={t} style={{ ...s.tabBtn, ...(tab === t ? s.tabActive : {}) }} onClick={() => setTab(t)}>
            {t}
            {t === '결재 대기' && <span style={s.tabBadge}>{APPROVALS['결재 대기'].length}</span>}
            {t === '고객 문의' && customerInquiries.filter(i => i.status === '대기').length > 0 && (
              <span style={s.tabBadge}>{customerInquiries.filter(i => i.status === '대기').length}</span>
            )}
          </button>
        ))}
      </div>

      {/* 리스트 */}
      <div style={s.list}>
        {items.length === 0 ? (
          <div style={s.empty}>해당 문서가 없습니다.</div>
        ) : items.map((item) => {
          const st = STATUS_STYLE[item.status] || STATUS_STYLE['대기'];
          return (
            <React.Fragment key={item.id}>
            <div style={{ ...s.card, borderRadius: tab === '고객 문의' && item.message ? '12px 12px 0 0' : '12px' }}>
              <div style={s.cardLeft}>
                <span style={s.cardType}>{item.type}</span>
                <span style={s.cardTitle}>{item.title}</span>
                {item.requester && <span style={s.cardReq}>— {item.requester}</span>}
              </div>
              <div style={s.cardRight}>
                <span style={s.cardDate}>{item.date}</span>
                <span style={{ ...s.badge, background: st.bg, color: st.color }}>
                  {st.dot} {st.label}
                </span>
                {tab === '결재 대기' && (
                  <div style={s.actionBtns}>
                    <button style={s.approveBtn} onClick={() => showToast('✅ 승인 처리되었습니다.')}>승인</button>
                    <button style={s.rejectBtn} onClick={() => showToast('🔴 반려 처리되었습니다.')}>반려</button>
                  </div>
                )}
                {tab === '고객 문의' && item.status === '대기' && (
                  <div style={s.actionBtns}>
                    <button style={s.approveBtn} onClick={() => handleCheckInquiry(item.id)}>확인하기</button>
                  </div>
                )}
              </div>
            </div>
            {tab === '고객 문의' && item.message && (
              <div style={{ ...s.card, marginTop: '-12px', paddingTop: '0', borderTop: 'none', borderRadius: '0 0 12px 12px', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', width: '100%', wordBreak: 'keep-all' }}>
                  <span style={{ color: '#38BDF8', fontWeight: 600, marginRight: '8px' }}>연락처: {item.phone} / {item.email}</span><br/><br/>
                  {item.message}
                </div>
              </div>
            )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

const s = {
  wrap: { display: 'flex', flexDirection: 'column', gap: '16px' },
  toast: { position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(56,189,248,0.4)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontSize: '14px', zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' },
  topRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: '18px', fontWeight: 700, color: 'white', margin: 0 },
  draftBtn: { padding: '10px 20px', background: 'linear-gradient(135deg,#0EA5E9,#6366F1)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' },
  lineBox: { display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px 20px' },
  lineLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginRight: '8px', fontWeight: 600 },
  lineStep: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },
  lineCircle: { width: '40px', height: '40px', borderRadius: '50%', border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' },
  lineStepLabel: { fontSize: '11px', color: 'rgba(255,255,255,0.55)', fontWeight: 600 },
  lineArrow: { color: 'rgba(255,255,255,0.25)', fontSize: '18px', marginBottom: '16px' },
  draftBox: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '14px', padding: '20px' },
  draftTitle: { fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '14px' },
  draftGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 },
  input: { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', color: 'white', padding: '10px 12px', fontSize: '13px', outline: 'none' },
  draftBtns: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' },
  cancelBtn: { padding: '9px 20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '13px', cursor: 'pointer' },
  submitBtn: { padding: '9px 20px', background: 'linear-gradient(135deg,#0EA5E9,#6366F1)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' },
  tabRow: { display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0' },
  tabBtn: { padding: '10px 18px', background: 'none', border: 'none', borderBottom: '2px solid transparent', color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' },
  tabActive: { color: '#38BDF8', borderBottomColor: '#38BDF8', fontWeight: 700 },
  tabBadge: { background: 'rgba(14,165,233,0.25)', color: '#38BDF8', fontSize: '10px', padding: '1px 6px', borderRadius: '20px', fontWeight: 700 },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  empty: { textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.3)', fontSize: '14px' },
  card: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' },
  cardLeft: { display: 'flex', alignItems: 'center', gap: '10px', flex: 1 },
  cardType: { fontSize: '10px', background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', padding: '2px 8px', borderRadius: '20px', fontWeight: 600, flexShrink: 0 },
  cardTitle: { fontSize: '14px', color: 'white', fontWeight: 500 },
  cardReq: { fontSize: '12px', color: 'rgba(255,255,255,0.4)' },
  cardRight: { display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 },
  cardDate: { fontSize: '12px', color: 'rgba(255,255,255,0.35)' },
  badge: { fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: 600 },
  actionBtns: { display: 'flex', gap: '6px' },
  approveBtn: { padding: '5px 12px', background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '6px', color: '#34D399', fontSize: '12px', cursor: 'pointer', fontWeight: 600 },
  rejectBtn: { padding: '5px 12px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '6px', color: '#FCA5A5', fontSize: '12px', cursor: 'pointer', fontWeight: 600 },
};
