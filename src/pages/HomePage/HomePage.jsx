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

const HomePage = () => {
  const auth = getAuth(app);
  const [userData, setUserData] = useState(null);
  const [premium, setPremium] = useState(0);

  const handleAuth = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await UserService.getDetailUser(user.uid);
        setUserData(userData);
        setPremium(userData.getPremium());
      } else console.log("Chưa đăng nhập");
    });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling animation
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
      <TitleAddDishComponent/>
      {(premium==0) ? (
        <LockRecommendDishComponent/>
        ) : (
          <RecommendDishComponent />
        )}
    
      <ListProductComponent />
      <FooterComponent />
    </div>
  );
};
export default HomePage;
