import React from "react";
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import ChangeWaterComponent from "../../components/ChangeWaterComponent/ChangeWaterComponent";
import StatisticWaterComponent from "../../components/StatisticWaterComponent/StatisticWaterComponent";
import FooterComponent from '../../components/FooterComponent/FooterComponent'


const ControlWaterPage = () => {
    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>
            <ChangeWaterComponent/>
            <StatisticWaterComponent/>
            <FooterComponent/>
        </div>
    )
}
export default ControlWaterPage