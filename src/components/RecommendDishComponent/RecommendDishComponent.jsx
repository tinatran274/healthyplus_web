import React, { useEffect, useState } from "react";
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
import { Col, Input, message, Popconfirm, Card, Pagination } from "antd";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import { SearchOutlined } from "@ant-design/icons";

const RecommendDishComponent = () => {
  const auth = getAuth(app);

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [listDish, setListDish] = useState([]);
  const [tdee, setTDEE] = useState(1);
  const [listFavo, setListFavo] = useState([]);

  const getListDish = async () => {
    setListDish(await DishService.getAllDish());
  };
  const isFavoriteDish = (did) => {
    if (listFavo !== null) return listFavo.includes(did); // Check for null
    return false;
  };
  const handleAuth = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await UserService.getDetailUser(user.uid);

        setUserData(userData);

        const userFavo = await DishService.getDishFavo(user.uid);

        setListFavo(userFavo);
        setTDEE(userData.getTDEE());
      } else console.log("Chưa đăng nhập");
    });
  };
  // const getListFavo = async () => {
  //   setListFavo(await DishService.getDishFavo(userData));
  // };
  useEffect(() => {
    handleAuth();
    getListDish();
    // getListFavo();
  }, []);

  const recommendDishes = (dishes, aim) => {
    const selectedDishes = [];
    let totalCalories = 0;
    const shuffledRecDish = [...dishes].sort(() => 0.5 - Math.random());

    for (const dish of shuffledRecDish) {
      if (aim === 1) {
        if (totalCalories + dish.calo <= tdee) {
          selectedDishes.push(dish);
          totalCalories += dish.calo;
          console.log("giam can");
        }
        // } else if (aim === 2) {
        //   if (totalCalories + dish.calo >= tdee) {
        //     selectedDishes.push(dish);
        //     totalCalories += dish.calo;
        //     console.log("tang can");
        //   }
      }

      if (selectedDishes.length === 3) {
        break;
      }
    }
    //console.log(shuffledRecDish);
    return selectedDishes;
  };

  const handleAim = () => {
    if (userData) {
      const aim = userData.aim;
      //console.log(aim);
      // if (aim === "Giảm cân") {
      //   return 1;
      // } else if (aim === "Tăng cân") {
      //   return 2;
      // }
      return 1;
    }
  };
  const getAim = handleAim();
  // console.log(getAim);
  const randomDishes = recommendDishes(listDish, getAim);
  // console.log("randomDishes:", randomDishes);
  if (userData) {
    return (
      <div>
        <div>
          {randomDishes.map((dish) => (
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
          ))}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};
export default RecommendDishComponent;
