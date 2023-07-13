import React from "react";
import {CaretDownOutlined, CaretRightOutlined} from '@ant-design/icons';
import { WrapperLink, WrapperDropButton, WrapperDropContent} from './style'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom';

const NavComponent = () => {

    const navigate = useNavigate()
    const handleHome = () => {  
        navigate('/')
    }
    const handleControlCalories = () => {  
        navigate('/control_calories')
    }
    const handleControlWater = () => {  
        navigate('/control_water')
    }
    const handleIngredientPage = () => {  
        navigate('/ingredient')
    }
    const handleDishPage = () => {  
        navigate('/dish')
    }
    const handleSuggestDishPage = () => {  
        navigate('/suggest_dish')
    }
    const handleProductPage = () => {  
        navigate('/product')
    }
    const handleTechnologyProductPage = () => {  
        navigate('/technology_product')
    }
    const handleExercisePage = () => {  
        navigate('/exercise')
    }
    return(
        <div>
            <div className={styles.topnav} id="myTopnav">
                <WrapperLink onClick={handleHome}>Trang Chủ</WrapperLink>
                <div className={styles.dropdown}>
                <WrapperDropButton className={styles.dropbtn}>Kiểm soát
                <CaretDownOutlined className={styles.icon}/>
                </WrapperDropButton>
                <WrapperDropContent className={styles.dropdown_content}>
                    <WrapperLink onClick={handleControlCalories}><CaretRightOutlined className={styles.icon}/>Calories</WrapperLink>
                    <WrapperLink onClick={handleControlWater}><CaretRightOutlined className={styles.icon}/>Nước</WrapperLink>
                </WrapperDropContent>
                </div>
                <div className={styles.dropdown}>
                    <WrapperDropButton className={styles.dropbtn}>Thông tin dinh dưỡng
                    <CaretDownOutlined className={styles.icon}/>
                    </WrapperDropButton>
                    <WrapperDropContent className={styles.dropdown_content}>
                    <WrapperLink onClick={handleDishPage}><CaretRightOutlined className={styles.icon}/>Món ăn</WrapperLink>
                    <WrapperLink onClick={handleIngredientPage}><CaretRightOutlined className={styles.icon}/>Nguyên liệu</WrapperLink>
                    </WrapperDropContent>
                </div>
                <WrapperLink onClick={handleSuggestDishPage}>Gợi ý món</WrapperLink>
                <WrapperLink onClick={handleExercisePage}>Vận động</WrapperLink>
                <WrapperLink>Cộng đồng</WrapperLink>
                <div className={styles.dropdown}>
                    <WrapperDropButton className={styles.dropbtn}>Sản phẩm
                    <CaretDownOutlined className={styles.icon}/>
                    </WrapperDropButton>
                    <WrapperDropContent className={styles.dropdown_content}>
                    <WrapperLink  onClick={handleProductPage}><CaretRightOutlined className={styles.icon}/>Thực phẩm</WrapperLink>
                    <WrapperLink onClick={handleTechnologyProductPage}><CaretRightOutlined className={styles.icon}/>Đồ công nghệ</WrapperLink>
                    </WrapperDropContent>
                </div>
                <div className={styles.dropdown}>
                    <WrapperDropButton className={styles.dropbtn}>Về chúng tôi
                    <CaretDownOutlined className={styles.icon}/>
                    </WrapperDropButton>
                    <WrapperDropContent className={styles.dropdown_content}>
                    <WrapperLink href="#"><CaretRightOutlined className={styles.icon}/>HealthyPlus</WrapperLink>
                    <WrapperLink href="#"><CaretRightOutlined className={styles.icon}/>Liên Hệ</WrapperLink>
                    </WrapperDropContent>
                </div>
            </div>
        </div> 
    )
}
export default NavComponent