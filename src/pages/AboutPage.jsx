import React from 'react';
import { Helmet } from 'react-helmet-async';
import AboutUs from '../components/sections/AboutUs';
import BrochureViewer from '../components/sections/BrochureViewer';
import OrganizationChart from '../components/sections/OrganizationChart';
import Certifications from '../components/sections/Certifications';

const AboutPage = () => {
  return (
    <div className="pt-20">
      <Helmet>
        <title>BA TECH - About Us</title>
      </Helmet>
      <AboutUs />
      <BrochureViewer />
      <OrganizationChart />
      <Certifications />
    </div>
  );
};

export default AboutPage;
