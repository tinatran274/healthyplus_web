import React, { useEffect, useState } from 'react'
import { Col, Row, Image, Button} from 'antd';
import { PlusOutlined, MinusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import styles from './style.module.css'
import app from '../../config/firebase'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import * as message from '../../components/MessageComponent/MessageComponent'

const DetailProductComponent = ({idProduct}) => {

    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);
    const [product, setProduct] = useState([]);
    const [numProduct, setNumProduct] = useState(1)
    const navigate = useNavigate()

    const getProduct = async () => {
        setProduct( await ProductService.getProductById(idProduct));
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
        getProduct()
    }, [])

    const onChangeNum = (value) => { 
        setNumProduct(Number(value))
    }
    const handleChangeCount = (type) => {
        if(type === 'increase') {
            setNumProduct(numProduct + 1)
        }else {
            if(numProduct>0)
                setNumProduct(numProduct - 1)   
        }
    }
    const handleAddToCart = (value) => {
        console.log(product.id)
        ProductService.addProductToCart(userData.id, product.id, numProduct);
        handleAuth()
        message.success()
    }
    return(
        <div className={styles.main_pro}>
            <div>
                <Row>
                    <Col span={10}>
                    <Image src={product.img} alt="img" preview={false}/>
                    </Col>
                    <Col span={14}>
                        <div className={styles.wrap_detail_product}>
                            <h1 className={styles.name}>{product.name}</h1>
                            <p className={styles.supplier}>{product.supplier}</p>
                            <h2 className={styles.cost}>{product.cost}</h2>
                            <div className={styles.wrap_num}>
                                <p>Số Lượng</p>
                                <div className={styles.num}>
                                    <Button shape="circle" icon={<PlusOutlined/>} onClick={() => handleChangeCount('decrease')}></Button>
                                    <p onChange={onChangeNum}> {numProduct} </p>
                                    <Button shape="circle" icon={<MinusOutlined/>} onClick={() => handleChangeCount('increase')}></Button>
                                </div>
                            </div>
                            <div className={styles.add_cart}>
                                <button className={styles.add} onClick={handleAddToCart}><ShoppingCartOutlined className={styles.icon}/>Thêm vào giỏ hàng</button>
                                <button className={styles.pay} >Thanh toán</button >
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default DetailProductComponent