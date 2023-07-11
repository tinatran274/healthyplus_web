import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from '../../image/slider1.png'
import slider2 from '../../image/slider2.png'
import slider3 from '../../image/slider3.png'
import ListProductComponent from "../../components/ListProductComponent/ListProductComponent";
import styles from './style.module.css'
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const HomePage = () => {

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
            <SliderComponent arrImage={[slider1, slider2, slider3]}/>
            <ListProductComponent/>
            
        </div>
    )
}
export default HomePage