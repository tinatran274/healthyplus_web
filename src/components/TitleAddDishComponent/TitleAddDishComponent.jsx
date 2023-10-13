import React, { useEffect, useState, useMemo } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import * as DishService from "../../services/DishService.js";
import app from "../../config/firebase";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { Card } from 'antd';
import imgIngr from "../../image/img_premium.png";
import imgUser from "../../image/img_user.png";
import imgPhoto from "../../image/img_ff.png";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import * as message from '../../components/MessageComponent/MessageComponent'


const TitleAddDishComponent = () => {
  const auth = getAuth(app);

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
 
  const handleAuth = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await UserService.getDetailUser(user.uid);
        setUserData(userData)

      } else console.log("Chưa đăng nhập");
    });
  };
  
  useEffect(() => {
    handleAuth();
    
  }, []);

  const handleAddDish = () => {
    if(userData.premium == 1)
        navigate("/add_dish");
    else 
        message.warning(`Mở khóa Premium để sử dụng tính năng này`);
  }
  
  return (
    <div hoverable="true" className={styles.wrap}>
        <Card hoverable="true" className={styles.info} onClick={handleAddDish}>
            <div className={styles.flex1}>
                <img className={styles.img_deco1} alt="example" src={imgUser} />
                <p className={styles.te} >Hôm nay bạn sẽ nấu món gì?</p>
                <img className={styles.img_deco1} alt="example" src={imgPhoto} />
            </div>
        </Card>
        
    </div>
  );
}

  
export default TitleAddDishComponent;
