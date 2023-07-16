import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import * as OrderService from '../../services/OrderService'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { SearchOutlined} from '@ant-design/icons';
import {useNavigate } from 'react-router-dom'
import {Card, Pagination } from 'antd'

const ListOrderComponent = () => {

    const auth = getAuth(app);
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null);
    const [listOrder, setListOrder] = useState([]);

    const handleAuth = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await UserService.getDetailUser(user.uid);
                setListOrder( await OrderService.getAllOrder(user.uid));
                setUserData(userData)
            }
            else
                console.log("Chưa đăng nhập");
        });
    }

    useEffect(() => {
        handleAuth()
    }, [])

    console.log(listOrder)
    
    const addDotsToNumber = (number) => {
        const numberString = number.toString();
        const length = numberString.length;
        let result = "";
      
        for (let i = 0; i < length; i++) {
          result += numberString[i];
          if ((length - i - 1) % 3 === 0 && i !== length - 1) {
            result += ".";
          }
        }
        return result;
    }
    return(
        <div>
            <div className={styles.list}>
                    {listOrder
                    .map((order) => {
                        return (
                            <Card key={order.id} hoverable className={styles.card}>
                                {order.isDelivery ?
                                    <div className={styles.info_true}>
                                        <div>
                                            <p className={styles.oid} >Mã đơn đặt hàng: <b>{order.id}</b></p>
                                            <p className={styles.oid} >Phương thức thanh toán: {order.pay}</p>
                                            <p className={styles.oid} >Phương thức vận chuyển: {order.delivery}</p>
                                        </div>
                                        <div className={styles.temp}>
                                            <p>Ngày đặt hàng: {order.date}</p>
                                            {order.is_receive?
                                                <p>Giao hàng thành công</p>
                                                :
                                                <p>Đơn hàng đang vận chuyển</p>
                                            }
                                            <p className={styles.deco}>Tổng hóa đơn: <b>{addDotsToNumber(order.total)}</b></p>
                                        </div>    
                                    </div>
                                    :
                                    <div className={styles.info_false}>
                                        <div>
                                            <p className={styles.oid} >Mã đơn đặt hàng: <b>{order.id}</b></p>
                                            <p className={styles.oid} >Phương thức thanh toán: {order.pay}</p>
                                            <p className={styles.oid} >Phương thức vận chuyển: {order.delivery}</p>
                                        </div>
                                        <div className={styles.temp}>
                                            <p>Ngày đặt hàng: {order.date}</p>
                                            <p>Đơn hàng đã bị hủy</p>
                                            <p className={styles.deco}>Tổng hóa đơn: <b>{addDotsToNumber(order.total)}</b></p>
                                        </div> 
                                    </div>

                                }
                                
                            </Card>   
                        )
                    })
                    }
            </div>
        </div>

    )
}
export default ListOrderComponent