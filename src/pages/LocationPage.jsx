import React from 'react';
import { Helmet } from 'react-helmet-async';
import Location from '../components/sections/Location';

const LocationPage = () => {
  return (
    <div className="pt-20">
      <Helmet>
        <title>BA TECH - 오시는 길</title>
      </Helmet>
      <Location />
    </div>
  );
};

export default LocationPage;
