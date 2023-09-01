import React, { useEffect, useState } from "react";
import { Col, Row, Image, Button, Progress, Card, Rate } from "antd";
import {
  PlusOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  MinusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import * as DishService from "../../services/DishService";
import * as UserService from "../../services/UserService";
import styles from "./style.module.css";
import app from "../../config/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import * as message from "../../components/MessageComponent/MessageComponent";

import imgBicycle from "../../image/img_bycicle.png";
import imgRun from "../../image/img_running.png";
import imgJump from "../../image/img_jump.png";
import imgWalk from "../../image/img_walking.png";
import imgNutri from "../../image/img_nutrition.png";
import imgIngr from "../../image/img_ingre.png";
import imgRecipe from "../../image/img_recipe_book.png";
import imgExer from "../../image/img_exercise.png";
import imgFavo from "../../image/img_favo.png";
import imgUnfavo from "../../image/img_unfavo.png";
import {
  WrapperDropButton,
  WrapperDropContent,
  WrapperLink,
} from "../NavComponent/style";

const DetailDishComponent = ({ idDish }) => {
  const auth = getAuth(app);
  const [userData, setUserData] = useState(null);
  const [dish, setDish] = useState([]);
  const [listFavo, setListFavo] = useState([]);
  const [aveRating, setAveRating] = useState(0);
  const [numRating, setNumRating] = useState(0);

  const navigate = useNavigate();

  const isFavoriteDish = () => {
    if (listFavo) return listFavo.includes(idDish);
  };
  const getDish = async () => {
    setDish(await DishService.getDishtById(idDish));
    setAveRating(parseInt(await DishService.getAllRatingDish(idDish)));
    setNumRating(await DishService.getNumRatingDish(idDish));
  };
  const handleAuth = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await UserService.getDetailUser(user.uid);
        const userFavo = await DishService.getDishFavo(user.uid);
        setUserData(userData);
        setListFavo(userFavo);
      } else console.log("Chưa đăng nhập");
    });
  };
  useEffect(() => {
    handleAuth();
    getDish();
  }, []);
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
  const handleSetFavo = async () => {
    console.log("favo");
    if (userData) {
      await DishService.deleteDishFavo(userData.id, idDish);
      // setIsUserFavo(false)
      handleAuth();
    }
  };
  const handleSetUnFavo = async () => {
    console.log("unfavo");
    if (userData) {
      await DishService.addDishFavo(userData.id, idDish);
      console.log("favo");
      // setIsUserFavo(true)
      handleAuth();
    }
  };

  const getDateToday = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  // const addMorning = () => {
  //   const preData = UserService.getMorning(userData.id, getDateToday());
  //   var newData = preData + parseInt(dish.calo);
  //   console.log(preData);
  //   if (userData) {
  //     UserService.updateUserMorning(userData.id, getDateToday(), 100);
  //   } else message.error("Bạn chưa đăng nhập");
  //   //navigate("/control_calories");
  // };
  const addMorning = async () => {
    if (userData) {
      const preData = await UserService.getMorning(userData.id, getDateToday());
      if (preData !== undefined) {
        const newData = preData + parseInt(dish.calo);
        console.log(preData);
        UserService.updateUserMorning(userData.id, getDateToday(), newData);
      } else {
        UserService.updateUserMorning(
          userData.id,
          getDateToday(),
          parseInt(dish.calo)
        );
      }
    } else {
      message.error("Bạn chưa đăng nhập");
    }
    navigate("/control_calories");
  };
  const addNoon = async () => {
    if (userData) {
      const preData = await UserService.getNoon(userData.id, getDateToday());
      if (preData !== undefined) {
        const newData = preData + parseInt(dish.calo);
        console.log(preData);
        UserService.updateUserNoon(userData.id, getDateToday(), newData);
      } else {
        UserService.updateUserNoon(
          userData.id,
          getDateToday(),
          parseInt(dish.calo)
        );
      }
    } else {
      message.error("Bạn chưa đăng nhập");
    }
    navigate("/control_calories");
  };
  const addDinner = async () => {
    if (userData) {
      const preData = await UserService.getDinner(userData.id, getDateToday());
      if (preData !== undefined) {
        const newData = preData + parseInt(dish.calo);
        console.log(preData);
        UserService.updateUserDinner(userData.id, getDateToday(), newData);
      } else {
        UserService.updateUserDinner(
          userData.id,
          getDateToday(),
          parseInt(dish.calo)
        );
      }
    } else {
      message.error("Bạn chưa đăng nhập");
    }
    navigate("/control_calories");
  };

  return (
    <div className={styles.main_pro}>
      <div>
        <div className={styles.flexr}>
          <div>
            <Image src={dish.img} alt="img" preview={false} />
            <div className={styles.wrap_add}>
              <p>Bạn muốn thêm vào?</p>
              <button className={styles.Add} onClick={addMorning}>Bữa sáng</button>
              <button className={styles.Add} onClick={addNoon}>Bữa trưa</button>
              <button className={styles.Add} onClick={addDinner}>Bữa tối</button>
            </div>
          </div>
          <div>
            <div className={styles.wrap_detail_product}>
              <div className={styles.wrap}>
                <h1 className={styles.name}>{dish.name}</h1>
                {isFavoriteDish() ? (
                  <img
                    className={styles.img_favo}
                    alt="favo"
                    src={imgFavo}
                    onClick={handleSetFavo}
                  />
                ) : (
                  <img
                    className={styles.img_favo}
                    alt="unfavo"
                    src={imgUnfavo}
                    onClick={handleSetUnFavo}
                  />
                )}
              </div>
              <span className={styles.rate}>
                <Rate disabled value={aveRating} />
                <span className={styles.num_rate}>
                  {numRating} lượt đánh giá
                </span>
              </span>
              <div className={styles.flex2}>
                <img
                  className={styles.img_deco1}
                  alt="example"
                  src={imgNutri}
                />
                <p className={styles.txt}>
                  Thông tin dinh dưỡng tính trên một khẩu phần ăn
                </p>
              </div>

              <div>
                <div className={styles.nutri}>
                  <p className={styles.deco1}>Calories</p>
                  <p className={styles.info_dish}>{dish.calo}kcal</p>
                  <Progress percent={100} size={[200, 10]} />
                </div>
                <div className={styles.nutri}>
                  <p className={styles.deco1}>Chất béo</p>
                  <p className={styles.info_dish}>{dish.fat}g</p>
                  <Progress
                    percent={parseInt(
                      (dish.fat * 100) / (dish.fat + dish.protein + dish.carb)
                    )}
                    size={[200, 10]}
                  />
                </div>
                <div className={styles.nutri}>
                  <p className={styles.deco1}>Protein</p>
                  <p className={styles.info_dish}>{dish.protein}g</p>
                  <Progress
                    percent={parseInt(
                      (dish.protein * 100) /
                        (dish.fat + dish.protein + dish.carb)
                    )}
                    size={[200, 10]}
                  />
                </div>
                <div className={styles.nutri}>
                  <p className={styles.deco1}>Carbs</p>
                  <p className={styles.info_dish}>{dish.carb}g</p>
                  <Progress
                    percent={parseInt(
                      (dish.carb * 100) / (dish.fat + dish.protein + dish.carb)
                    )}
                    size={[200, 10]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.flex1}>
          <img className={styles.img_deco1} alt="example" src={imgIngr} />
          <p className={styles.txt}>Nguyên liệu</p>
        </div>
        <Card hoverable>
          {dish.ingredient
            ? dish.ingredient.map((ingredient) => {
                return (
                  <p key={ingredient} className={styles.txt_ingr}>
                    {ingredient}
                  </p>
                );
              })
            : ""}
        </Card>

        <div className={styles.flex1}>
          <img className={styles.img_deco1} alt="example" src={imgRecipe} />
          <p className={styles.txt}>Công thức</p>
        </div>
        <Card hoverable>
          {dish.recipe
            ? dish.recipe.map((recipe) => {
                return (
                  <p key={recipe} className={styles.txt_ingr}>
                    {recipe}
                  </p>
                );
              })
            : ""}
        </Card>
        <div className={styles.flex1}>
          <img className={styles.img_deco1} alt="example" src={imgExer} />
          <p className={styles.txt}>Để tiêu thụ {dish.calo} kcal</p>
        </div>
        <div className={styles.nutri}>
          <Card hoverable>
            <div className={styles.info_ex}>
              <img className={styles.img_deco} alt="example" src={imgBicycle} />
              <p>Đạp xe</p>
              <p className={styles.time}>{calTimeBicycle(dish.calo)} phút</p>
            </div>
          </Card>
          <Card hoverable>
            <div className={styles.info_ex}>
              <img className={styles.img_deco} alt="example" src={imgRun} />
              <p>Chạy bộ</p>
              <p className={styles.time}>{calTimeRun(dish.calo)} phút</p>
            </div>
          </Card>
          <Card hoverable>
            <div className={styles.info_ex}>
              <img className={styles.img_deco} alt="example" src={imgWalk} />
              <p>Đi bộ</p>
              <p className={styles.time}>{calTimeWalking(dish.calo)} phút</p>
            </div>
          </Card>
          <Card hoverable>
            <div className={styles.info_ex}>
              <img className={styles.img_deco} alt="example" src={imgJump} />
              <p>Nhảy dây</p>
              <p className={styles.time}>{calTimeJump(dish.calo)} phút</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default DetailDishComponent;
