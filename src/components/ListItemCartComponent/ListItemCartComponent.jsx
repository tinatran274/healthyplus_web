import React, { useEffect, useState, useMemo } from 'react'
import styles from './style.module.css'
import { PlusOutlined, MinusOutlined, DeleteOutlined  } from '@ant-design/icons';
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
    const [num, setNum] = useState([]);
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

    const handleChangeCount = async (type, pid, cost, num) => {
        if(type === 'increase') {
            await ProductService.increaseProductCart(userData.id, pid, num);
            const newList = listProduct;
            const foundIndex = newList.findIndex(obj => obj.id == pid);
            newList[foundIndex].num += 1;
            setListProduct(newList)
            
        }else {
            if(num>0) {
                await ProductService.decreaseProductCart(userData.id, pid, num);
                const newList = listProduct;
                const foundIndex = newList.findIndex(obj => obj.id == pid);
                newList[foundIndex].num -=1;
                setListProduct(newList)
            }
        }
    }
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
    // const handleOnchangeCheckAll = (e) => {
    //     if(e.target.checked) {
    //         listChecked.length = 0
    //         listProduct.forEach((item) => {
    //             listChecked.push(item.id)
    //       })
    //     }else {
    //         listChecked.length = 0
    //     }
    //     console.log(listChecked)
    //   }
    const deleteProductCart = async (pid) => {
        await ProductService.deleteProductCart(userData.id, pid);
        handleAuth()
    }

    const priceMemo = useMemo(() => {
        const total = listChecked.reduce((total, cur) => {
            return total + ((cur.cost * cur.num))
        },0)
        return total
    },[listChecked])


    console.log(listProduct)
 
    const render = async () => {
        
    }

    return(
        <div>
            <div className={styles.list}>
                {listProduct.map((product) => {
                    return (
                        <Card key={product.id} className={styles.card} hoverable>
                            <div className={styles.flex_collum}>
                                <input type="checkbox" onChange={(e) => onChange(e.target.checked, product.id, product.cost, product.num)}></input>
                                <Image className={styles.p_img} src={product.img} alt="img" preview={false}/>
                                <b className={styles.p_name}>{product.name}</b>
                                <p className={styles.p_supplier}>{product.supplier}</p>      
                                <p className={styles.p_cost}>{product.cost} đ</p>
                                <div className={styles.num}>
                                    <Button shape="circle" icon={<PlusOutlined/>} onClick={() => handleChangeCount('increase', product.id, product.cost, product.num)}></Button>
                                    <p> {product.num} </p>
                                    <Button shape="circle" icon={<MinusOutlined/>} onClick={() => handleChangeCount('decrease', product.id, product.cost, product.num)}></Button>
                                </div>
                                <p className={styles.unit}>{product.cost*product.num} đ</p>
                                <DeleteOutlined onClick={() => deleteProductCart(product.id)}/>
                            </div>
                            
                        </Card>
                    )
                })}
            </div>

            <div className={styles.footer}>
                <p className={styles.total_num}>Tổng số sản phẩm: </p>
                <p>Tổng tiền:</p>
                <h3 className={styles.total_cost}>{priceMemo} đ</h3>
                <button className={styles.submit_btn}>Thanh toán</button>
            </div>
            
        </div>
    )
}
export default ListItemCartComponent