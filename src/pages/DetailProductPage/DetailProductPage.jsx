import React, { useState, useEffect } from "react";
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import DetailProductComponent from "../../components/DetailProductComponent/DetailProductComponent";
import CommentProductComponent from "../../components/CommentProductComponent/CommentProductComponent";
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import styles from './style.module.css'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useNavigate, useParams } from 'react-router-dom';

const DetailProductPage = () => {
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
            <DetailProductComponent idProduct={id}/>
            <CommentProductComponent idProduct={id}/>
            <FooterComponent/>
        </div>
    )
}
export default DetailProductPage