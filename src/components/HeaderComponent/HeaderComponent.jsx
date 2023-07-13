import React, { useEffect, useState } from 'react'
import { Col, Input, message, Popconfirm  } from 'antd'
import { UserOutlined,  ShoppingCartOutlined } from '@ant-design/icons';
import { WrapperHeader } from './style'
import logo from '../../image/Picture1.png'
import styles from './style.module.css'
import * as UserService from '../../services/UserService'
import { useNavigate } from 'react-router-dom';
import app from '../../config/firebase'
import { getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";


const HeaderComponent = () => {

    const { Search } = Input;
    const onSearch = (value) => console.log(value);
    const auth = getAuth(app);
    const [currentUser, setCurrentUser] = useState(null);

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setCurrentUser(user)
        }
        else {
            console.log("Chưa đăng nhập");
        }
    });

    // const handleGetDataUser = async () => {  
    //     if(currentUser){
    //         console.log("id: " + currentUser.uid);
    //         const userData = await UserService.getDetailUser(currentUser.uid);
    //         console.log('Data ', userData)
    //     }
    // }

    const navigate = useNavigate()
    const handleSignin = () => {  
        navigate('/sign_in')
    }
    const handleHome = () => {  
        navigate('/')
    }
    const handleSignout = () => {  
        signOut(auth).then(() => {
            console.log("Đăng xuất thành công");
            navigate('/sign_in')
        }).catch((error) => {
            console.log("Đăng xuất không thành công");
        });
    }
    const handleDetailUser = () => {  
        navigate('/detail_user')
    }
    const handleCart = () => {  
        navigate('/cart')
    }

    const confirmLogout = (e) => {
        handleSignout();
        message.success('Đăng xuất');
      };
      const cancelLogout = (e) => {
        message.error('Hủy đăng xuất');
      };
    return(

        <div>
            <WrapperHeader>
                <Col span={4}>
                    <img className={styles.notify} src= {logo} onClick={handleHome} alt="notify"/>
                </Col>
                <Col span={12}>
                    <Search id="search" className={styles.search} placeholder="input search text" allowClear onSearch={onSearch} />
                </Col>
                <Col span={3}>
                    <div onClick={handleCart}><ShoppingCartOutlined className={styles.cart_icon}/></div>
                </Col>
                <Col span={5}>
                    {currentUser ? ( 
                        <div className={styles.info}>
                            <div onClick={handleDetailUser}><UserOutlined className={styles.user_icon}/></div>
                            <span className={styles.sign} onClick={handleDetailUser}>Cá nhân</span>
                            <Popconfirm
                                title="Đăng xuất"
                                description="Bạn muốn đăng xuất?"
                                onConfirm={confirmLogout}
                                onCancel={cancelLogout}
                                okText="Xác nhận"
                                cancelText="Hủy bỏ"
                            >
                                <div className={styles.sign}><span>Đăng xuất</span></div>
                            </Popconfirm>
                            
                        </div> ) : (
                        <div className={styles.info}>
                            <div><UserOutlined className={styles.user_icon}/></div>
                            <div onClick={handleSignin} className={styles.sign}><span>Đăng nhập</span></div>
                        </div>
                    )}
        

                </Col>
            </WrapperHeader>
        </div>
    )
}
export default HeaderComponent