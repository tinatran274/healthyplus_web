import React from "react";
import styles from './style.module.css'
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom'

const CardDishComponent = (props) => {

    const { id, name, calo, carb, fat, protein, img } = props
    const navigate = useNavigate()

    const handleDetailsDish = (id) => {
        navigate(`/detail_dish/${id}`)
    }
    return(
        <Card hoverable  onClick={() =>  handleDetailsDish(id)}>
            <div className={styles.info_dish}>
                <img className={styles.dish_img} alt="dish_img" src={img} />
                <p className={styles.dish_name} >{name}</p>
                <div className={styles.nutri} >
                    <p>Calories</p>
                    <p className={styles.data}>{calo}kcal</p>
                </div>
                <div className={styles.nutri}>
                    <p>Chất béo</p>
                    <p className={styles.data}>{fat}g</p>
                </div>
                <div className={styles.nutri}>
                    <p>Protein</p>
                    <p className={styles.data}>{protein}g</p>
                </div>
                <div className={styles.nutri}>
                    <p>Carbs</p>
                    <p className={styles.data}>{carb}g</p>  
                </div>
                
            </div>
        </Card>
    )
}
export default CardDishComponent