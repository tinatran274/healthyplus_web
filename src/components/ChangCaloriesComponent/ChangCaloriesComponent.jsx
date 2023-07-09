import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Progress } from 'antd';
import { useState, useEffect} from 'react';
import styles from './style.module.css'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import * as UserService from '../../services/UserService'
import imgSang from '../../image/img_sang.png'
import imgTrua from '../../image/img_trua.png'
import imgToi from '../../image/img_toi.png'
import imgSnack from '../../image/img_snack.png'
import imgVanDong from '../../image/img_vandong.png'
import imgTip from '../../image/img_tip.png'

const ChangCaloriesComponent = () => {

    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);
    const [totalCalories, setTotalCalories] = useState(0);
    const [tdee, setTDEE] = useState(1);
    const [percent, setPercent] = useState(0);
    const [morning, setMorning] = useState(0);
    const [morningSeted, setMorningSeted] = useState(0);
    const [noon, setNoon] = useState(0);
    const [noonSeted, setNoonSeted] = useState(0);
    const [dinner, setDinner] = useState(0);
    const [dinnerSeted, setDinnerSeted] = useState(0);
    const [snack, setSnack] = useState(0);
    const [snackSeted, setSnackSeted] = useState(0);
    const [exercise, setExercise] = useState(0);
    const [exerciseSeted, setExerciseSeted] = useState(0);

    const getDateToday = () => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    };

    const setChangPercent = (data, tdee) => {
        setPercent((prevPercent) => {
            const add = parseInt((data/tdee)*100);
            const newPercent = prevPercent + add;
            if (newPercent > 100) {
              return 100;
            }
            return newPercent;
          });
    };

    const handleAuth = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await UserService.getDetailUser(user.uid);
                const userCalories = await UserService.getUserCalories(user.uid, getDateToday());
                setUserData(userData)
                setTDEE(userData.getTDEE())
                let userCalo = 0;
                if(userData && userCalories){
                    if(userCalories.morning) {
                        setMorningSeted(parseInt(userCalories.morning))
                        userCalo+=userCalories.morning;
                    }
                    if(userCalories.noon) {
                        setNoonSeted(parseInt(userCalories.noon))
                        userCalo += userCalories.noon;
                    }
                    if(userCalories.dinner) {
                        setDinnerSeted(parseInt(userCalories.dinner))
                        userCalo += userCalories.dinner;
                    }
                    if(userCalories.snack) {
                        setSnackSeted(parseInt(userCalories.snack))
                        userCalo += userCalories.snack;
                    }
                    if(userCalories.exercise) {
                        setExerciseSeted(parseInt(userCalories.exercise))
                        userCalo -= userCalories.exercise;
                    }
                    setTotalCalories(userCalo)
                    setChangPercent(userCalo, userData.getTDEE());
                }
            }
            else
                console.log("Chưa đăng nhập");
        });
    }
    useEffect(() => {
        handleAuth()
    }, [])
    
    const increase100Calories = () => {
        setTotalCalories(totalCalories + 100);
        setChangPercent(100, tdee);
        const currentTime = new Date();
        const hours = currentTime.getHours();
        // UserService.updateUserCalories(userData.id, getDateToday(), totalCalories + 100);
        if(hours<=10){
            UserService.updateUserMorning(userData.id, getDateToday(), morningSeted + 100);
            setMorningSeted(morningSeted + 100)
        }
        else if (hours>10 & hours <17){
            UserService.updateUserNoon(userData.id, getDateToday(), noonSeted + 100);
            setNoonSeted(noonSeted + 100)
        }
        else{
            UserService.updateUserDinner(userData.id, getDateToday(), dinnerSeted + 100);
            setDinnerSeted(dinnerSeted + 100)
        }
    
    };
    const increase200Calories = () => {
        setTotalCalories(totalCalories + 200);
        setChangPercent(200, tdee);
        const currentTime = new Date();
        const hours = currentTime.getHours();
        // UserService.updateUserCalories(userData.id, getDateToday(), totalCalories + 200);
        if(hours<=10){
            UserService.updateUserMorning(userData.id, getDateToday(), morningSeted + 200);
            setMorningSeted(morningSeted + 200)
        }
        else if (hours>10 & hours <17){
            UserService.updateUserNoon(userData.id, getDateToday(), noonSeted + 200);
            setNoonSeted(noonSeted + 200)
        }
        else{
            UserService.updateUserDinner(userData.id, getDateToday(), dinnerSeted + 200);
            setDinnerSeted(dinnerSeted + 200)
        }
    };
    const handleOnchangeMorning = (value) => {   
        setMorning(value)
    }
    const handleOnchangeNoon = (value) => {   
        setNoon(value)
    }
    const handleOnchangeDinner = (value) => {   
        setDinner(value)
    }
    const handleOnchangeSnack = (value) => {   
        setSnack(value)
    }
    const handleOnchangeExercise = (value) => {   
        setExercise(value)
    }
    const handleAddMorning = () => {
        setTotalCalories(totalCalories + parseInt(morning));
        setChangPercent(morning, tdee);
        // UserService.updateUserCalories(userData.id, getDateToday(), totalCalories + parseInt(morning));
        UserService.updateUserMorning(userData.id, getDateToday(), morningSeted + parseInt(morning));
        setMorningSeted(morningSeted + parseInt(morning))
        setMorning(0)
    }
    const handleAddNoon = () => {
        setTotalCalories(totalCalories + parseInt(noon));
        setChangPercent(noon, tdee);
        // UserService.updateUserCalories(userData.id, getDateToday(), totalCalories + parseInt(noon));
        UserService.updateUserNoon(userData.id, getDateToday(), noonSeted + parseInt(noon));
        setNoonSeted(noonSeted + parseInt(noon))
        setNoon(0)
    }
    const handleAddDinner = () => {
        setTotalCalories(totalCalories + parseInt(dinner));
        setChangPercent(dinner, tdee);
        // UserService.updateUserCalories(userData.id, getDateToday(), totalCalories + parseInt(dinner));
        UserService.updateUserDinner(userData.id, getDateToday(), dinnerSeted + parseInt(dinner));
        setDinnerSeted(dinnerSeted + parseInt(dinner))
        setDinner(0)
    }
    const handleAddSnack = () => {
        setTotalCalories(totalCalories + parseInt(snack));
        setChangPercent(snack, tdee);
        // UserService.updateUserCalories(userData.id, getDateToday(), totalCalories + parseInt(snack));
        UserService.updateUserSnack(userData.id, getDateToday(), snackSeted + parseInt(snack));
        setSnackSeted(snackSeted + parseInt(snack))
        setSnack(0)
    }
    const handleAddExercise = () => {
        setTotalCalories(totalCalories - parseInt(exercise));
        setChangPercent((-1)*exercise, tdee);
        // UserService.updateUserCalories(userData.id, getDateToday(), totalCalories - parseInt(exercise));
        UserService.updateUserExercise(userData.id, getDateToday(), exerciseSeted + parseInt(exercise));
        setExerciseSeted(exerciseSeted + parseInt(exercise))
        setExercise(0)
    }
    const handleAdvice = () => {

        const aim = userData.aim
        const temp = parseInt(tdee - totalCalories);
        if(aim=='Tăng cân'){
            if(temp > 0)
                return `Để đạt được mục tiêu tăng cân bạn cần nạp nhiều hơn ${temp} kcal`;
            else
                return `Bạn đã hoàn thành mục tiêu tăng cân trong ngày`
        } else if (aim=='Giữ cân'){
            if(temp > 0)
                return `Để đạt được mục tiêu giữ cân bạn cần nạp thêm khoảng ${temp} kcal`;
            else
                return `Cảnh báo nguy cơ tăng cân, bạn cần tiêu hao khoảng ${-temp} kcal để giữ cân`
        } else {
            if(temp > 0)
                return `Để đạt được mục tiêu giảm cân bạn cần nạp ít hơn ${temp} kcal`;
            else
                return `Cảnh báo tăng cân, bạn cần tiêu hao nhiều hơn ${-temp} kcal để giảm cân`
        }
    }

    return(
        <div className={styles.control}>
            <div className={styles.control_title}>
                <p className={styles.title}>Kiểm soát lượng calories trong ngày</p>
                <div className={styles.progress}>
                    <div>
                        <Progress type="circle" percent={percent} strokeColor='#6cc65a' trailColor='#f8f7f7'/>
                        <p className={styles.info_bar}>{totalCalories} / {parseInt(tdee)}</p>
                    </div>
                    <Button.Group>
                        <Button onClick={increase100Calories} icon={<PlusOutlined />} >100</Button>
                        <Button onClick={increase200Calories} icon={<PlusOutlined />} >200</Button>
                    </Button.Group>
                </div>
                <div className={styles.info}>
                    <p>Hôm nay là ngày: {getDateToday()}</p>
                    <p>Lượng calories bạn đã nạp trong bữa sáng: <span className={styles.text}>{morningSeted}</span> kcal</p>
                    <p>Lượng calories bạn đã nạp trong bữa trưa: <span className={styles.text}>{noonSeted}</span> kcal</p>
                    <p>Lượng calories bạn đã nạp trong bữa tối: <span className={styles.text}>{dinnerSeted}</span> kcal</p>
                    <p>Lượng calories bạn đã tiêu hao do vận động: <span className={styles.text}>{exerciseSeted}</span> kcal</p>
                    <p>Tổng calories bạn đã nạp vào trong ngày: <span className={styles.text}>{totalCalories}</span> kcal</p>
                    
                    <div className={styles.tip}>
                        <img className={styles.tip_img} alt="example" src={imgTip} />
                        <span className={styles.text}>{userData ? handleAdvice(): ''}</span>
                    </div>
                
                </div>
            </div>
            <div className={styles.change}>
                <Card className={styles.card}>
                    <div className={styles.flex1}>
                        <img className={styles.srcion} alt="example" src={imgSang} />
                        <p  className={styles.txt}>Bữa sáng</p>
                        <p>{morningSeted}</p>
                    </div>
                    <InputFormComponent id="moring" placeholder="Nhập calories bữa sáng" type="number" value={morning} onChange={handleOnchangeMorning} />
                    <button className={styles.pay_m} onClick={handleAddMorning}>Thêm</button >
                </Card>
                <Card className={styles.card}>
                    <div className={styles.flex1}>
                        <img className={styles.srcion} alt="example" src={imgTrua} />
                        <p  className={styles.txt}>Bữa trưa</p>
                        <p>{noonSeted}</p>
                    </div>
                    <InputFormComponent id="noon" placeholder="Nhập calories bữa trưa" type="number" value={noon} onChange={handleOnchangeNoon} />
                    <button className={styles.pay_m} onClick={handleAddNoon}>Thêm</button >
                </Card>
                <Card className={styles.card}>
                    <div className={styles.flex1}>
                        <img className={styles.srcion} alt="example" src={imgToi} />
                        <p  className={styles.txt}>Bữa tối</p>
                        <p>{dinnerSeted}</p>
                    </div>
                    <InputFormComponent id="dinner" placeholder="Nhập calories bữa tối" type="number" value={dinner} onChange={handleOnchangeDinner} />
                    <button className={styles.pay_m} onClick={handleAddDinner}>Thêm</button >
                </Card>
                <Card className={styles.card}>
                    <div className={styles.flex1}>
                        <img className={styles.srcion} alt="example" src={imgSnack} />
                        <p  className={styles.txt}>Ăn vặt</p>
                        <p>{snackSeted}</p>
                    </div>
                    <InputFormComponent id="snack" placeholder="Nhập calories ăn vặt" type="number" value={snack} onChange={handleOnchangeSnack} />
                    <button className={styles.pay_m} onClick={handleAddSnack}>Thêm</button >
                </Card>
                <Card className={styles.card}>
                    <div className={styles.flex1}>
                        <img className={styles.srcion} alt="example" src={imgVanDong} />
                        <p  className={styles.txt}>Vận động</p>
                        <p>{exerciseSeted}</p>
                    </div>
                    <InputFormComponent id="exercise" placeholder="Nhập calories vận động" type="number" value={exercise} onChange={handleOnchangeExercise} />
                    <button className={styles.pay_m} onClick={handleAddExercise}>Thêm</button >
                </Card>

            </div>
        </div>
    )
}
export default ChangCaloriesComponent