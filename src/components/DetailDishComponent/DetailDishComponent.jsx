import React, { useEffect, useState } from 'react'
import { Col, Row, Image, Button, Progress, Card} from 'antd';
import { PlusOutlined, MinusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import * as DishService from '../../services/DishService'
import * as UserService from '../../services/UserService'
import styles from './style.module.css'
import app from '../../config/firebase'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import imgBicycle from '../../image/img_bycicle.png'
import imgRun from '../../image/img_running.png'
import imgJump from '../../image/img_jump.png'
import imgWalk from '../../image/img_walking.png'
import imgNutri from '../../image/img_nutrition.png'
import imgIngr from '../../image/img_ingre.png'
import imgRecipe from '../../image/img_recipe_book.png'
import imgExer from '../../image/img_exercise.png'

const DetailDishComponent = ({idDish}) => {

    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);
    const [dish, setDish] = useState([]);
    const navigate = useNavigate()

    const getDish = async () => {
        setDish( await DishService.getDishtById(idDish));
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
        getDish()
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
                        <Image src={dish.img} alt="img" preview={false}/>
                    </Col>
                    <Col span={14}>
                        <div className={styles.wrap_detail_product}>
                            <h1 className={styles.name}>{dish.name}</h1>
                            <div className={styles.flex2}>
                                <img className={styles.img_deco1} alt="example" src={imgNutri} />
                                <p className={styles.txt}>Thông tin dinh dưỡng tính trên một khẩu phần ăn</p>
                            </div>
            
                            <div>
                                <div className={styles.nutri} >
                                    <p className={styles.deco1}>Calories</p>
                                    <p className={styles.info_dish}>{dish.calo}kcal</p>
                                    <Progress percent={100} size={[200, 10]} />
                        
                                </div>
                                <div className={styles.nutri}>
                                    <p className={styles.deco1}>Chất béo</p>
                                    <p className={styles.info_dish}>{dish.fat}g</p>
                                    <Progress percent={parseInt(dish.fat*100/(dish.fat+dish.protein+dish.carb))} size={[200, 10]} />
                                </div>
                                <div className={styles.nutri}>
                                    <p className={styles.deco1}>Protein</p>
                                    <p className={styles.info_dish}>{dish.protein}g</p>
                                    <Progress percent={parseInt(dish.protein*100/(dish.fat+dish.protein+dish.carb))} size={[200, 10]} />
                                </div>
                                <div className={styles.nutri}>
                                    <p className={styles.deco1}>Carbs</p>
                                    <p className={styles.info_dish}>{dish.carb}g</p>
                                    <Progress percent={parseInt(dish.carb*100/(dish.fat+dish.protein+dish.carb))} size={[200, 10]} />
                                </div>
                            </div>
                        </div>
                    </Col>    
                </Row>
                <div className={styles.flex1}>
                    <img className={styles.img_deco1} alt="example" src={imgIngr} />
                    <p className={styles.txt}>Nguyên liệu</p>
                </div>
                <Card hoverable>
                    {dish.ingredient? dish.ingredient.map((ingredient) => {
                        return (
                            <p className={styles.txt_ingr}>{ingredient}</p>
                        )
                    }) : ""}
                </Card>
                
                <div className={styles.flex1}>
                    <img className={styles.img_deco1} alt="example" src={imgRecipe} />
                    <p className={styles.txt}>Công thức</p>
                </div>
                <Card hoverable>
                    {dish.recipe? dish.recipe.map((recipe) => {
                        return (
                            <p className={styles.txt_ingr}>{recipe}</p>
                        )
                    }) : ""}
                </Card>
                <div className={styles.flex1}>
                    <img className={styles.img_deco1} alt="example" src={imgExer} />
                    <p className={styles.txt}>Để tiêu thụ {dish.calo} kcal</p>
                </div>
                    <div className={styles.nutri} >
                        <Card hoverable>
                            <div className={styles.info_ex}>
                                <img className={styles.img_deco} alt="example" src={imgBicycle} />
                                <p>Đạp xe</p>
                                <p className={styles.time} >{calTimeBicycle(dish.calo)} phút</p>
                            </div>
                        </Card>
                        <Card hoverable>
                            <div className={styles.info_ex}>
                                <img className={styles.img_deco} alt="example" src={imgRun} />
                                <p>Chạy bộ</p>
                                <p className={styles.time} >{calTimeRun(dish.calo)} phút</p>
                            </div>
                        </Card>
                        <Card hoverable>
                            <div className={styles.info_ex}>
                                <img className={styles.img_deco} alt="example" src={imgWalk} />
                                <p>Đi bộ</p>
                                <p className={styles.time} >{calTimeWalking(dish.calo)} phút</p>
                            </div>
                        </Card>
                        <Card hoverable>
                            <div className={styles.info_ex}>
                                <img className={styles.img_deco} alt="example" src={imgJump} />
                                <p>Nhảy dây</p>
                                <p className={styles.time} >{calTimeJump(dish.calo)} phút</p>
                            </div>
                        </Card>
                        
                    </div>
            </div>
        </div>
    )
}
export default DetailDishComponent