import React, { useEffect, useState } from "react";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import NavComponent from "../../components/NavComponent/NavComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../image/slider1.png";
import slider2 from "../../image/slider2.png";
import slider3 from "../../image/slider3.png";
import TitleAddDishComponent from "../../components/TitleAddDishComponent/TitleAddDishComponent";
import ListProductComponent from "../../components/ListProductComponent/ListProductComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import styles from "./style.module.css";
import * as UserService from "../../services/UserService";
import app from "../../config/firebase";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import RecommendDishComponent from "../../components/RecommendDishComponent/RecommendDishComponent";
import LockRecommendDishComponent from "../../components/LockRecommendDishComponent/LockRecommendDishComponent";
import CheckInComponent from "../../components/CheckInComponent/CheckInComponent";
import ChekInComponent from "../../components/ChekInComponent/ChekInComponent";

const HomePage = () => {
  const auth = getAuth(app);
  const [userData, setUserData] = useState(null);
  const [premium, setPremium] = useState(0);
  const [check, setCheck] = useState(1);

  const handleAuth = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await UserService.getDetailUser(user.uid);
        setUserData(userData);
        setPremium(userData.getPremium());
        // await UserService.createCheck(user.uid, getDateToday());
        setCheck(await UserService.getCheck(user.uid, getDateToday()));
      } else console.log("Chưa đăng nhập");
    });
  };
  const getDateToday = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling animation
    });
  };

  useEffect(() => {
    scrollToTop();
    handleAuth();
  }, []);


  return (
    <div>
      <HeaderComponent />
      <NavComponent />
      <SliderComponent arrImage={[slider1, slider2, slider3]} />
      <TitleAddDishComponent />
      {premium == 0 ? (
        <LockRecommendDishComponent />
      ) : (
        <RecommendDishComponent />
      )}
      {userData && check === 0 ? <CheckInComponent /> : " " }

      <ListProductComponent />
      <FooterComponent />
    </div>
  );
};
export default HomePage;
