import React, { useEffect, useState } from 'react'
import { Row, Col, Input, message, Popconfirm  } from 'antd'
import { GithubOutlined, AndroidOutlined, AppleOutlined} from '@ant-design/icons';
import styles from './style.module.css'
import * as UserService from '../../services/UserService'
import { useNavigate } from 'react-router-dom';
import app from '../../config/firebase'
import { getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";


const FooterComponent = () => {

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
        console.log(e);
        handleSignout();
        message.success('Đăng xuất');
      };
      const cancelLogout = (e) => {
        console.log(e);
        message.error('Hủy đăng xuất');
      };
    return(
        <div className={styles.wrap}> 
                <Col span={6}>
                    <p className={styles.txt}>Trang chủ</p>
                    <p className={styles.txt}>Kiểm soát Calories</p>
                    <p className={styles.txt}>Kiểm soát lượng nước</p>
                    <p className={styles.txt}>Gợi ý món</p>
                    <p className={styles.txt}>Vận động</p>
                    <p className={styles.txt}>Cộng đồng</p>
                    <p className={styles.txt}>Liên hệ</p>
                </Col>
                <Col span={10}>
                    <p className={styles.txt}>Hotline: +84 67676926</p>
                    <p className={styles.txt1}>Địa chỉ: Trường Đại học Công nghệ thông tin - Đại học Quốc gia Thành phố Hồ Chí Minh</p>
                    <p className={styles.txt}>Email: 21522438@gm.uit.edu.vn</p>
                </Col>
                <Col span={8}>
                    {currentUser ? ( 
                        <div className={styles.info}>
                            <span className={styles.txt} onClick={handleDetailUser}>Cá nhân</span>
                            <Popconfirm
                                title="Đăng xuất"
                                description="Bạn muốn đăng xuất?"
                                onConfirm={confirmLogout}
                                onCancel={cancelLogout}
                                okText="Xác nhận"
                                cancelText="Hủy bỏ"
                            >
                                <div className={styles.signout}><span className={styles.txt}>Đăng xuất</span></div>
                            </Popconfirm>
                            
                        </div> ) : (
                        <div>
                            <div onClick={handleSignin} className={styles.signin}><span className={styles.txt}>Đăng nhập</span></div>
                        </div>
                    )}
                    <div className={styles.social}>
                        <span className={styles.txt} >Kết nối với chúng tôi tại</span>
                        <GithubOutlined className={styles.icon}/>
                    </div>
                    <div className={styles.down}>
                        <AndroidOutlined className={styles.icon}/>
                        <AppleOutlined className={styles.icon}/>
                    </div>
        

                </Col>
        </div>
    )
}
export default FooterComponent