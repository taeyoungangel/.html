import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import PromoVideo from '../components/sections/PromoVideo';
import CardNewsSlider from '../components/sections/CardNewsSlider';

const HomePage = () => {
  return (
    <div className="overflow-x-hidden min-h-screen">
      <Helmet>
        <title>BA TECH - 산업용 펌프 및 설비 엔지니어링</title>
      </Helmet>
      <Hero />
      <PromoVideo />
      <CardNewsSlider />
    </div>
  );
};

export default HomePage;
