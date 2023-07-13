import React from "react";
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import UserInfoComponent from "../../components/UserInfoComponent/UserInfoComponent";
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import styles from './style.module.css'

const DetailProductPage = () => {
    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>
            <UserInfoComponent/>
            <FooterComponent/>
        </div>
        
    )
}
export default DetailProductPage