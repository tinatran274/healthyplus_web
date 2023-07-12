import React, { useState, useEffect } from "react";
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import DetailDishComponent from "../../components/DetailDishComponent/DetailDishComponent.jsx";
import CommentDishComponent from "../../components/CommentDishComponent/CommentDishComponent";
import styles from './style.module.css'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useNavigate, useParams } from 'react-router-dom';

const DetailDishPage = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    
    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>
            <DetailDishComponent idDish={id}/>
            <CommentDishComponent idDish={id}/>
        </div>
    )
}
export default DetailDishPage