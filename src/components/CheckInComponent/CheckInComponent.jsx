import React from "react";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import app from "../../config/firebase";
import { useState, useEffect } from "react";
import { Popup } from "leaflet";
import PopUpComponent from "../PopUpComponent/PopUpComponent";
import * as UserService from "../../services/UserService";
import { experimentalStyled as styled } from "@mui/material/styles";
import imgShell from "../../image/img_shell.png";
import styles from "./style.module.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Icon } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { SettingsApplicationsTwoTone } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function CheckInComponent() {
  const auth = getAuth(app);
  const [userData, setUserData] = useState(null);
  const [timedPopup, setTimePopup] = useState(false);
  const [popup, setPopup] = useState(true);
  const [check, setCheck] = useState(0);
  const [checkList, setCheckList] = useState([]);
  const [count, setCount] = useState(0);
  const [coin, setCoin] = useState(0);
  const demonstrateCheckDate = async (uid) => {
    const today = new Date();

    const list = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - i);
      const day = String(currentDate.getDate()).padStart(2, "0");
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const year = currentDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      const userCheck = UserService.getCheck(uid, formattedDate);
      if (userCheck) {
        list.push(userCheck);
      } else {
        list.push(0);
      }
      list[0] = 1;
      setCheckList(list);
    }
  };
  const handleAuth = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await UserService.getDetailUser(user.uid);

        setUserData(userData);
        setCheck(await UserService.getCheck(userData.id, getDateToday()));
        setCoin(await UserService.getCoin(userData.id));
        demonstrateCheckDate(user.uid);
      } else console.log("Chưa đăng nhập");
    });
  };
  useEffect(() => {
    handleAuth();
  }, []);
  const getDateToday = () => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  };

  const handleCheck = () => {
    let temp = 0;
    console.log(checkList);
    for (let i = checkList.length - 1; i >= 0; i--) {
      if (checkList[i] === 1) {
        temp++;
      } else {
        temp = 0;
        continue;
      }
    }
    setCount(temp);

    if (temp < 7) {
      UserService.updateUserCheck(userData.id, getDateToday(), 1);
      UserService.updateUserCoin(userData.id, parseInt(coin) + 100);

      console.log("+100");
      //setPopup(false);
    } else {
      UserService.updateUserCheck(userData.id, getDateToday(), 2);
      UserService.updateUserCoin(userData.id, parseInt(coin) + 200);
      console.log("+200");
      // setPopup(false);
    }
  };
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
                  <img
                    className={styles.img_deco}
                    alt="Coin Icon"
                    src={imgShell}
                  />
                  <div className={styles.done_icon}>
                    {count >= index + 1 ? <DoneIcon /> : ""}
                  </div>
                </Item>
                <div className={styles.day}>Day{index + 1}</div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      <div className={styles.container}>
        <div className={styles.check} onClick={handleCheck}>
          Điểm danh
        </div>
      </div>
    </PopUpComponent>
  );
}

export default CheckInComponent;
