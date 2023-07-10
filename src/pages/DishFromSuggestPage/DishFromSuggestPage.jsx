import React, { useEffect, useState } from 'react';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import LishDishSuggestComponent from "../../components/LishDishSuggestComponent/LishDishSuggestComponent";
import { useParams } from 'react-router-dom';

const DishFromSuggestPage = () => {

  return (
    <div>
      <HeaderComponent/>
      <NavComponent/>
      <LishDishSuggestComponent/>
    </div>
  );
}

export default DishFromSuggestPage;