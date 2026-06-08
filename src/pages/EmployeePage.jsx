import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import ApprovalPanel from '../components/portal/ApprovalPanel';
import AttendancePanel from '../components/portal/AttendancePanel';
import DocumentPanel from '../components/portal/DocumentPanel';

/* ── 더미 데이터 ─────────────────────────────── */
const NOTICES = [
  { id: 1, tag: '공지', title: '2026년 하반기 전사 워크숍 일정 안내', date: '2026-06-08', important: true },
  { id: 2, tag: '인사', title: '7월 정기 인사발령 공고', date: '2026-06-05', important: true },
  { id: 3, tag: '총무', title: '사무용품 신청 마감 안내 (6월 19일)', date: '2026-06-03', important: false },
  { id: 4, tag: '경영', title: '2026 상반기 경영 실적 보고', date: '2026-05-29', important: false },
  { id: 5, tag: '복지', title: '임직원 건강검진 일정 공지 (7월)', date: '2026-05-26', important: false },
];

const QUICK_LINKS = [
  { icon: '📋', label: '전자결재', desc: '기안·승인·조회', color: '#0EA5E9' },
  { icon: '📅', label: '근태관리', desc: '출퇴근·휴가신청', color: '#6366F1' },
  { icon: '📁', label: '자료실', desc: '사내 문서 공유', color: '#10B981' },
  { icon: '💬', label: '사내메신저', desc: '실시간 소통', color: '#F59E0B' },
  { icon: '🎓', label: '교육포털', desc: '온라인 강의', color: '#EC4899' },
  { icon: '🏥', label: '복지몰', desc: '복지 포인트 사용', color: '#8B5CF6' },
];



