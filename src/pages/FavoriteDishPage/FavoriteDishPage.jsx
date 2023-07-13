import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import CardDishComponent from "../../components/CardDishComponent/CardDishComponent.jsx";
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import styles from './style.module.css'
import * as DishService from '../../services/DishService.js'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { Col, Input, message, Popconfirm  } from 'antd'
import { useNavigate } from 'react-router-dom';

const FavoriteDishPage = () => {

    const auth = getAuth(app);
    const navigate = useNavigate()
    const { Search } = Input;
    const onSearch = (value) => console.log(value);
    const [userData, setUserData] = useState(null);
    const [listDish, setListDish] = useState([]);

    const handleAuth = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await UserService.getDetailUser(user.uid);
                setUserData(userData)
                setListDish( await DishService.getDetailDishFavo(user.uid));
            }
            else
                console.log("Chưa đăng nhập");
        });
    }
    // const handleAddDish = async () => {
    //     console.log('add')
    //     await DishService.addDish();
    // }
    useEffect(() => {
        handleAuth()
    }, [])


    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>
            <div className={styles.wrap}>
                <div className={styles.list}>
                    {listDish.map((dish) => {
                        return (
                            <CardDishComponent
                                key={dish.id}
                                id={dish.id}
                                name={dish.name}
                                calo={dish.calo}
                                carb={dish.carb}
                                fat={dish.fat}
                                protein={dish.protein}
                                img={dish.img}
                                isFavo={true}
                            />
                        )
                    })}
                </div>
                <div className={styles.search}>
                    <Search id="search" placeholder="input search text" allowClear onSearch={onSearch} />
                </div >
            </div>
            <button className={styles.more_btn}>Xem thêm</button>
            
            <FooterComponent/>
            
        </div>
    )
}
export default FavoriteDishPage