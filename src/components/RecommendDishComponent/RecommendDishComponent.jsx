import React, { useEffect, useState, useMemo } from "react";
import CardDishComponent from "../../components/CardDishComponent/CardDishComponent.jsx";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import * as DishService from "../../services/DishService.js";
import app from "../../config/firebase";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import imgIngr from "../../image/img_tip.png";
import { Card } from 'antd';

const RecommendDishComponent = () => {
  const auth = getAuth(app);

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [listFavo, setListFavo] = useState([]);
  const [listDish, setListDish] = useState([]);
  const [tdee, setTDEE] = useState(1);
  const [aim, setAim] = useState('');
  const [state, setState] = useState('');

  const getListDish = async () => {
    setListDish(await DishService.getAllDish());
  };

  const handleAuth = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await UserService.getDetailUser(user.uid);
        const userFavo = await DishService.getDishFavo(user.uid);
        setUserData(userData)
        setListFavo(userFavo)
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
    getListDish();
    
  }, []);

  const isFavoriteDish = (did) => {
    if (listFavo !== null) 
      return listFavo.includes(did); // Check for null
    return false;
  };
  

  const recommendDishes = () => {
    const tempList = []; //detail favo list
    let aimList = [];
    let rcmList = [];
  
    listFavo.forEach(favo => {
      const matchingObject = listDish.find(obj => obj.id === favo);
      tempList.push(matchingObject);    
    });
    const matchList = tempList.concat(listDish);

    if(aim == "Tăng cân"){
      matchList.forEach(dish => {
        if(dish.calo >= tdee/3)
          aimList.push(dish);    
      });
    }
    else if (aim == "Giảm cân"){
      matchList.forEach(dish => {
        if(dish.calo <= tdee/3)
          aimList.push(dish);    
      });
    }
    else {
      matchList.forEach(dish => {
        aimList.push(dish);    
      });
    }

    for (let i=0;i<3;i++){
      const randomIndex = Math.floor(Math.random()*aimList.length);
      const removeDish = aimList[randomIndex];
      rcmList.push(removeDish);
      if(removeDish){
        aimList = aimList.filter(item => item.id !== removeDish.id);
      }

      if(aimList.length==0)
        break;
    }
    return rcmList;
    
  };

  const randomDishes = recommendDishes();
  const priceMemo = useMemo(() => {
    if (randomDishes.length > 1){
      const total = randomDishes.reduce((total, cur) => {
          return total + ((parseInt(cur.calo)))
      },0)
      return total
    }
  },)
  console.log("crc " + randomDishes.length + randomDishes + priceMemo);

  return (
    <Card hoverable className={styles.wrap}>
      <div className={styles.flex1}>
          <img className={styles.img_deco1} alt="example" src={imgIngr} />
          <p className={styles.txt}>Gợi ý thực đơn ngày hôm nay</p>
      </div>
      <div className={styles.info}>
        <p>Mục tiêu của bạn là: <span className={styles.span}>{aim}</span></p>
        <p>Bạn cần ăn {state} <span className={styles.span}>{tdee}</span> kcal/ngày</p>
        <p>Tổng calories của thực đơn: <span className={styles.span}>{priceMemo}</span> kcal</p>
      </div>
      <div className={styles.list}>
        {(randomDishes.length > 1) ? (
          randomDishes.map((dish) => (
            <CardDishComponent
              key={dish.id}
              id={dish.id}
              name={dish.name}
              calo={dish.calo}
              carb={dish.carb}
              fat={dish.fat}
              protein={dish.protein}
              img={dish.img}
              isFavo={isFavoriteDish(dish.id)}
            />
          )) ) : <></>
        }
      </div>
      {/* <div className={styles.deco}></div> */}
    </Card >
  );
}

  
export default RecommendDishComponent;
