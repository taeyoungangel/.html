import React from 'react';
import { Helmet } from 'react-helmet-async';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <Helmet>
        <title>404 - 페이지를 찾을 수 없습니다</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-secondary mb-6">페이지를 찾을 수 없습니다.</h2>
        <p className="text-slate-600 mb-8">
          요청하신 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.
        </p>
        <a
          href="index.html"
          className="inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
