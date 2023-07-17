import React, {useState, useEffect} from "react";
import styles from './style.module.css'
import { Card, Button, Input } from 'antd';
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
const { TextArea } = Input;


const CardReplyComponent = (props) => {

    const { id, uid, date, content } = props
    const auth = getAuth(app);

    const getDateToday = () => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    }

    const calculateNumberOfDaysFromDate = (dateString) => {
        const oneDay = 24 * 60 * 60 * 1000; 
        const today = new Date(); 
        const [day, month, year] = dateString.split('-');
        const startDate = new Date(`${year}-${month}-${day}`);
        const diffDays = Math.round(Math.abs((today - startDate) / oneDay));
        return diffDays;
    }
      

    return(
        <div className={styles.wrap}>
            <p>
                <span className={styles.uid}> {uid}</span> 
                <span className={styles.date}>
                    {date == getDateToday() ? "Hôm nay": calculateNumberOfDaysFromDate(date) + ' ngày trước'}
                </span>
            </p>
            <div className={styles.content}>{content}</div>
        </div>
    )
}
export default CardReplyComponent