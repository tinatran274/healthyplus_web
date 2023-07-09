import React from "react";
import styles from './style.module.css'
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom'

const CardIngredientComponent = (props) => {

    const { id, name, calo, img } = props
    const navigate = useNavigate()

    const handleDetailsIngredient = (id) => {
        navigate(`/detail_ingredient/${id}`)
    }
    return(
        <Card hoverable  onClick={() =>  handleDetailsIngredient(id)}>
            <div className={styles.info_ingr}>
                <img className={styles.ingr_img} alt="ingredient_img" src={img} />
                <p className={styles.ingr_name} >{name}</p>
                <p><span className={styles.ingr_calo}>{calo}kcal</span>/100g</p>
            </div>
        </Card>
    )
}
export default CardIngredientComponent