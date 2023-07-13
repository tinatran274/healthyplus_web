import React from "react";
import { Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'

const CardTechnologyProductComponent = (props) => {

    const { id, name, cost, img, supplier } = props
    const navigate = useNavigate()

    const handleDetailsProduct = (id) => {
        navigate(`/detail_technology_product/${id}`)
    }

    return(
        <Card
            onClick={() => handleDetailsProduct(id)}
            hoverable
            style={{ width: 250 }}
            cover={<img className={styles.img_product} alt="example" src={img} />}>
            <div className={styles.info_product}>
                <p className={styles.product_name} >{name}</p>
                <p className={styles.supplier}>{supplier}</p>
                <h3 className={styles.cost}>{cost}</h3>
                <Button className={styles.add_btn} shape="circle" icon={<PlusOutlined className={styles.icon}/>}></Button>
            </div>
        </Card>
    )
}
export default CardTechnologyProductComponent