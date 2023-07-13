import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import ListIngredientForComponent from "../../components/ListIngredientForComponent/ListIngredientForComponent.jsx";
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import styles from './style.module.css'
import * as IngredientService from '../../services/IngredientService'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { Col, Input, message, Popconfirm  } from 'antd'

const SuggestDishPage = () => {

    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);

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

    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>
            <ListIngredientForComponent/>
            <FooterComponent/>
        </div>
    )
}
export default SuggestDishPage