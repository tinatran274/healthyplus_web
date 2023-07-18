import React, { useEffect, useState, useMemo } from 'react'
import { Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'
import * as TechnologyProductService from '../../services/TechnologyProductService'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import * as message from '../../components/MessageComponent/MessageComponent'

const CardTechnologyProductComponent = (props) => {

    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);
    const { id, name, cost, img, supplier } = props
    const navigate = useNavigate()

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
    }, [])
    
    const handleDetailsProduct = (id) => {
        navigate(`/detail_technology_product/${id}`)
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

    const handleAddCart = (id) => {
        if (userData) {
            TechnologyProductService.addTechnologyProductToCart(userData.id, id, 1);
            message.success(`Bạn đã thêm ${name} vào giỏ hàng`)
        }
        else message.error("Bạn chưa đăng nhập")
    }

    return(
        <Card className={styles.card}
            hoverable
            cover={<img className={styles.img_product} alt="example" 
            src={img} onClick={() => handleDetailsProduct(id)}/>}>
            <div className={styles.info_product}>
                <p className={styles.product_name} onClick={() => handleDetailsProduct(id)}>{name}</p>
                <p className={styles.supplier}>{supplier}</p>
                <h3 className={styles.cost}>{addDotsToNumber(parseInt(cost))}</h3>
                <Button className={styles.add_btn} shape="circle"  onClick={() => handleAddCart(id)}
                icon={<PlusOutlined className={styles.icon}/>}></Button>
            </div>
        </Card>
    )
}
export default CardTechnologyProductComponent