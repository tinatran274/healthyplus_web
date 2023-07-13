import React, { useState, useEffect } from "react";
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import DetailTechnologyProductComponent from "../../components/DetailTechnologyProductComponent/DetailTechnologyProductComponent.jsx";
import CommentTechnologyProductComponent from "../../components/CommentTechnologyProductComponent/CommentTechnologyProductComponent.jsx";
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import styles from './style.module.css'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useNavigate, useParams } from 'react-router-dom';

const DetailTechnologyProductPage = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>
            <DetailTechnologyProductComponent idProduct={id}/>
            <CommentTechnologyProductComponent idProduct={id}/>
            <FooterComponent/>
        </div>
    )
}
export default DetailTechnologyProductPage