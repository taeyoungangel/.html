import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingCTA from '../components/ui/FloatingCTA';

const Layout = ({ children }) => {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';
  const isHome = filename === 'index.html' || filename === '' || path === '/';

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {!isHome && <Footer />}
      {!isHome && <FloatingCTA />}
    </div>
  );
};

export default Layout;
