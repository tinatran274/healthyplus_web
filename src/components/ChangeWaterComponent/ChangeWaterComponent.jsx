import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Progress } from 'antd';
import { useState, useEffect} from 'react';
import styles from './style.module.css'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import * as UserService from '../../services/UserService'
import imgNuoc from '../../image/img_nuoc.png'
import imgTip from '../../image/img_tip.png'


const ChangeWaterComponent = () => {

    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);
    const [totalCalories, setTotalCalories] = useState(0);
    const [need, setNeed] = useState(1);
    const [percent, setPercent] = useState(0);
    const [water, setWater] = useState(0);
    const [waterSeted, setWaterSeted] = useState(0);

    const getDateToday = () => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    };

    const setChangPercent = (data, need) => {
        setPercent((prevPercent) => {
            const add = parseInt((data/need)*100);
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
                setNeed(userData.getWater()*1000)
                if(userData && userCalories){
                    setTotalCalories(parseInt(userCalories.calories))
                    if(userCalories.water)
                        setWaterSeted(parseInt(userCalories.water))
                    console.log(userCalories.water, userData.getWater()*1000)
                    setChangPercent(userCalories.water, userData.getWater()*1000);
                }
            }
            else
                console.log("Chưa đăng nhập");
        });
    }
    useEffect(() => {
        handleAuth()
    }, [])
    const decrease100Calories = () => {
        setTotalCalories(totalCalories - 100);
        setChangPercent(-100, need);
        UserService.updateUserCalories(userData.id, getDateToday(), totalCalories);
        UserService.updateUserWater(userData.id, getDateToday(), waterSeted - 100);
        setWaterSeted(waterSeted - 100)
    };
    const increase100Calories = () => {
        setTotalCalories(totalCalories + 100);
        setChangPercent(100, need);
        UserService.updateUserCalories(userData.id, getDateToday(), totalCalories);
        UserService.updateUserWater(userData.id, getDateToday(), waterSeted + 100);
        setWaterSeted(waterSeted + 100)
    };
    const increase200Calories = () => {
        setTotalCalories(totalCalories + 200);
        setChangPercent(200, need);
        UserService.updateUserCalories(userData.id, getDateToday(), totalCalories);
        UserService.updateUserWater(userData.id, getDateToday(), waterSeted + 200);
        setWaterSeted(waterSeted + 200)

    };
    const handleOnchangeWater = (value) => {   
        setWater(value)
    }
    const handleAddWater = () => {
        setTotalCalories(totalCalories + parseInt(water));
        setChangPercent(water, need);
        UserService.updateUserCalories(userData.id, getDateToday(), totalCalories);
        UserService.updateUserWater(userData.id, getDateToday(), waterSeted + parseInt(water));
        setWaterSeted(waterSeted + parseInt(water))
        setWater(0)
    }
    const handleAdvice = () => {

        const aim = userData.aim
        const temp = parseInt(need - waterSeted);
        console.log(temp)
        if(temp > 0)
            return `Bạn cần uống thêm ${temp} ml nước trong ngày hôm nay`;
        else
            return `Cảnh báo nguy cơ sỏi thận, bạn đã uống quá lượng nước cần thiết trong ngày`
    }

    return(
        <div className={styles.control}>
            <div className={styles.control_title}>
                <p className={styles.title}>Kiểm soát lượng nước trong ngày</p>
                <div className={styles.progress}>
                    <div>
                        <Progress type="circle" percent={percent} strokeColor='#A3D8EA' trailColor='#f8f7f7'/>
                        <p className={styles.info_bar}>{waterSeted} / {parseInt(need)}</p>
                    </div>
                    <Button.Group>
                        <Button onClick={decrease100Calories} icon={<MinusOutlined />} >100</Button>
                        <Button onClick={increase100Calories} icon={<PlusOutlined />} >100</Button>
                        <Button onClick={increase200Calories} icon={<PlusOutlined />} >200</Button>
                    </Button.Group>
                </div>
                <div className={styles.info}>
                    <p>Hôm nay là ngày: {getDateToday()}</p>
                    <p>Lượng nước bạn đã uống trong ngày: <span className={styles.text}>{waterSeted}</span> ml</p>
                    
                    <div className={styles.tip}>
                        <img className={styles.tip_img} alt="example" src={imgTip} />
                        <span className={styles.text}>{userData ? handleAdvice(): ''}</span>
                    </div>
                
                </div>
            </div>
            <div className={styles.change}>
                <Card className={styles.card}>
                    <div className={styles.flex1}>
                        <img className={styles.srcion} alt="example" src={imgNuoc} />
                        <p  className={styles.txt}>Bữa sáng</p>
                        <p>{waterSeted}</p>
                    </div>
                    <InputFormComponent id="moring" placeholder="Nhập calories bữa sáng" type="number" value={water} onChange={handleOnchangeWater} />
                    <button className={styles.pay_m} onClick={handleAddWater}>Thêm</button >
                </Card>
                
            </div>
        </div>
    )
}
export default ChangeWaterComponent