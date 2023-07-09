import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import CardIngredientComponent from "../../components/CardIngredientComponent/CardIngredientComponent";
import styles from './style.module.css'
import * as IngredientService from '../../services/IngredientService'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { Col, Input, message, Popconfirm  } from 'antd'

const IngredientPage = () => {

    const { Search } = Input;
    const onSearch = (value) => console.log(value);
    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);
    const [listIngredient, setListIngredient] = useState([]);

    const getListIngredient = async () => {
        setListIngredient( await IngredientService.getAllIngredient());
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
    if(listIngredient) {
        var newArray = listIngredient.map(function(item) {
            return item.name;
          });
        console.log(newArray);
    }

    useEffect(() => {
        handleAuth()
        getListIngredient()
    }, [])

    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>
            <div className={styles.wrap}>
                <div className={styles.list}>
                    {listIngredient.map((ingredient) => {
                        return (
                            <CardIngredientComponent
                                key={ingredient.id}
                                id={ingredient.id}
                                name={ingredient.name}
                                calo={ingredient.calo}
                                img={ingredient.img}
                            />
                        )
                    })}
                </div>
                <div className={styles.search}>
                    <Search id="search" placeholder="input search text" allowClear onSearch={onSearch} />
                </div >
            </div>
            <button className={styles.more_btn}>Xem thêm</button>
            
        </div>
    )
}
export default IngredientPage