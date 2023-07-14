import React from "react";
import styles from './style.module.css'
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom'

const CardSuggestIngredientComponent = (props) => {

    const { id, name, calo, img } = props
    const navigate = useNavigate()
    

    return(
        <Card hoverable className={styles.card}>
            <div className={styles.info_ingr}>
                <input type="checkbox" value={id}></input>
                <img className={styles.ingr_img} alt="ingredient_img" src={img} />
                <p className={styles.ingr_name} >{name}</p>
                <p className={styles.deco}><span className={styles.ingr_calo}>{calo}kcal</span>/100g</p>
            </div>
        </Card>
    )
}
export default CardSuggestIngredientComponent