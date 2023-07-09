import React, { useState, useEffect } from "react";
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import DetailIngredientComponent from "../../components/DetailIngredientComponent/DetailIngredientComponent";
import styles from './style.module.css'
import * as message from '../../components/MessageComponent/MessageComponent'
import { useNavigate, useParams } from 'react-router-dom';

const DetailIngredientPage = () => {
    const navigate = useNavigate();
    const {id} = useParams()
    
    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>

            <DetailIngredientComponent idIngredient={id}/>
        </div>
    )
}
export default DetailIngredientPage