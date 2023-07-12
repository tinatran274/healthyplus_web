import React, { useEffect, useState } from 'react'
import { Col, Row, Image, Button, Progress, Card} from 'antd';
import * as IngredientService from '../../services/IngredientService'
import * as UserService from '../../services/UserService'
import styles from './style.module.css'
import app from '../../config/firebase'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import imgBicycle from '../../image/img_bycicle.png'
import imgRun from '../../image/img_running.png'
import imgJump from '../../image/img_jump.png'
import imgWalk from '../../image/img_walking.png'
import imgExer from '../../image/img_exercise.png'
import imgNutri from '../../image/img_nutrition.png'

const DetailIngredientComponent = ({idIngredient}) => {

    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);
    const [ingredient, setIngredient] = useState([]);
    const navigate = useNavigate()

    const getIngredient = async () => {
        setIngredient( await IngredientService.getIngredientById(idIngredient));
    }
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
        getIngredient()
    }, [])
    function calTimeBicycle(calories) {    
        const time = (calories / 7).toFixed(2);    
        return time;
    }
    function calTimeRun(calories) {    
        const time = (calories / 10).toFixed(2);    
        return time;
    }
    function calTimeWalking(calories) {    
        const time = (calories / 5).toFixed(2);    
        return time;
    }
    function calTimeJump(calories) {    
        const time = (calories / 12).toFixed(2);    
        return time;
    }

    return(
        <div className={styles.main_pro}>
            <div>
                <Row>
                    <Col span={10}>
                        <Image src={ingredient.img} alt="img" preview={false}/>
                    </Col>
                    <Col span={14}>
                        <div className={styles.wrap_detail_product}>
                            <h1 className={styles.name}>{ingredient.name}</h1>
                            <div className={styles.flex1}>
                                <img className={styles.img_deco1} alt="example" src={imgNutri} />
                                <p className={styles.txt}>Thông tin dinh dưỡng tính trên 100 gram</p>
                            </div>
                            <div>
                                <div className={styles.nutri} >
                                    <p className={styles.deco1}>Calories</p>
                                    <p className={styles.info_ingr}>{ingredient.calo}kcal</p>
                                    <Progress percent={100} size={[200, 10]} />
                        
                                </div>
                                <div className={styles.nutri}>
                                    <p className={styles.deco1}>Chất béo</p>
                                    <p className={styles.info_ingr}>{ingredient.fat}g</p>
                                    <Progress percent={parseInt(ingredient.fat*100/(ingredient.fat+ingredient.protein+ingredient.carb))} size={[200, 10]} />
                                </div>
                                <div className={styles.nutri}>
                                    <p className={styles.deco1}>Protein</p>
                                    <p className={styles.info_ingr}>{ingredient.protein}g</p>
                                    <Progress percent={parseInt(ingredient.protein*100/(ingredient.fat+ingredient.protein+ingredient.carb))} size={[200, 10]} />
                                </div>
                                <div className={styles.nutri}>
                                    <p className={styles.deco1}>Carbs</p>
                                    <p className={styles.info_ingr}>{ingredient.carb}g</p>
                                    <Progress percent={parseInt(ingredient.carb*100/(ingredient.fat+ingredient.protein+ingredient.carb))} size={[200, 10]} />
                                </div>
                            </div>
                        </div>
                    </Col>    
                </Row>
                <div className={styles.flex1}>
                    <img className={styles.img_deco1} alt="example" src={imgExer} />
                    <p className={styles.txt}>Để tiêu thụ {ingredient.calo} kcal</p>
                </div>
                    <div className={styles.nutri} >
                        <Card hoverable>
                            <div className={styles.info_ex}>
                                <img className={styles.img_deco} alt="example" src={imgBicycle} />
                                <p>Đạp xe</p>
                                <p className={styles.time} >{calTimeBicycle(ingredient.calo)} phút</p>
                            </div>
                        </Card>
                        <Card hoverable>
                            <div className={styles.info_ex}>
                                <img className={styles.img_deco} alt="example" src={imgRun} />
                                <p>Chạy bộ</p>
                                <p className={styles.time} >{calTimeRun(ingredient.calo)} phút</p>
                            </div>
                        </Card>
                        <Card hoverable>
                            <div className={styles.info_ex}>
                                <img className={styles.img_deco} alt="example" src={imgWalk} />
                                <p>Đi bộ</p>
                                <p className={styles.time} >{calTimeWalking(ingredient.calo)} phút</p>
                            </div>
                        </Card>
                        <Card hoverable>
                            <div className={styles.info_ex}>
                                <img className={styles.img_deco} alt="example" src={imgJump} />
                                <p>Nhảy dây</p>
                                <p className={styles.time} >{calTimeJump(ingredient.calo)} phút</p>
                            </div>
                        </Card>
                        
                    </div>
            </div>
        </div>
    )
}
export default DetailIngredientComponent