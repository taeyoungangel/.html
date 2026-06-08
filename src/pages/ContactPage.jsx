import React from 'react';
import { Helmet } from 'react-helmet-async';
import Contact from '../components/sections/Contact';

const ContactPage = () => {
  return (
    <div className="pt-20">
      <Helmet>
        <title>BA TECH - 고객 문의</title>
      </Helmet>
      <Contact />
    </div>
  );
};

export default ContactPage;
