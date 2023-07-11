import React, { useEffect, useState } from 'react'
import CardDishComponent from "../../components/CardDishComponent/CardDishComponent.jsx";
import styles from './style.module.css'
import * as DishService from '../../services/DishService.js'
import * as UserService from '../../services/UserService'
import * as IngredientService from '../../services/IngredientService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { Col, Input, message, Popconfirm , Card, Pagination } from 'antd'
import { useNavigate } from 'react-router-dom';
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import { SearchOutlined} from '@ant-design/icons';
import { useParams } from 'react-router-dom';


const LishDishSuggestComponent = () => {

    const {list} = useParams();
    const parsedList = JSON.parse(decodeURIComponent(list));
    const auth = getAuth(app);
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null);
    const [listDish, setListDish] = useState([]);
    const [listAllDish, setListAllDish] = useState([]);
    const [listIngredientName, setListIngredientName] = useState([]);
    const [listFavo, setListFavo] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Set the initial page size
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = listDish.slice(startIndex, endIndex);

    const getListIngredientName = async () => { 
        setListIngredientName(await IngredientService.getListIngredientNameById(parsedList))

    }
    const getListAllDish = async () => {
        setListAllDish( await DishService.getAllDish());
    }
    const getListDish = async () => {
        const listIngredientName1 = await IngredientService.getListIngredientNameById(parsedList)
        const listAllDish1 =  await DishService.getAllDish();
        const filterDish = listAllDish1
        .filter((dish) => {
            const concatenatedIngre = dish.ingredient.map(word => word.toLowerCase(). replace(/ /g, '')).join("");
            const nameIngre = listIngredientName1.map(element => element.toLowerCase().replace(/ /g, ''));
            return nameIngre.every(element => concatenatedIngre.includes(element));
        })
        setListDish(filterDish)
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
    useEffect(() => {
        handleAuth()
        getListIngredientName()
        getListAllDish()
        getListDish()
    }, [])

    const isFavoriteDish = (did) => {
        return listFavo.includes(did);
    }
    const handleListFavo = () => {
        navigate('/favorite_dish')
    }
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
    if(listDish){
        console.log('list: ',listDish)
    }
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
export default LishDishSuggestComponent