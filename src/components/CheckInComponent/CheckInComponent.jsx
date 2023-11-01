import React from "react";
import { getAuth, onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import app from "../../config/firebase";
import { useState, useEffect } from "react";
import PopUpComponent from "../PopUpComponent/PopUpComponent";
import * as UserService from "../../services/UserService";
import { experimentalStyled as styled } from "@mui/material/styles";
import imgShell from "../../image/img_shell.png";
import styles from "./style.module.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DoneIcon from "@mui/icons-material/Done";
import Checked from '../../image/check.png'
import * as message from "../../components/MessageComponent/MessageComponent";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const  CheckInComponent = () => {
  const auth = getAuth(app);
  const [userData, setUserData] = useState(null);
  const [popup, setPopup] = useState(true);
  const [check, setCheck] = useState(0);
  const [count, setCount] = useState(0);
  const [coin, setCoin] = useState(0);


  const getDateToday = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const getDateYesterday = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const dd = String(yesterday.getDate()).padStart(2, '0');
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = yesterday.getFullYear(); 
    return dd + '-' + mm + '-' + yyyy;
  }

  const demonstrateCheckDate1 = async (uid, stateCheck, check) => {
    const isCheckYesterday = await UserService.getCheck(uid, getDateYesterday());
    if(isCheckYesterday)
      setCount(stateCheck);
    else { 
      setCount(0);
      await UserService.updateStateCheck(uid, 0);
    }
  }

  const handleAuth = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await UserService.getDetailUser(user.uid);
        setUserData(userData);
        setCheck(await UserService.getCheck(userData.id, getDateToday()));
        setCoin(await UserService.getCoin(userData.id));
        demonstrateCheckDate1(user.uid, userData.stateCheck, check);
      } else console.log("Chưa đăng nhập");
    });
  };
  useEffect(() => {
    handleAuth();
  }, []);


  const handleCheck1 = async () => {
    if (check){ 
       message.error("Bạn đã điểm danh rồi");
    } else {
      const countCheked = count + 1;
      setCheck(1)
      await UserService.updateUserCheck(userData.id, getDateToday(), 1);
      if (countCheked == 7) {
        setCount(countCheked);
        await UserService.updateStateCheck(userData.id, countCheked);
        await UserService.updateUserCoin(userData.id, parseInt(coin) + 200);
      }
      else if (countCheked > 7){
        setCount(1);
        await UserService.updateStateCheck(userData.id, 1);
        await UserService.updateUserCoin(userData.id, parseInt(coin) + 100);
      }
      else {
        setCount(countCheked);
        await UserService.updateStateCheck(userData.id, countCheked);
        await UserService.updateUserCoin(userData.id, parseInt(coin) + 100);
      }
      message.success("Điểm danh thành công");
    }
  }

  return (
    <PopUpComponent trigger={popup} setTrigger={setPopup}>
      <div className={styles.title}></div>
      <div className={styles.check_in}>
        <div className={styles.check_img}></div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 1 }}
            columns={{ xs: 4, sm: 8, md: 28 }}
          >
            {Array.from(Array(7)).map((_, index) => (
              <Grid item xs={1} sm={4} md={4} key={index}>
                <Item>
                  +{index < 6 ? 1 * 100 : 2 * 100}{" "}
                  <img className={styles.img_deco} alt="Coin Icon" src={imgShell}/>
                  <div className={styles.done_icon}>
                    {count >= index + 1 ?  <img className={styles.tip_img} alt="example" src={Checked} /> : ""}
                  </div>
                </Item>
                <div className={styles.day}>Day{index + 1}</div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      <div className={styles.container}>
        <div className={styles.check} onClick={handleCheck1}>
          Điểm danh
        </div>
      </div>
    </PopUpComponent>
  );
}

export default CheckInComponent;
