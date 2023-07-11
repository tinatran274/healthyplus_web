import React, { useEffect, useState } from 'react'
import CardDishComponent from "../../components/CardDishComponent/CardDishComponent.jsx";
import styles from './style.module.css'
import * as DishService from '../../services/DishService.js'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { Col, Input, message, Popconfirm, Pagination  } from 'antd'
import { useNavigate } from 'react-router-dom';
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import { SearchOutlined} from '@ant-design/icons';

const LishDishComponent = () => {

    const auth = getAuth(app);
    const navigate = useNavigate()
    const { Search } = Input;
    const onSearch = (value) => console.log(value);
    const [userData, setUserData] = useState(null);
    const [listDish, setListDish] = useState([]);
    const [listFavo, setListFavo] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Set the initial page size

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = listDish.slice(startIndex, endIndex);

    const getListDish = async () => {
        setListDish( await DishService.getAllDish());
    }
    const handleAuth = () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await UserService.getDetailUser(user.uid);
                const userFavo = await DishService.getDishFavo(user.uid);
                setUserData(userData)
                setListFavo(userFavo)
            }
            else
                console.log("Chưa đăng nhập");
        });
    }
    // const handleAddDish = async () => {
    //     console.log('add')
    //     await DishService.addDish();
    // }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handlePageSizeChange = (current, size) => {
        setCurrentPage(1);
        setPageSize(size);
    }
    useEffect(() => {
        handleAuth()
        getListDish()
    }, [])

    const isFavoriteDish = (did) => {
        return listFavo.includes(did);
    }
    const handleListFavo = () => {
        navigate('/favorite_dish')
    }
    const handleOnchangeSearchTerm = (value) => {
        setSearchTerm(value)
    }
    if(listFavo)
        console.log(listFavo)
    return(
        <div>
            <div className={styles.wrap}>
                <div className={styles.list}>
                    {paginatedData
                    .filter((dish) => {
                        if(searchTerm == ""){
                            return dish;
                        } else if(dish.name.toLowerCase().includes(searchTerm.toLowerCase())){
                            return dish;
                        }
                    })
                    .map((dish) => {
                        return (
                            <CardDishComponent
                                key={dish.id}
                                id={dish.id}
                                name={dish.name}
                                calo={dish.calo}
                                carb={dish.carb}
                                fat={dish.fat}
                                protein={dish.protein}
                                img={dish.img}
                                isFavo={isFavoriteDish(dish.id)}
                            />
                        )
                    })}
                </div>
                <div className={styles.search_wrap}>
                    <p className={styles.list_favo} onClick={handleListFavo}>Danh sách món ăn yêu thích</p>
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
                total={listDish.length}
                showSizeChanger
            />
            
        </div>
    )
}
export default LishDishComponent