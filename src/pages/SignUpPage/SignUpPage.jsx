import React, { useState, useEffect } from "react";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import styles from './style.module.css'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import logo from '../../image/Picture1.png'
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService'
import * as message from '../../components/MessageComponent/MessageComponent'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const SignUpPage = () => {

    const auth = getAuth(app);
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // navigate('/')
                // message.success("Đăng ký thành công")
            }
            else 
                console.log("Chưa đăng nhập");
        });
      }, [])

    const getDateToday = () => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate
    };
    const handleSignin = () => {
        navigate('/sign_in')
    }
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangePassword = (value) => {
        setPassword(value)
    }
    
    const handleOnchangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }

    const handleSignUp = () => {
        UserService.signupUser(email, password, getDateToday());
        // navigate('/get_user_info')
    }

    return(
        <div className={styles.backgrround_inp}>
            <div className={styles.signin_form}>
                <div className={styles.logo}><img className={styles.img_logo} src= {logo} alt="logo"/></div>
                <h4>Đăng ký</h4>
                <InputFormComponent id="email" type="email" placeholder="Nhập email" value={email} onChange={handleOnchangeEmail} />
                <div style={{ position: 'relative' }}>
                    <span className={styles.show_pass} onClick={() => setIsShowPassword(!isShowPassword)}>{
                        isShowPassword ? (<EyeFilled /> ) : (<EyeInvisibleFilled />)
                    }
                    </span>
                    <InputFormComponent id="password" placeholder="Nhập mật khẩu" style={{ marginBottom: '10px' }} 
                    type={isShowPassword ? "text" : "password" } value={password} onChange={handleOnchangePassword}/>
                </div>
                <div style={{ position: 'relative' }}>
                    <span className={styles.show_pass} onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}>{
                            isShowConfirmPassword ? (<EyeFilled /> ) : (<EyeInvisibleFilled />)
                        }
                    </span>
                    <InputFormComponent id="confirm_password" placeholder="Nhập lại mật khẩu" style={{ marginBottom: '10px' }} 
                    type={isShowPassword ? "text" : "password"} value={confirmPassword} onChange={handleOnchangeConfirmPassword}/>
                </div>
                <div className={styles.flex1}>
                    <button className={styles.signin_btn} onClick={handleSignUp} >Đăng ký</button >
                </div>
                <div className={styles.flex2}>
                    <p>Bạn đã có tài khoản?</p>
                    <div onClick={handleSignin}><p className={styles.signin}>Đăng nhập</p></div>
                </div>
            </div>
        </div>
    )
}
export default SignUpPage