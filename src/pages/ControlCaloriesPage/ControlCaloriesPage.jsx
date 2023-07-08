import React from "react";
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import ChangCaloriesComponent from "../../components/ChangCaloriesComponent/ChangCaloriesComponent";
import styles from './style.module.css'


const ControlCaloriesPage = () => {
    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>
            <ChangCaloriesComponent/>
        </div>
    )
}
export default ControlCaloriesPage