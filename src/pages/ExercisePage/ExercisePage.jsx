import React from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import ExerciseComponent from "../../components/ExerciseComponent/ExerciseComponent.jsx";
import FooterComponent from '../../components/FooterComponent/FooterComponent'

const ExercisePage = () => {

    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>
            <ExerciseComponent/>
            <FooterComponent/>
        </div>
    )
}
export default ExercisePage