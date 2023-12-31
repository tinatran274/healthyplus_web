import React, { useEffect, useState } from 'react'
import CardIngredientComponent from "../../components/CardIngredientComponent/CardIngredientComponent";
import styles from './style.module.css'
import * as IngredientService from '../../services/IngredientService'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import { SearchOutlined} from '@ant-design/icons';
import { Col, Input, message, Popconfirm , Card, Pagination } from 'antd'

const ListIngredientComponent = () => {

    const auth = getAuth(app);
    const [userData, setUserData] = useState(null);
    const [listIngredient, setListIngredient] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
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
export default ListIngredientComponent