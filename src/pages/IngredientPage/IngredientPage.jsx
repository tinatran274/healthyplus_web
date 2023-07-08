import React, { useEffect, useState } from 'react'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'
import NavComponent from "../../components/NavComponent/NavComponent";
import CardProductComponent from "../../components/CardProductComponent/CardProductComponent";
import styles from './style.module.css'
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const IngredientPage = () => {

    const auth = getAuth(app);

    const [userData, setUserData] = useState(null);
    const [listProduct, setListProduct] = useState([]);

    const getListProduct = async () => {
        setListProduct( await ProductService.getAllProduct());
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

    return(
        <div>
            <HeaderComponent/>
            <NavComponent/>
            <div className={styles.list}>
                {listProduct.map((product) => {
                    return (
                        <CardProductComponent
                            key={product.getId()}
                            id={product.getId()}
                            name={product.getName()}
                            cost={product.getCost()}
                            img={product.getImg()}
                            supplier={product.getSupplier()}
                            
                        />
                    )
                })}
            </div>
            <button className={styles.more_btn}>Xem thêm</button>
            
        </div>
    )
}
export default IngredientPage