import React, { useEffect, useState } from 'react'
import { Col, Row, Image, Button, Rate} from 'antd';
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
    const [aveRating, setAveRating] = useState(0);
    const [numRating, setNumRating] = useState(0);
    const navigate = useNavigate()

    const getProduct = async () => {
        setProduct( await ProductService.getProductById(idProduct));
        setAveRating (parseInt(await ProductService.getAllRatingProduct(idProduct)));
        setNumRating (await ProductService.getNumRatingProduct(idProduct));
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
        if (userData) {
            if(type === 'increase') 
                setNumProduct(numProduct + 1)
            else 
                if(numProduct>1)
                    setNumProduct(numProduct - 1)  
        } 
        else 
            message.error("Bạn chưa đăng nhập")
    }
    const handleAddToCart = () => {
        if (userData){
            ProductService.addProductToCart(userData.id, product.id, numProduct);
            message.success(`Bạn đã thêm ${product.name} vào giỏ hàng`)
        }
        else message.error("Bạn chưa đăng nhập")
        
    }
    const handlePayment = () => {
        const list = [];
        const productTemp = {
            id: product.id,
            cost: product.cost,
            num: numProduct,
        };
        list.push(productTemp)
        if (userData)
            navigate(`/payment/${encodeURIComponent(JSON.stringify(list))}`)
        else message.error("Bạn chưa đăng nhập")
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
    return(
        <div className={styles.main_pro}>
            <div>
                <div className={styles.flexr}>
                    <div className={styles.pimg}>
                        <Image src={product.img} alt="img" preview={false}/>
                    </div>
                    <div>
                        <div className={styles.wrap_detail_product}>
                            <h1 className={styles.name}>{product.name}</h1>
                            <span className={styles.rate}>
                                <Rate disabled value={aveRating} />
                                <span className={styles.num_rate}>{numRating} lượt đánh giá</span>
                            </span>
                            <p className={styles.supplier}>{product.supplier}</p>
                            <h2 className={styles.cost}>{addDotsToNumber(parseInt(product.cost))}</h2>
                            <div className={styles.wrap_num}>
                                <p>Số Lượng</p>
                                <div className={styles.num}>
                                    <Button shape="circle" icon={<MinusOutlined/>} onClick={() => handleChangeCount('decrease')}></Button>
                                    <p onChange={onChangeNum}> {numProduct} </p>
                                    <Button shape="circle" icon={<PlusOutlined/>} onClick={() => handleChangeCount('increase')}></Button>
                                </div>
                            </div>
                            <div className={styles.add_cart}>
                                <button className={styles.add} onClick={handleAddToCart}><ShoppingCartOutlined className={styles.icon}/>Thêm vào giỏ hàng</button>
                                <button className={styles.pay} onClick={() =>  handlePayment()}>Thanh toán</button >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetailProductComponent