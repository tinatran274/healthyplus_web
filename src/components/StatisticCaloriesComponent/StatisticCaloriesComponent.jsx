import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { useState, useEffect} from 'react';
import styles from './style.module.css'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import * as UserService from '../../services/UserService'

const StatisticCaloriesComponent = () => {

    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);
    const [caloriesWeek, setCaloriesWeek] = useState([]);

    const getPreviousSevenDays = async (uid) => {
        const today = new Date();
        const list= [];
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() - i);
            const day = String(currentDate.getDate()).padStart(2, '0');
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
            const year = currentDate.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;

            const userCaloriesInWeek = await UserService.getCaloriesInWeek(uid, formattedDate);
            if(userCaloriesInWeek){
                list.push(userCaloriesInWeek)
            }
            else{
                const dataReturn = {
                    date: formattedDate,
                    calories: 0
                }
                list.push(dataReturn)
            }
        }
        setCaloriesWeek(list.reverse())
    }

    const handleAuth = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await UserService.getDetailUser(user.uid);
                setUserData(userData)
                getPreviousSevenDays(user.uid)

            }
            else
                console.log("Chưa đăng nhập");
        });
    }
    useEffect(() => {
        handleAuth()
    }, [])

    return (
        <div>
            <p className={styles.title}>Thống kê lượng calories nạp vào trong 7 ngày</p>

            <BarChart width={600} height={300} data={caloriesWeek} className={styles.chart}>
                <XAxis dataKey="date" stroke="#105602" />
                <YAxis stroke="#105602"/>
                <Tooltip wrapperStyle={{ width: 120, backgroundColor: '#ccc' }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="calories" fill="#1A8C03" barSize={40} />
            </BarChart> 
      </div>
    )
}

  export default StatisticCaloriesComponent