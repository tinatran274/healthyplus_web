import React from "react";
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import ChangCaloriesComponent from "../../components/ChangCaloriesComponent/ChangCaloriesComponent";
import StatisticCaloriesComponent from "../../components/StatisticCaloriesComponent/StatisticCaloriesComponent";
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import styles from './style.module.css'


const ControlCaloriesPage = () => {
    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>
            <ChangCaloriesComponent/>
            <StatisticCaloriesComponent/>
            <FooterComponent/>
        </div>
    )
}
export default ControlCaloriesPage