import React from 'react';
import { useAuth } from '../auth/AuthContext';

// 로그인 안 된 상태면 로그인 페이지로 리다이렉트
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    window.location.replace('Login.html');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
