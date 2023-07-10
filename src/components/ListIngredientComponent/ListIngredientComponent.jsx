import React, { useEffect, useState } from 'react'
import CardIngredientComponent from "../../components/CardIngredientComponent/CardIngredientComponent";
import styles from './style.module.css'
import * as IngredientService from '../../services/IngredientService'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import { SearchOutlined} from '@ant-design/icons';

const ListIngredientComponent = () => {

    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);
    const [listIngredient, setListIngredient] = useState([]);
    const [email, setEmail] = useState('');
    const [searchTerm, setSearchTerm] = useState("");

    const getListIngredient = async () => {
        setListIngredient( await IngredientService.getAllIngredient());
    }
    const handleAuth = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await UserService.getDetailUser(user.uid);
                setUserData(userData)
                console.log(user)
            }
            else
                console.log("Chưa đăng nhập");
        });
    }

    useEffect(() => {
        handleAuth()
        getListIngredient()
    }, [])

    const handleOnchangeSearchTerm = (value) => {
        console.log(value)
        setSearchTerm(value)
    }

    return(
        <div>
            <div className={styles.wrap}>
                <div className={styles.list}>
                    {listIngredient
                    .filter((ingredient) => {
                        if(searchTerm == ""){
                            return ingredient;
                        } else if(ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())){
                            return ingredient;
                        }
                    })
                    .map((ingredient) => {
                        return (
                            <CardIngredientComponent
                                key={ingredient.id}
                                id={ingredient.id}
                                name={ingredient.name}
                                calo={ingredient.calo}
                                img={ingredient.img}
                            />
                        )
                    })}
                </div>
                <div>   
                    <div className={styles.search}>
                        <InputFormComponent id="ingr" type="text" placeholder="Nhập nguyên liệu cần tìm" value={searchTerm} onChange={handleOnchangeSearchTerm} />
                        <SearchOutlined />
                    </div>
                </div >
            </div>
            <button className={styles.more_btn}>Xem thêm {email}</button>
        </div>
    )
}
export default ListIngredientComponent