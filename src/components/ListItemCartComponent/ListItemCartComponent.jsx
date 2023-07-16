import React, { useEffect, useState, useMemo } from 'react'
import styles from './style.module.css'
import { DeleteOutlined, ContainerOutlined } from '@ant-design/icons';
import { Button, Card, Image } from 'antd';
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import { useLocation, useNavigate } from 'react-router-dom'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const ListItemCartComponent = () => {
    
    const auth = getAuth(app);

    const [userData, setUserData] = useState(null);
    const [listProduct, setListProduct] = useState([]);
    const [listChecked, setListChecked] = useState([]);
    const navigate = useNavigate()

    const handleAuth = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await UserService.getDetailUser(user.uid);
                setUserData(userData)
                const userCart = await ProductService.getProductInCart(userData.id);
                setListProduct(userCart) 
            }
            else
                console.log("Chưa đăng nhập");
        });
    }

    useEffect(() => {
        handleAuth()
    }, [])

    const onChange = (isChecked, pid, pcost, pnum) => {
        const productChecked = {
            id: pid,
            cost: pcost,
            num: pnum
        };
        const attributeList = listChecked.map(obj => obj.id);
        if(attributeList.includes(pid)){
            const newListChecked = listChecked.filter((item) => item.id !== pid)
            setListChecked(newListChecked)
          }else {
            setListChecked([...listChecked, productChecked])
        }
    }
    const deleteProductCart = async (pid) => {
        await ProductService.deleteProductCart(userData.id, pid);
        handleAuth()
    }

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

    const priceMemo = useMemo(() => {
        const total = listChecked.reduce((total, cur) => {
            return total + ((cur.cost * cur.num))
        },0)
        return total
    },[listChecked])

    const handlePayment = (list) => {
        navigate(`/payment/${encodeURIComponent(JSON.stringify(list))}`)
    }

    const handleGoHistory = () => {
        navigate(`/history/`)
    }

    const numMemo = useMemo(() => {
        const total = listChecked.reduce((total, cur) => {
            return total + ((cur.num))
        },0)
        return total
    },[listChecked])


    return(
        <div>
            <div className={styles.list}>
                <button className={styles.his} onClick={() => handleGoHistory()}>Lịch sử đặt hàng </button>
                {listProduct.map((product) => {
                    return (
                        <Card key={product.id} className={styles.card} hoverable>
                            <div className={styles.flex_collum}>
                                <input type="checkbox" onChange={(e) => onChange(e.target.checked, product.id, product.cost, product.num)} ></input>
                                <Image className={styles.p_img} src={product.img} alt="img" preview={false}/>
                                <b className={styles.p_name}>{product.name}</b>
                                <p className={styles.p_supplier}>{product.supplier}</p>      
                                <p className={styles.p_cost}>{addDotsToNumber(parseInt(product.cost))} đ</p>
                                <div className={styles.num}><p> {product.num} </p></div>
                                <p className={styles.unit}>{addDotsToNumber(parseInt(product.cost*product.num))} đ</p>
                                <DeleteOutlined onClick={() => deleteProductCart(product.id)}/>
                            </div>
                            
                        </Card>
                    )
                })}
            </div>

            <div className={styles.footer}>
                <p className={styles.total_num}>Tổng số sản phẩm: {numMemo}</p>
                <p>Tổng tiền:</p>
                <h3 className={styles.total_cost}>{addDotsToNumber(parseInt(priceMemo))} đ</h3>
                <button className={styles.submit_btn} onClick={() =>  handlePayment(listChecked)}>Thanh toán</button>
            </div>
            
        </div>
    )
}
export default ListItemCartComponent