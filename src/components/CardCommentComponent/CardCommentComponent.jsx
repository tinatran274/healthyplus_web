import React, {useState, useEffect} from "react";
import styles from './style.module.css'
import { Card, Button, Input } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import * as message from '../MessageComponent/MessageComponent'
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import CardReplyComponent from "../CardReplyComponent/CardReplyComponent.jsx";
const { TextArea } = Input;


const CardCommentComponent = (props) => {

    const { id, uid, date, content } = props
    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);
    const [value, setValue] = useState('');
    const [show, setShow] = useState(false);
    const [listReply, setListRepLy] = useState([]);

    const getListReply = async () => {
        setListRepLy (await ProductService.getReply(id));
    }
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
        getListReply()
    }, [])
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

    const handleSetShow = () => {
        if(show) setShow(false)
        else setShow(true)
    }

    const handleReply = () => {
        ProductService.addReplyCmt(id, userData.id, getDateToday(), value);
        setValue("")
        message.success()
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
            <span className={styles.reply}>Thích</span>
            <span className={styles.reply} onClick={handleSetShow} >Phản hồi</span>
            {show?
                <div className={styles.flex1}>
                    <TextArea className={styles.te} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Nhập phản hồi"
                        autoSize={{ minRows: 1, maxRows: 3, }}/>
                    <Button className={styles.add_btn} shape="circle" onClick={handleReply} 
                    icon={<CaretRightOutlined className={styles.icon}/>} ></Button>
                </div>
            :""
            }
            {listReply?
                    listReply.map((rep) => {
                        return (
                            <CardReplyComponent
                                key={rep.id}
                                id={rep.id}
                                uid={rep.uid}
                                date={rep.date}
                                content={rep.content}
                            />
                        )
                    }) : ""}

            
            
        </div>
    )
}
export default CardCommentComponent