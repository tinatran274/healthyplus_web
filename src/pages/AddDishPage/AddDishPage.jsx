import React, { useEffect, useState, useMemo } from "react";
import styles from "./style.module.css";
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import AddDishComponent from '../../components/AddDishComponent/AddDishComponent'
import FooterComponent from '../../components/FooterComponent/FooterComponent'
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import * as DishService from "../../services/DishService.js";
import app from "../../config/firebase";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";


const AddDishPage = () => {
  const auth = getAuth(app);

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  
 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling animation
    });
  };

  const handleAuth = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await UserService.getDetailUser(user.uid);
        const userFavo = await DishService.getDishFavo(user.uid);
        setUserData(userData)
        
      } else console.log("Chưa đăng nhập");
    });
  };
  
  useEffect(() => {
    scrollToTop();
    handleAuth();
    
  }, []);

  
  return (
    <div>
      <HeaderComponent/>
      <NavComponent/>
      <AddDishComponent/>
      <FooterComponent/>
    </div>
  );
}

  
export default AddDishPage;
