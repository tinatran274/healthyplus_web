import React, {useState} from "react";
import {CaretDownOutlined, CaretRightOutlined, AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { WrapperLink, WrapperDropButton, WrapperDropContent} from './style'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom';

const NavComponent = () => {

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

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
                <div className={styles.nores}>
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
                <div className={styles.res} style={{ width: 256 }}>
                <button
                    className={styles.pay}
                    onClick={toggleCollapsed}
                    style={{ marginBottom: 16}} >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </button>
                {collapsed ? 
                    <div className={styles.navres} style={{ display: "block" }}>
                        <div className={styles.btn} onClick={handleHome}>Trang Chủ</div>
                        <div className={styles.drop}>
                            <div className={styles.btn}>Kiểm soát<CaretDownOutlined className={styles.icon}/></div>
                            <div className={styles.content}>
                                <div className={styles.link} onClick={handleControlCalories}><CaretRightOutlined className={styles.icon}/>Calories</div>
                                <div className={styles.link} onClick={handleControlWater}><CaretRightOutlined className={styles.icon}/>Nước</div>
                            </div>
                        </div>
                        <div className={styles.drop}>
                            <div className={styles.btn}>Thông tin dinh dưỡng<CaretDownOutlined className={styles.icon}/></div>
                            <div className={styles.content}>
                                <div className={styles.link} onClick={handleDishPage}><CaretRightOutlined className={styles.icon}/>Món ăn</div>
                                <div className={styles.link} onClick={handleIngredientPage}><CaretRightOutlined className={styles.icon}/>Nguyên liệu</div>
                            </div>
                        </div>
                        <div className={styles.link} onClick={handleSuggestDishPage}>Gợi ý món</div>
                        <div className={styles.link} onClick={handleExercisePage}>Vận động</div>
                        <div className={styles.link} >Cộng đồng</div>
                        <div className={styles.drop}>
                            <div className={styles.btn}>Sản phẩm<CaretDownOutlined className={styles.icon}/></div>
                            <div className={styles.content}>
                                <div className={styles.link} onClick={handleProductPage}><CaretRightOutlined className={styles.icon}/>Thực phẩm</div>
                                <div className={styles.link} onClick={handleTechnologyProductPage}><CaretRightOutlined className={styles.icon}/>Đồ công nghệ</div>
                            </div>
                        </div>

                    </div>
                    :""
                }
                </div>
            </div>
        </div> 
    )
}
export default NavComponent