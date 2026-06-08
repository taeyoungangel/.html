import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id.trim() || !password.trim()) {
      setError('아이디와 비밀번호를 모두 입력해 주세요.');
      return;
    }
    setLoading(true);
    setError('');
    // 약간의 딜레이로 자연스러운 인증 느낌 부여
    await new Promise((r) => setTimeout(r, 600));
    const result = login(id.trim(), password);
    if (result.success) {
      window.location.href = 'Employee.html';
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      {/* 배경 장식 */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />
      <div style={styles.bgGrid} />

      <div style={styles.card}>
        {/* 헤더 로고 */}
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="rgba(255,255,255,0.9)" />
              <path d="M12 2L3 7l9 5 9-5-9-5z" fill="white" opacity="0.5" />
            </svg>
          </div>
          <div>
            <div style={styles.logoTitle}>
              <span style={{ color: '#38BDF8' }}>BA</span> TECH
            </div>
            <div style={styles.logoSub}>임직원 전용 포털</div>
          </div>
        </div>

        <h1 style={styles.heading}>로그인</h1>
        <p style={styles.subheading}>회사에서 발급한 계정으로 로그인하세요.</p>

        <form onSubmit={handleSubmit} style={styles.form} noValidate>
          {/* 아이디 */}
          <div style={styles.fieldWrap}>
            <label htmlFor="emp-id" style={styles.label}>아이디</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                id="emp-id"
                type="text"
                value={id}
                onChange={(e) => { setId(e.target.value); setError(''); }}
                placeholder="아이디 입력"
                style={styles.input}
                autoComplete="username"
                disabled={loading}
              />
            </div>
          </div>

          {/* 비밀번호 */}
          <div style={styles.fieldWrap}>
            <label htmlFor="emp-pw" style={styles.label}>비밀번호</label>
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="emp-pw"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="비밀번호 입력"
                style={styles.input}
                autoComplete="current-password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div style={styles.errorBox}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <button
            id="login-submit-btn"
            type="submit"
            style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? (
              <span style={styles.spinnerWrap}>
                <span style={styles.spinner} />
                인증 중...
              </span>
            ) : '로그인'}
          </button>
        </form>

        {/* 계정 안내 */}
        <div style={styles.hintBox}>
          <p style={styles.hintTitle}>🔑 임직원 계정으로 로그인하세요</p>
          <div style={styles.hintTable}>
            <div style={styles.hintRow}>
              <span style={styles.hintKey}>batech1234</span>
              <span style={styles.hintSep}>/</span>
              <span style={styles.hintVal}>batech1234@</span>
              <span style={styles.hintRole}>관리자</span>
            </div>
          </div>
        </div>

        <div style={styles.backLink}>
          <a href="index.html" style={styles.backAnchor}>
            ← 공개 홈페이지로 돌아가기
          </a>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float1 { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-30px) scale(1.05);} }
        @keyframes float2 { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(20px) scale(0.95);} }
        #emp-id:focus, #emp-pw:focus {
          outline: none !important;
          border-color: #38BDF8 !important;
          box-shadow: 0 0 0 3px rgba(56,189,248,0.18) !important;
        }
        #login-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(56,189,248,0.45) !important;
        }
      `}</style>
    </div>
  );
};

// ── 인라인 스타일 ──────────────────────────────
const styles = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f2744 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Inter', sans-serif",
    padding: '24px',
  },
  bgOrb1: {
    position: 'absolute', top: '-120px', right: '-120px',
    width: '500px', height: '500px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)',
    animation: 'float1 8s ease-in-out infinite',
    pointerEvents: 'none',
  },
  bgOrb2: {
    position: 'absolute', bottom: '-150px', left: '-100px',
    width: '450px', height: '450px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
    animation: 'float2 10s ease-in-out infinite',
    pointerEvents: 'none',
  },
  bgGrid: {
    position: 'absolute', inset: 0,
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative', zIndex: 10,
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '24px',
    padding: '48px 44px',
    width: '100%', maxWidth: '440px',
    boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
    animation: 'fadeIn 0.5s ease-out',
  },
  logoWrap: {
    display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px',
  },
  logoIcon: {
    width: '52px', height: '52px', borderRadius: '14px',
    background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(14,165,233,0.4)',
  },
  logoTitle: {
    fontSize: '22px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px',
  },
  logoSub: {
    fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px', letterSpacing: '0.5px',
  },
  heading: {
    fontSize: '28px', fontWeight: 700, color: 'white',
    margin: '0 0 6px 0', letterSpacing: '-0.5px',
  },
  subheading: {
    fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: '0 0 32px 0',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  fieldWrap: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.3px' },
  inputWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: {
    position: 'absolute', left: '14px',
    color: 'rgba(255,255,255,0.35)', pointerEvents: 'none',
    display: 'flex', alignItems: 'center',
  },
  input: {
    width: '100%', padding: '13px 44px 13px 42px',
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px', color: 'white', fontSize: '14px',
    transition: 'all 0.2s', outline: 'none', boxSizing: 'border-box',
  },
  eyeBtn: {
    position: 'absolute', right: '14px', background: 'none',
    border: 'none', cursor: 'pointer', padding: '4px',
    display: 'flex', alignItems: 'center',
  },
  errorBox: {
    display: 'flex', alignItems: 'center', gap: '8px',
    background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '10px', padding: '12px 14px',
    color: '#FCA5A5', fontSize: '13px',
  },
  submitBtn: {
    marginTop: '6px', padding: '15px',
    background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
    border: 'none', borderRadius: '12px', color: 'white',
    fontSize: '15px', fontWeight: 700, cursor: 'pointer',
    transition: 'all 0.2s', boxShadow: '0 4px 20px rgba(14,165,233,0.3)',
    letterSpacing: '0.3px',
  },
  spinnerWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },
  spinner: {
    width: '16px', height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: 'white', borderRadius: '50%',
    display: 'inline-block', animation: 'spin 0.7s linear infinite',
  },
  hintBox: {
    marginTop: '28px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px', padding: '16px 18px',
  },
  hintTitle: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '10px', margin: '0 0 10px 0' },
  hintTable: { display: 'flex', flexDirection: 'column', gap: '6px' },
  hintRow: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' },
  hintKey: { color: '#38BDF8', fontWeight: 600, fontFamily: 'monospace', minWidth: '90px' },
  hintSep: { color: 'rgba(255,255,255,0.2)' },
  hintVal: { color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace', flex: 1 },
  hintRole: {
    background: 'rgba(99,102,241,0.25)', color: '#a5b4fc',
    fontSize: '10px', padding: '2px 8px', borderRadius: '20px', fontWeight: 600,
  },
  backLink: { marginTop: '20px', textAlign: 'center' },
  backAnchor: { color: 'rgba(255,255,255,0.35)', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' },
};

export default LoginPage;
