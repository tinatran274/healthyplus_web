import styles from './style.module.css'
import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Input, Rate} from 'antd';
import * as UserService from '../../services/UserService'
import * as TechnologyProductService from '../../services/TechnologyProductService'
import app from '../../config/firebase'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import * as message from '../MessageComponent/MessageComponent'
import CardCommentComponent from "../CardCommentComponent/CardCommentComponent.jsx";
const { TextArea } = Input;

const CommentTechnologyProductComponent = ({idProduct}) => {

    const auth = getAuth(app);
    const [value, setValue] = useState('');
    const [rating, setRating] = useState(0);
    const [userData, setUserData] = useState(null);
    const [product, setProduct] = useState([]);
    const [listCmtDetail, setListCmtDetail] = useState([]);
    const desc = ['Quá tệ', 'Tệ', 'Bình thường', 'Ngon', 'Tuyệt vời'];

    const getDateToday = () => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    }

    const getProduct = async () => {
        setProduct (await TechnologyProductService.getTechnologyProductById(idProduct));
        setListCmtDetail (await TechnologyProductService.getTechnologyProductComment(idProduct));
    }
    const handleAuth = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await UserService.getDetailUser(user.uid);
                const userRating = await TechnologyProductService.getUserRatingTechnologyProduct(user.uid, idProduct);
                setUserData(userData)
                if (userRating)
                    setRating(userRating.rating)
            }
            else
                console.log("Chưa đăng nhập");  
        });
    }
    useEffect(() => {
        handleAuth()
        getProduct()
    }, [])
    const handleAddCmt = () => {
        if(userData){
            if(value) {
                TechnologyProductService.addCommentTechnologyProduct(userData.id, product.id, getDateToday(), value);
                setValue("")
                message.success()
            }
            else message.error("Bạn chưa nhập bình luận")
        }
        else
            message.error("Bạn chưa đăng nhập")
    }
    const handleAddRating = () => {
        if(userData){
            TechnologyProductService.addRatingTechnologyProduct(userData.id, product.id, rating);
            message.success()
        }
        else
            message.error("Bạn chưa đăng nhập")
    }
    return(
        <div className={styles.test}>
            <div>
                <span className={styles.txt}>Đánh giá</span>
                <span className={styles.rate}>
                    <Rate tooltips={desc} onChange={setRating} value={rating} />
                    {rating ? <span className="ant-rate-text">{desc[rating - 1]}</span> : ''}
                </span>
                <button className={styles.pay} onClick={handleAddRating} >Đánh giá</button >
            </div>
            <div>
                <p className={styles.txt}>Bình luận</p>
                <TextArea value={value} onChange={(e) => setValue(e.target.value)} placeholder="Nhập bình luận"
                    autoSize={{ minRows: 3, maxRows: 5, }}
                />
                <button className={styles.pay} onClick={handleAddCmt} >Hoàn tất</button >
             </div>
             <div>
                {listCmtDetail?
                    listCmtDetail.map((cmt) => {
                        return (
                            <CardCommentComponent
                                key={cmt.id}
                                id={cmt.id}
                                pid={product.id}
                                uid={cmt.uid}
                                date={cmt.date}
                                content={cmt.content}
                                num={cmt.numLike}
                                type={1}
                            />
                        )
                    }) : ""}
             </div>

        </div>
    )
}
export default CommentTechnologyProductComponent