/* ── 메인 포털 페이지 ── */
const EmployeePage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  const handleLogout = () => {
    logout();
    window.location.href = 'Login.html';
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });

  return (
    <div style={s.root}>
      {/* 배경 */}
      <div style={s.bgOrb1} /><div style={s.bgOrb2} />

      {/* ── 사이드바 ── */}
      <aside style={s.sidebar}>
        <div style={s.sideTop}>
          <div style={s.sideLogoWrap}>
            <div style={s.sideLogoIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="rgba(255,255,255,0.9)" />
              </svg>
            </div>
            <div>
              <div style={s.sideLogoTitle}><span style={{ color: '#38BDF8' }}>BA</span> TECH</div>
              <div style={s.sideLogoBadge}>임직원 포털</div>
            </div>
          </div>

          {/* 유저 카드 */}
          <div style={s.userCard}>
            <div style={s.userAvatar}>{user?.avatar}</div>
            <div>
              <div style={s.userName}>{user?.name}</div>
              <div style={s.userRole}>{user?.department} · {user?.role}</div>
            </div>
          </div>

          {/* 내비게이션 */}
          <nav style={s.nav}>
            {/* 메인 */}
            <div style={s.navGroup}>메인</div>
            {[
              { key: 'home', icon: '🏠', label: '홈' },
              { key: 'notice', icon: '📣', label: '공지사항' },
              { key: 'links', icon: '🔗', label: '빠른 링크' },
            ].map((item) => (
              <button key={item.key} onClick={() => setActiveTab(item.key)}
                style={{ ...s.navBtn, ...(activeTab === item.key ? s.navBtnActive : {}) }}>
                <span>{item.icon}</span>{item.label}
              </button>
            ))}
            {/* 업무 */}
            <div style={{ ...s.navGroup, marginTop: '12px' }}>업무</div>
            {[
              { key: 'approval', icon: '📋', label: '전자결재' },
              { key: 'attendance', icon: '🕐', label: '근태관리' },
              { key: 'documents', icon: '📁', label: '자료실' },
            ].map((item) => (
              <button key={item.key} onClick={() => setActiveTab(item.key)}
                style={{ ...s.navBtn, ...(activeTab === item.key ? s.navBtnActive : {}) }}>
                <span>{item.icon}</span>{item.label}
              </button>
            ))}
          </nav>
        </div>

        <div style={s.sideBottom}>
          <a href="index.html" style={s.sideLink}>← 공개 홈페이지</a>
          <button onClick={handleLogout} style={s.logoutBtn}>로그아웃</button>
        </div>
      </aside>

      {/* ── 메인 콘텐츠 ── */}
      <main style={s.main}>
        {/* 상단 헤더 */}
        <div style={s.topbar}>
          <div>
            <h1 style={s.topbarTitle}>
              {activeTab === 'home' && '대시보드'}
              {activeTab === 'notice' && '공지사항'}
              {activeTab === 'links' && '빠른 링크'}
              {activeTab === 'approval' && '전자결재'}
              {activeTab === 'attendance' && '근태관리'}
              {activeTab === 'documents' && '자료실'}
            </h1>
            <p style={s.topbarDate}>{dateStr}</p>
          </div>
          <div style={s.topbarRight}>
            <div style={s.topbarAvatar}>{user?.avatar}</div>
            <button onClick={handleLogout} style={s.topbarLogout}>로그아웃</button>
          </div>
        </div>

        {/* ── 홈 탭 ── */}
        {activeTab === 'home' && (
          <div style={s.content}>
            {/* 환영 배너 */}
            <div style={s.welcomeBanner}>
              <div>
                <div style={s.welcomeText}>안녕하세요, <span style={{ color: '#38BDF8' }}>{user?.name}</span>님 👋</div>
                <div style={s.welcomeSub}>{user?.department} · {user?.role} · 오늘도 좋은 하루 되세요!</div>
              </div>
              <div style={s.welcomeIcon}>🌟</div>
            </div>

            {/* 요약 카드 3개 */}
            <div style={s.summaryGrid}>
              {[
                { label: '새 공지', value: '2', unit: '건', color: '#0EA5E9', icon: '🔔' },
                { label: '미결재', value: '3', unit: '건', color: '#F59E0B', icon: '📝' },
                { label: '잔여 연차', value: '12', unit: '일', color: '#10B981', icon: '🌴' },
              ].map((c) => (
                <div key={c.label} style={{ ...s.summaryCard, borderColor: c.color + '44' }}>
                  <div style={s.summaryIcon}>{c.icon}</div>
                  <div style={{ ...s.summaryValue, color: c.color }}>{c.value}<span style={s.summaryUnit}>{c.unit}</span></div>
                  <div style={s.summaryLabel}>{c.label}</div>
                </div>
              ))}
            </div>

            {/* 최근 공지 + 빠른 링크 */}
            <div style={s.homeGrid}>
              <div style={s.panel}>
                <div style={s.panelHeader}>
                  <span style={s.panelTitle}>📋 최근 공지사항</span>
                  <button onClick={() => setActiveTab('notice')} style={s.moreBtn}>더보기</button>
                </div>
                {NOTICES.slice(0, 3).map((n) => (
                  <div key={n.id} style={s.noticeRowSmall}>
                    <span style={{ ...s.noticeTagSmall, background: n.important ? '#1e3a8a' : '#1e293b', color: n.important ? '#93c5fd' : '#64748b' }}>{n.tag}</span>
                    <span style={s.noticeTitleSmall}>{n.title}</span>
                    <span style={s.noticeDateSmall}>{n.date}</span>
                  </div>
                ))}
              </div>
              <div style={s.panel}>
                <div style={s.panelHeader}>
                  <span style={s.panelTitle}>🔗 빠른 링크</span>
                  <button onClick={() => setActiveTab('links')} style={s.moreBtn}>전체보기</button>
                </div>
                <div style={s.quickGrid2}>
                  {QUICK_LINKS.slice(0, 4).map((l) => (
                    <div key={l.label} style={{ ...s.quickCardSmall, borderColor: l.color + '33' }}>
                      <span style={s.quickIconSmall}>{l.icon}</span>
                      <span style={s.quickLabelSmall}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── 공지사항 탭 ── */}
        {activeTab === 'notice' && (
          <div style={s.content}>
            <div style={s.panel}>
              <div style={s.panelHeader}>
                <span style={s.panelTitle}>📋 전체 공지사항</span>
                <span style={{ fontSize: '13px', color: '#64748b' }}>총 {NOTICES.length}건</span>
              </div>
              <table style={s.table}>
                <thead>
                  <tr>
                    {['번호', '분류', '제목', '등록일'].map((h) => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {NOTICES.map((n) => (
                    <tr key={n.id} style={s.tr}>
                      <td style={s.td}>{n.id}</td>
                      <td style={s.td}>
                        <span style={{ ...s.noticeTagSmall, background: n.important ? '#1e3a8a' : '#1e293b', color: n.important ? '#93c5fd' : '#64748b' }}>
                          {n.tag}
                        </span>
                      </td>
                      <td style={{ ...s.td, color: 'white', fontWeight: n.important ? 600 : 400, cursor: 'pointer' }}>
                        {n.important && <span style={s.newBadge}>NEW</span>}
                        {n.title}
                      </td>
                      <td style={s.td}>{n.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}



        {/* ── 빠른 링크 탭 ── */}
        {activeTab === 'links' && (
          <div style={s.content}>
            <div style={s.panel}>
              <div style={s.panelHeader}>
                <span style={s.panelTitle}>🔗 빠른 링크</span>
              </div>
              <div style={s.quickGrid}>
                {QUICK_LINKS.map((l) => {
                  const TAB_MAP = { '전자결재': 'approval', '근태관리': 'attendance', '자료실': 'documents' };
                  const targetTab = TAB_MAP[l.label];
                  return (
                    <div key={l.label} style={{ ...s.quickCard, borderColor: l.color + '44' }}>
                      <div style={{ ...s.quickIconBig, background: l.color + '22', color: l.color }}>{l.icon}</div>
                      <div style={s.quickLabel}>{l.label}</div>
                      <div style={s.quickDesc}>{l.desc}</div>
                      <button
                        style={{ ...s.quickBtn, background: l.color + '22', color: l.color }}
                        onClick={() => targetTab ? setActiveTab(targetTab) : null}
                      >바로가기 →</button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── 전자결재 탭 ── */}
        {activeTab === 'approval' && (
          <div style={s.content}><ApprovalPanel /></div>
        )}

        {/* ── 근태관리 탭 ── */}
        {activeTab === 'attendance' && (
          <div style={s.content}><AttendancePanel /></div>
        )}

        {/* ── 자료실 탭 ── */}
        {activeTab === 'documents' && (
          <div style={s.content}><DocumentPanel /></div>
        )}
      </main>

      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
        @keyframes float1 { 0%,100%{transform:translateY(0);}50%{transform:translateY(-25px);} }
        @keyframes float2 { 0%,100%{transform:translateY(0);}50%{transform:translateY(20px);} }
      `}</style>
    </div>
  );
};

/* ── 스타일 ── */
const s = {
  root: { display:'flex', minHeight:'100vh', background:'linear-gradient(135deg,#0f172a,#1e293b)', fontFamily:"'Inter',sans-serif", position:'relative', overflow:'hidden' },
  bgOrb1: { position:'absolute',top:'-150px',right:'-150px',width:'500px',height:'500px',borderRadius:'50%',background:'radial-gradient(circle,rgba(56,189,248,0.12) 0%,transparent 70%)',animation:'float1 9s ease-in-out infinite',pointerEvents:'none' },
  bgOrb2: { position:'absolute',bottom:'-120px',left:'100px',width:'400px',height:'400px',borderRadius:'50%',background:'radial-gradient(circle,rgba(99,102,241,0.1) 0%,transparent 70%)',animation:'float2 11s ease-in-out infinite',pointerEvents:'none' },
  sidebar: { width:'240px',flexShrink:0,background:'rgba(255,255,255,0.04)',borderRight:'1px solid rgba(255,255,255,0.08)',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'24px 16px',zIndex:10 },
  sideTop: { display:'flex',flexDirection:'column',gap:'24px' },
  sideLogoWrap: { display:'flex',alignItems:'center',gap:'12px' },
  sideLogoIcon: { width:'42px',height:'42px',borderRadius:'10px',background:'linear-gradient(135deg,#0EA5E9,#6366F1)',display:'flex',alignItems:'center',justifyContent:'center' },
  sideLogoTitle: { fontSize:'18px',fontWeight:800,color:'white' },
  sideLogoBadge: { fontSize:'10px',color:'rgba(255,255,255,0.4)',marginTop:'2px' },
  userCard: { background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'12px',padding:'14px',display:'flex',gap:'12px',alignItems:'center' },
  userAvatar: { width:'40px',height:'40px',borderRadius:'10px',background:'linear-gradient(135deg,#6366F1,#0EA5E9)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:700,color:'white',flexShrink:0 },
  userName: { fontSize:'14px',fontWeight:600,color:'white' },
  userRole: { fontSize:'11px',color:'rgba(255,255,255,0.45)',marginTop:'2px' },
  nav: { display:'flex',flexDirection:'column',gap:'4px' },
  navBtn: { display:'flex',alignItems:'center',gap:'10px',padding:'11px 14px',borderRadius:'10px',border:'none',background:'transparent',color:'rgba(255,255,255,0.55)',fontSize:'14px',fontWeight:500,cursor:'pointer',textAlign:'left',transition:'all 0.2s' },
  navBtnActive: { background:'rgba(14,165,233,0.15)',color:'#38BDF8',fontWeight:600 },
  sideBottom: { display:'flex',flexDirection:'column',gap:'10px' },
  sideLink: { fontSize:'12px',color:'rgba(255,255,255,0.35)',textDecoration:'none',textAlign:'center' },
  logoutBtn: { padding:'10px',border:'1px solid rgba(239,68,68,0.3)',borderRadius:'10px',background:'rgba(239,68,68,0.08)',color:'#fca5a5',fontSize:'13px',cursor:'pointer' },
  main: { flex:1,display:'flex',flexDirection:'column',overflow:'auto' },
  topbar: { display:'flex',justifyContent:'space-between',alignItems:'center',padding:'24px 32px',borderBottom:'1px solid rgba(255,255,255,0.06)' },
  topbarTitle: { fontSize:'22px',fontWeight:700,color:'white',margin:0 },
  topbarDate: { fontSize:'13px',color:'rgba(255,255,255,0.4)',marginTop:'4px' },
  topbarRight: { display:'flex',alignItems:'center',gap:'12px' },
  topbarAvatar: { width:'36px',height:'36px',borderRadius:'10px',background:'linear-gradient(135deg,#6366F1,#0EA5E9)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:700,color:'white' },
  topbarLogout: { display:'none' },
  content: { padding:'28px 32px',display:'flex',flexDirection:'column',gap:'20px',animation:'fadeIn 0.3s ease-out' },
  welcomeBanner: { background:'linear-gradient(135deg,rgba(14,165,233,0.2),rgba(99,102,241,0.2))',border:'1px solid rgba(56,189,248,0.25)',borderRadius:'16px',padding:'24px 28px',display:'flex',justifyContent:'space-between',alignItems:'center' },
  welcomeText: { fontSize:'20px',fontWeight:700,color:'white' },
  welcomeSub: { fontSize:'13px',color:'rgba(255,255,255,0.55)',marginTop:'6px' },
  welcomeIcon: { fontSize:'40px' },
  summaryGrid: { display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px' },
  summaryCard: { background:'rgba(255,255,255,0.05)',border:'1px solid',borderRadius:'14px',padding:'20px',display:'flex',flexDirection:'column',gap:'6px' },
  summaryIcon: { fontSize:'24px' },
  summaryValue: { fontSize:'28px',fontWeight:700 },
  summaryUnit: { fontSize:'14px',marginLeft:'4px' },
  summaryLabel: { fontSize:'13px',color:'rgba(255,255,255,0.45)' },
  homeGrid: { display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px' },
  panel: { background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'16px',padding:'24px' },
  panelHeader: { display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'18px' },
  panelTitle: { fontSize:'15px',fontWeight:600,color:'white' },
  moreBtn: { fontSize:'12px',color:'#38BDF8',background:'none',border:'none',cursor:'pointer' },
  noticeRowSmall: { display:'flex',alignItems:'center',gap:'10px',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.05)' },
  noticeTagSmall: { fontSize:'10px',padding:'2px 8px',borderRadius:'20px',fontWeight:600,flexShrink:0 },
  noticeTitleSmall: { fontSize:'13px',color:'rgba(255,255,255,0.75)',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' },
  noticeDateSmall: { fontSize:'11px',color:'rgba(255,255,255,0.3)',flexShrink:0 },
  quickGrid2: { display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px' },
  quickCardSmall: { background:'rgba(255,255,255,0.05)',border:'1px solid',borderRadius:'10px',padding:'12px',display:'flex',alignItems:'center',gap:'8px',cursor:'pointer' },
  quickIconSmall: { fontSize:'20px' },
  quickLabelSmall: { fontSize:'13px',color:'white',fontWeight:500 },
  table: { width:'100%',borderCollapse:'collapse' },
  th: { padding:'10px 16px',textAlign:'left',fontSize:'12px',color:'rgba(255,255,255,0.4)',fontWeight:600,borderBottom:'1px solid rgba(255,255,255,0.08)',letterSpacing:'0.5px' },
  tr: { borderBottom:'1px solid rgba(255,255,255,0.05)' },
  td: { padding:'14px 16px',fontSize:'13px',color:'rgba(255,255,255,0.6)' },
  newBadge: { background:'rgba(14,165,233,0.2)',color:'#38BDF8',fontSize:'9px',padding:'2px 6px',borderRadius:'4px',marginRight:'8px',fontWeight:700 },
  quickGrid: { display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px' },
  quickCard: { background:'rgba(255,255,255,0.05)',border:'1px solid',borderRadius:'14px',padding:'24px 20px',display:'flex',flexDirection:'column',alignItems:'center',gap:'10px',textAlign:'center' },
  quickIconBig: { width:'52px',height:'52px',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px' },
  quickLabel: { fontSize:'15px',fontWeight:600,color:'white' },
  quickDesc: { fontSize:'12px',color:'rgba(255,255,255,0.4)' },
  quickBtn: { padding:'7px 20px',borderRadius:'8px',border:'none',fontSize:'12px',fontWeight:600,cursor:'pointer',marginTop:'4px' },
  navGroup: { fontSize:'10px',color:'rgba(255,255,255,0.25)',fontWeight:700,letterSpacing:'1px',padding:'4px 14px',textTransform:'uppercase' },
};

export default EmployeePage;
