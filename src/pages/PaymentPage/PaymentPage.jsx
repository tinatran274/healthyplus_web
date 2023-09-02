import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import DetailPayment from "../../components/DetailPayment/DetailPayment.jsx";
import FooterComponent from '../../components/FooterComponent/FooterComponent'

import { useParams } from 'react-router-dom';

const PaymentPage = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling animation
    });
  };

  useEffect(() => {
    scrollToTop();
    
  }, []);
  return (
    <div>
      <HeaderComponent/>
      <NavComponent/>
      <DetailPayment/>
    </div>
  );
}

export default PaymentPage;