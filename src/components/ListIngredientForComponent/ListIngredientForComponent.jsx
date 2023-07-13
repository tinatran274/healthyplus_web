import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
import * as IngredientService from '../../services/IngredientService'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import InputFormComponent from "../InputFormComponent/InputFormComponent";
import { SearchOutlined} from '@ant-design/icons';
import {useNavigate } from 'react-router-dom'
import { Col, Input, message, Popconfirm , Card, Pagination } from 'antd'

const ListIngredientForComponent = () => {

    const auth = getAuth(app);
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null);
    const [listIngredient, setListIngredient] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [listChecked, setListChecked] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Set the initial page size

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = listIngredient.slice(startIndex, endIndex);


    const getListIngredient = async () => {
        setListIngredient( await IngredientService.getAllIngredient());
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
        getListIngredient()
    }, [])

    const handleOnchangeSearchTerm = (value) => {
        console.log(value)
        setSearchTerm(value)
    }

    const onChange = (id) => {
        if(listChecked.includes(id)){
            const newListChecked = listChecked.filter((item) => item !== id)
            setListChecked(newListChecked)
          }else {
            setListChecked([...listChecked, id])
          }
    }
    const handleSuggestDish = (list) => {
        navigate(`/dish_from_suggest/${encodeURIComponent(JSON.stringify(list))}`)
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePageSizeChange = (current, size) => {
        setCurrentPage(1);
        setPageSize(size);
    }

    return(
        <div>
            <div className={styles.wrap}>
                <div className={styles.list}>
                    {paginatedData
                    .filter((ingredient) => {
                        if(searchTerm == ""){
                            return ingredient;
                        } else if(ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())){
                            return ingredient;
                        }
                    })
                    .map((ingredient) => {
                        return (
                            <Card key={ingredient.id} hoverable >
                                <div className={styles.info_ingr}>
                                    <input type="checkbox" value={ingredient.id}  onChange={(e) => onChange(ingredient.id)}></input>
                                    <img className={styles.ingr_img} alt="ingredient_img" src={ingredient.img} />
                                    <p className={styles.ingr_name} >{ingredient.name}</p>
                                    <p className={styles.deco}><span className={styles.ingr_calo}>{ingredient.calo}kcal</span>/100g</p>
                                </div>
                            </Card>
                        )
                    })}
                </div>
                <div>
                    <button className={styles.more_btn} onClick={() =>  handleSuggestDish(listChecked)}>Tìm kiếm món ăn</button>
                    <div className={styles.search}>
                        <InputFormComponent id="ingr" type="text" placeholder="Nhập nguyên liệu cần tìm" value={searchTerm} onChange={handleOnchangeSearchTerm} />
                        <SearchOutlined />
                    </div>
                </div>
            </div>
            <Pagination className={styles.pagin}
                current={currentPage}
                onChange={handlePageChange}
                onShowSizeChange={handlePageSizeChange}
                total={listIngredient.length}
                showSizeChanger
            />
            
        </div>
    )
}
export default ListIngredientForComponent