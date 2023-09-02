import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import LishDishSuggestComponent from "../../components/LishDishSuggestComponent/LishDishSuggestComponent";
import FooterComponent from '../../components/FooterComponent/FooterComponent'

import { useParams } from 'react-router-dom';

const DishFromSuggestPage = () => {


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
      <LishDishSuggestComponent/>
      <FooterComponent/>
    </div>
  );
}

export default DishFromSuggestPage;