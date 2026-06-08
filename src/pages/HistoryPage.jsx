import React from 'react';
import { Helmet } from 'react-helmet-async';
import History from '../components/sections/History';
import BusinessPerformance from '../components/sections/BusinessPerformance';

const HistoryPage = () => {
  return (
    <div className="pt-20">
      <Helmet>
        <title>BA TECH - 연혁 & 사업실적</title>
      </Helmet>
      <History />
      <BusinessPerformance />
    </div>
  );
};

export default HistoryPage;
