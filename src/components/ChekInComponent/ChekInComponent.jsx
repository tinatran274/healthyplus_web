import React, { useEffect, useState } from 'react'
import { Row, Col, Input, message, Popconfirm  } from 'antd'
import { GithubOutlined, AndroidOutlined, AppleOutlined} from '@ant-design/icons';
import styles from './style.module.css'
import * as UserService from '../../services/UserService'
import { useNavigate } from 'react-router-dom';
import app from '../../config/firebase'
import { getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";


const ChekInComponent = () => {

    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);

    const handleAuth = () => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userData = await UserService.getDetailUser(user.uid);
            setUserData(userData);

          } else console.log("Chưa đăng nhập");
        });
      };
      useEffect(() => {
        handleAuth();
      }, []);
    


    return(
        <div className={styles.wrap}> 
               hellobdj
        </div>
    )
}
export default ChekInComponent