import React, { useEffect, useState } from 'react'
import CardProductComponent from "../../components/CardProductComponent/CardProductComponent";
import styles from './style.module.css'
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { Col, Input, message, Popconfirm , Card, Pagination } from 'antd'
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import { SearchOutlined} from '@ant-design/icons';

const ListProductComponent = () => {

    const auth = getAuth(app);

    const [userData, setUserData] = useState(null);
    const [listProduct, setListProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Set the initial page size

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = listProduct.slice(startIndex, endIndex);

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
                    .filter((product) => {
                        if(searchTerm == ""){
                            return product;
                        } else if(product.name.toLowerCase().includes(searchTerm.toLowerCase())){
                            return product;
                        }
                    })
                    .map((product) => {
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
                <div>   
                    <div className={styles.search}>
                        <InputFormComponent id="ingr" type="text" placeholder="Nhập sản phẩm cần tìm" value={searchTerm} onChange={handleOnchangeSearchTerm} />
                        <SearchOutlined />
                    </div>
                </div >
            </div>
            <Pagination className={styles.pagin}
                current={currentPage}
                onChange={handlePageChange}
                onShowSizeChange={handlePageSizeChange}
                total={listProduct.length}
                showSizeChanger
            />
            
        </div>
    )
}
export default ListProductComponent