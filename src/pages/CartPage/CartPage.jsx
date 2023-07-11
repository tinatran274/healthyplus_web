import React, { useEffect, useState, useMemo } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import ListItemCartComponent from "../../components/ListItemCartComponent/ListItemCartComponent";
import styles from './style.module.css'
import { PlusOutlined, MinusOutlined, DeleteOutlined  } from '@ant-design/icons';
import { Button, Card, Image } from 'antd';
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import { useLocation, useNavigate } from 'react-router-dom'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const CartPage = () => {
    
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
    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>
            <ListItemCartComponent/>
            
        </div>
    )
}
export default CartPage