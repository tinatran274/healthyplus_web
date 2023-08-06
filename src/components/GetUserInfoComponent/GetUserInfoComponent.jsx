import React, { useEffect, useState } from 'react'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { Button, Card, Progress, Select } from 'antd';
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import styles from './style.module.css'
import imgFemale from '../../image/icon_female.png'
import imgMale from '../../image/icon_male.png'
import { useNavigate } from 'react-router-dom';
import * as message from '../../components/MessageComponent/MessageComponent'

const GetUserInfoComponent = () => {

    const auth = getAuth(app);
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null);
    const [percent, setPercent] = useState(0);
    const [selectedValue, setSelectedValue] = useState('option1');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [exercise, setExercise] = useState('');
    const [aim, setAim] = useState('');

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
    const handleOnchangeHeight = (value) => {
        setHeight(value)
    }
    const handleOnchangeWeight = (value) => {
        setWeight(value)
    }
    const handleOnchangeExercise = (value) => {
        setExercise(value)
    }
    const handleOnchangeAim = (value) => {
        setAim(value)
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

    const handleSubmit = () => {
        if(userData) {
            UserService.updateNameUser(userData.id, name);
            UserService.updateInfoUser(userData.id, age, selectedValue, height, weight, exercise);
            UserService.updateAimUser(userData.id, aim);
            message.success('Cập nhật thông tin thành công');
            // navigate('/')
        }

    }

    return(
        <div className={styles.wrap}>
            {/* <div className={styles.progress}>
                <Progress className={styles.p_item} percent={45} />
            </div> */}
            <p className={styles.txt}>Để HealthyPlus có thể hiểu rõ hơn về bạn, bạn hãy điền một số thông tin cơ bản sau đây:</p>
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
            <div className={styles.flex3}>
                <div className={styles.flex2}>
                    <span>Tuổi</span>
                    <InputFormComponent className={styles.inp} placeholder="" type="number" value={age} onChange={handleOnchangeAge}/>
                </div>
                <div className={styles.flex2}>
                    <span>Chiều cao</span>
                    <InputFormComponent className={styles.inp} placeholder="" type="number" value={height} onChange={handleOnchangeHeight}/>
                </div>
                <div className={styles.flex2}>
                    <span>Cân nặng</span>
                    <InputFormComponent className={styles.inp} placeholder="" type="number" value={weight} onChange={handleOnchangeWeight}/>
                </div>
            </div>
            <div className={styles.div1}>
            <span>Mức độ vận động</span>
                        <Select className={styles.select}
                            value={exercise}
                            onChange={handleOnchangeExercise}
                            options={[
                                { value: 'Không vận động', label: 'Không vận động' },
                                { value: '1-2 buổi/tuần', label: '1-2 buổi/tuần' },
                                { value: '3-5 buổi/tuần', label: '3-5 buổi/tuần' },
                                { value: '5-7 buổi/tuần', label: '5-7 buổi/tuần'},
                            ]}
                        />
            </div>
            <div className={styles.div1}>
                        <span>Mục tiêu hiện tại</span>
                        <Select className={styles.select}
                            value={aim}
                            onChange={handleOnchangeAim} 
                            options={[
                                { value: 'Tăng cân', label: 'Tăng cân' },
                                { value: 'Giữ cân', label: 'Giữ cân' },
                                { value: 'Giảm cân', label: 'Giảm cân' },
                            ]}
                        />
            </div>
            <button className={styles.pay_m} onClick={handleSubmit}>Hoàn tất</button >
            
            
        </div>
    )
}
export default GetUserInfoComponent