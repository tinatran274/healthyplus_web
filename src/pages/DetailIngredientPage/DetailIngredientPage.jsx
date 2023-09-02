import React, { useState, useEffect } from "react";
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import DetailIngredientComponent from "../../components/DetailIngredientComponent/DetailIngredientComponent";
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import styles from './style.module.css'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useNavigate, useParams } from 'react-router-dom';

const DetailIngredientPage = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // Smooth scrolling animation
        });
      };
    
      useEffect(() => {
        scrollToTop();
        
      }, []);
    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>

            <DetailIngredientComponent idIngredient={id}/>
            <FooterComponent/>
        </div>
    )
}
export default DetailIngredientPage