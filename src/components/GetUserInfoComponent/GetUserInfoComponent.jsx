import React, { useEffect, useState } from 'react'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { Button, Card, Progress } from 'antd';
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import styles from './style.module.css'
import imgFemale from '../../image/icon_female.png'
import imgMale from '../../image/icon_male.png'

const GetUserInfoComponent = () => {

    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);
    const [percent, setPercent] = useState(0);
    const [selectedValue, setSelectedValue] = useState('option1');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const handleAuth = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await UserService.getDetailUser(user.uid);
                setUserData(userData)
            }
            else
                console.log("Chưa đăng nhập");
        });
    }

    useEffect(() => {
        handleAuth()
    }, [])

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
    const handleOnchangeName = (value) => {
        setName(value)
    }
    const handleOnchangeAge = (value) => {
        setAge(value)
    }
    const increase = () => {
        setPercent((prevPercent) => {
        const newPercent = prevPercent + 10;
        if (newPercent > 100) {
            return 100;
        }
        return newPercent;
        });
    };
    const decline = () => {
        setPercent((prevPercent) => {
        const newPercent = prevPercent - 10;
        if (newPercent < 0) {
            return 0;
        }
        return newPercent;
        });
    };

    return(
        <div>
            <div className={styles.progress}>
                <Progress className={styles.p_item} percent={45} />
            </div>
            <div className={styles.flex2}>
                <span>Tên người dùng</span>
                <InputFormComponent className={styles.inp} placeholder="" value={name} onChange={handleOnchangeName}/>
            </div>
            <div className={styles.flex}>
                <p>Giới tính</p>
                <Card hoverable>
                    <div className={styles.card}>
                        <img className={styles.img_gender} alt="example" src={imgFemale} />
                        <p>Nữ</p>
                        <input type="radio" name="gender" value="Nữ" checked={selectedValue === 'Nữ'}
                            onChange={handleChange}/>
                    
                    </div>
                </Card>
                <Card hoverable>
                    <div className={styles.card}>
                        <img className={styles.img_gender} alt="example" src={imgMale} />
                        <p>Nam</p>
                        <input type="radio" name="gender" value="Nam" checked={selectedValue === 'Nam'}
                            onChange={handleChange}/>
                    </div>   
                </Card>
            </div>
            <div className={styles.flex2}>
                <span>Tuổi</span>
                <InputFormComponent className={styles.inp} placeholder="" type="number" value={age} onChange={handleOnchangeAge}/>
            </div>
            
        </div>
    )
}
export default GetUserInfoComponent