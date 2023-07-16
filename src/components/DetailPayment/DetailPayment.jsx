import React, { useEffect, useState, useMemo } from 'react'
import styles from './style.module.css'
import * as UserService from '../../services/UserService'
import * as ProductService from '../../services/ProductService'
import * as OrderService from '../../services/OrderService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import {message, Popconfirm , Image, Select} from 'antd'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import imgLocation from '../../image/img_location.png'


const DetailPayment = () => {

    const {list} = useParams();
    const parsedList = JSON.parse(decodeURIComponent(list));
    const auth = getAuth(app);
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null);
    const [listProduct, setListProduct] = useState([]);
    const [address, setAddress] = useState("");
    const [delivery, setDelivery] = useState("Bình thường");
    const [pay, setPay] = useState("Thanh toán khi nhận hàng");
    const [deCost, setDeCost] = useState(30000);


    const getListProduct = async () => { 
        setListProduct(await ProductService.getListProductPayment(parsedList))
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
        getListProduct()
    }, [])

    const getDateToday = () => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    };

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
    const handleOnchangeAddress = (value) => {   
        setAddress(value)
    }

    const handleOnchangeDelivery = (value) => {
        setDelivery(value)
        setDeCost(50000)
    }
    const handleOnchangePay = (value) => {
        setPay(value)
    }

    const priceMemo = useMemo(() => {
        const total = listProduct.reduce((total, cur) => {
            return total + ((parseInt(cur.cost) * cur.num))
        },0)
        return total
    },)

    const handlePay = async () => {
        const listP = {}

        for (const obj of listProduct) {
            await ProductService.deleteProductCart(userData.id, obj.id)
            listP[obj.id] = obj.num
          }
        const total = priceMemo + deCost;
        await OrderService.addOrder(userData.id, address, getDateToday(), delivery, pay, listP, total)
        message.success('Đặt hàng thành công');
        navigate('/')
    };

    const confirmPay = (e) => {
        handlePay();
    };
    const cancelPay = (e) => {
        message.error('Hủy đặt hàng');
    };

    return(
        <div>
            <div className={styles.wrap}>
                <div className={styles.flexbox}>
                    <div><img className={styles.img_deco1} alt="example" src={imgLocation} /></div>
                    <div>
                        <b>Thông tin khách hàng</b>
                        <p>Mã khách hàng: {userData? userData.id : ""}</p>
                        <InputFormComponent id="address"  className={styles.inp_add} placeholder="Nhập địa chỉ giao hàng ..." type="text" value={address} onChange={handleOnchangeAddress} /> 
                    </div>
                </div>

                <div className={styles.list}>
                    {listProduct.map((product) => {
                        return (
                            <div key={product.id} className={styles.card} hoverable='false'>
                                <div className={styles.flex_collum}>
                                    <Image className={styles.p_img} src={product.img} alt="img" preview={false}/>
                                    <b className={styles.p_name}>{product.name}</b>
                                    <p className={styles.p_supplier}>{product.supplier}</p>      
                                    <p className={styles.p_cost}>{addDotsToNumber(parseInt(product.cost))} đ</p>
                                    <p className={styles.num}>{product.num} </p>   
                                    <p className={styles.unit}>{addDotsToNumber(parseInt(product.cost*product.num))} đ</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.more_info}>
                        <span>Phương thức vận chuyển</span>
                        <Select className={styles.select}
                            value={delivery}
                            onChange={handleOnchangeDelivery}
                            options={[
                                { value: 'Bình thường', label: 'Bình thường' },
                                { value: 'Hỏa tốc', label: 'Hỏa tốc' },
                            ]}/>
                        <br/>
                        <span>Phương thức thanh toán</span>
                        <Select className={styles.select}
                            value={pay}
                            onChange={handleOnchangePay}
                            options={[
                                { value: 'Thanh toán khi nhận hàng', label: 'Thanh toán khi nhận hàng' },
                                { value: 'Ví điện tử Momo', label: 'Ví điện tử Momo' },
                            ]}/>
                </div>
                <div className={styles.totalcost}>
                    <div>
                        <p>Tổng tiền hàng</p>
                        <p>Phí vận chuyển</p>
                        <p>Tổng cộng</p>
                    </div>
                    <div>
                        <p>{addDotsToNumber(priceMemo)}</p>
                        <p>{addDotsToNumber(deCost)}</p>
                        <p>{addDotsToNumber(deCost+priceMemo)}</p>
                    </div>
                    
                    
                </div>
        
            </div>
            <div className={styles.footer}>
                <p>Tổng tiền:</p>
                <h3 className={styles.total_cost}>{addDotsToNumber(priceMemo+deCost)} đ</h3>
                <Popconfirm
                    title="Thanh toán"
                    description="Xác nhận thanh toán?"
                    onConfirm={confirmPay}
                    onCancel={cancelPay}
                    okText="Xác nhận"
                    cancelText="Hủy bỏ">
                    <button className={styles.submit_btn}>Thanh toán</button>
                </Popconfirm>
            </div>
            
        </div>
    )
}
export default DetailPayment