import React, { useEffect, useState } from 'react'
import { Button, Card, Spin} from 'antd';
import * as UserService from '../../services/UserService'
import styles from './style.module.css'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import * as message from '../../components/MessageComponent/MessageComponent'
import imgBicycle from '../../image/img_bycicle.png'
import imgRun from '../../image/img_running.png'

const ExerciseComponent = ({idProduct}) => {

    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [exercise, setExercise] = useState("");
    const [kcal, setKcal] = useState(0);


    const getDateToday = () => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    };
    
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

    useEffect(() => {
        let interval = null;
        if (running) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    useEffect(() => {
        updateData();
        return () => {
        };
      }, [time]);

    const updateData = () => {
        if(exercise=="đạp xe"){
            setKcal(((time * 7)/60).toFixed(2));
        }
        else if(exercise=="chạy bộ"){
            setKcal(((time * 10)/60).toFixed(2));
        }
      };

    const handleStart = () => {
        setRunning(true);
        
    };

    const handleStop = () => {
        setRunning(false);
        
    };

    const handleReset = () => {
        setTime(0);
        setRunning(false);
    };
    const handleStartBicycle = () => {
        if(!running){
            setTime(0)
            setKcal(0)
            setExercise("đạp xe");
        }
    };
    const handleStartRun = () => {
        if(!running){
            setTime(0)
            setKcal(0)
            setExercise("chạy bộ")
        }
    };
    const handleSave = () => {
        if (userData){
            UserService.updateUserExercise(userData.id, getDateToday(), kcal);
            setTime(0);
            setRunning(false);
            message.success(`Bạn đã tiêu hao ${kcal} kcal`)
        }
        else message.error("Bạn chưa đăng nhập")
    };
    
    return(
        <div className={styles.main_pro}>
            <div className={styles.left}>
                <Card className={styles.info} hoverable onClick={handleStartBicycle}>
                    <div className={styles.info_ex}>
                        <img className={styles.img_deco} alt="example" src={imgBicycle} />
                        <p className={styles.active}>Đạp xe</p>
                        <p className={styles.time} >7 kcal / 60 giây</p>
                    </div>
                </Card>
                <Card className={styles.info} hoverable onClick={handleStartRun}>
                    <div className={styles.info_ex}>
                        <img className={styles.img_deco} alt="example" src={imgRun} />
                        <p className={styles.active} >Chạy bộ</p>
                        <p className={styles.time} >10 kcal / 60 giây</p>
                    </div>
                </Card>
            </div>
            {exercise?
                <div className={styles.right}>
                    <Spin spinning={running} delay={500}>
                        <h2>{running?"Bạn đang" : "Bắt đầu" } {exercise} 
                            <span className={styles.save} onClick={handleSave}>Lưu kết quả</span>
                        </h2>
                    </Spin>
                    <div>Thời gian: {time} giây</div>
                    <div>Bạn đã tiêu hao: {kcal} kcal</div>
                    <button className={styles.pay} onClick={handleStart}>Bắt đầu</button>
                    <button className={styles.pay1} onClick={handleStop}>Dừng lại</button>
                    <button className={styles.pay2} onClick={handleReset}>Khởi động lại</button>
                </div>
            : <h2>Chọn một hoạt động để bắt đầu nào!</h2>
            }
        </div>
    )
}
export default ExerciseComponent