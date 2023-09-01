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
import imgIngr from "../../image/img_premium.png";
import imgUnlock from "../../image/img_unlocked.png";


const LockRecommendDishComponent = () => {
  const auth = getAuth(app);

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [tdee, setTDEE] = useState(1);
  const [aim, setAim] = useState('');
  const [state, setState] = useState('');
 

  const handleAuth = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await UserService.getDetailUser(user.uid);
        const userFavo = await DishService.getDishFavo(user.uid);
        setUserData(userData)
        setAim(userData.getAim())
        setTDEE(userData.getTDEE());
        if(userData.getAim() == "Tăng cân")
          setState("nhiều hơn")
        else if(userData.getAim() == "Giảm cân")
          setState("ít hơn")
        else 
        setState("khoảng")
        
      } else console.log("Chưa đăng nhập");
    });
  };
  
  useEffect(() => {
    handleAuth();
    
  }, []);

  
  return (
    <div className={styles.wrap}>
        <div className={styles.info}>
            <p>Mục tiêu của bạn là: <span className={styles.span}>{aim}</span></p>
            <p>Bạn cần ăn {state} <span className={styles.span}>{tdee}</span> kcal/ngày</p>
            <div className={styles.flex1}>
                <img className={styles.img_deco1} alt="example" src={imgIngr} />
                <p className={styles.txt}>Mở khóa Premium để xem gợi ý thực đơn ngày hôm nay</p>
            </div>
        </div>
        
    </div>
  );
}

  
export default LockRecommendDishComponent;
