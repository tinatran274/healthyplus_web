import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom'
import imgFavo from '../../image/img_favo.png'
import imgUnfavo from '../../image/img_unfavo.png'
import app from '../../config/firebase'
import * as UserService from '../../services/UserService'
import * as DishService from '../../services/DishService.js'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";


const CardDishComponent = (props) => {

    const { id, name, calo, carb, fat, protein, img, isFavo} = props
    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate()


    const handleAuth = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await UserService.getDetailUser(user.uid);
                setUserData(userData)
            }
            else
                console.log("Chưa đăng nhập");
        });
    }

    useEffect(() => {
        handleAuth()
    }, [])

    const handleDetailsDish = (id) => {
        navigate(`/detail_dish/${id}`)
    }
    return(
        <div className={styles.info_dish}>
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
        <img className={styles.img_favo} alt="unfavo" src={isFavo?imgFavo:imgUnfavo}/> 
        </div>
    )
}
export default CardDishComponent