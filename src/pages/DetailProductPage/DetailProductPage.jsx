import React, { useState, useEffect } from "react";
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import DetailProductComponent from "../../components/DetailProductComponent/DetailProductComponent";
import styles from './style.module.css'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useNavigate, useParams } from 'react-router-dom';

const DetailProductPage = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>
            <DetailProductComponent idProduct={id}/></div>
    )
}
export default DetailProductPage