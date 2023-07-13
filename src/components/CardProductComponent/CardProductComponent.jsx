import React from "react";
import { Card, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'

const CardProductComponent = (props) => {

    const { id, name, cost, img, supplier } = props
    const navigate = useNavigate()

    const handleDetailsProduct = (id) => {
        navigate(`/detail_product/${id}`)
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
        <Card
            onClick={() => handleDetailsProduct(id)}
            hoverable
            style={{ width: 250 }}
            cover={<img className={styles.img_product} alt="example" src={img} />}>
            <div className={styles.info_product}>
                <p className={styles.product_name} >{name}</p>
                <p className={styles.supplier}>{supplier}</p>
                <h3 className={styles.cost}>{addDotsToNumber(parseInt(cost))}</h3>
                <Button className={styles.add_btn} shape="circle" icon={<PlusOutlined className={styles.icon}/>}></Button>
            </div>
        </Card>
    )
}
export default CardProductComponent