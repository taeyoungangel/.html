import React, { createContext, useContext, useState } from 'react';

// ─────────────────────────────────────────────
// 데모 계정 목록 (하드코딩)
// ─────────────────────────────────────────────
const DEMO_ACCOUNTS = [
  {
    id: 'batech1234',
    password: 'batech1234@',
    name: '관리자',
    role: '시스템 관리자',
    department: '경영지원팀',
    avatar: 'BA',
  },
];

const SESSION_KEY = 'emp_portal_session';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // ─── 지연 초기화: 첫 렌더 시점에 sessionStorage를 동기적으로 읽음 ───
  // useEffect 방식은 렌더 후 실행되므로 ProtectedRoute가 먼저
  // isAuthenticated=false로 판단해 Login으로 튕기는 문제가 발생함.
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) !== null;
    } catch {
      return false;
    }
  });

  const login = (inputId, inputPassword) => {
    const found = DEMO_ACCOUNTS.find(
      (acc) => acc.id === inputId && acc.password === inputPassword
    );
    if (found) {
      const { password: _, ...safeUser } = found; // 비밀번호 제외
      setUser(safeUser);
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
      return { success: true };
    }
    return { success: false, message: '아이디 또는 비밀번호가 올바르지 않습니다.' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
