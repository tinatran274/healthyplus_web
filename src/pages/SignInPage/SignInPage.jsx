import React, { useState, useEffect } from "react";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import styles from './style.module.css'
import logo from '../../image/Picture1.png'
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import * as message from '../../components/MessageComponent/MessageComponent'
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const SignInPage = () => {

    const auth = getAuth(app);
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                navigate('/')
                message.success()
            }
            else 
                console.log("Chưa đăng nhập");
        });
      }, [])

    const handleSignup = () => {
        navigate('/sign_up')
    }
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangePassword = (value) => {
        setPassword(value)
    }
    const handleSignIn = () => {
        UserService.signinUser(email, password);
    }
    const handleHome = () => {
        navigate('/')
    }
    return(
        <div className={styles.backgrround_inp}>
            <div className={styles.signin_form}>
                <div className={styles.logo}><img className={styles.img_logo} src= {logo} alt="logo"/></div>
                <h4>Đăng nhập</h4>
                <InputFormComponent id="email" placeholder="Nhập email" value={email} onChange={handleOnchangeEmail}/>
                <div style={{ position: 'relative' }}>
                    <span className={styles.show_pass} onClick={() => setIsShowPassword(!isShowPassword)}>{
                        isShowPassword ? (<EyeFilled /> ) : (<EyeInvisibleFilled />)
                    }
                    </span>
                    <InputFormComponent id="password" placeholder="Nhập mật khẩu" style={{ marginBottom: '10px' }} 
                    type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnchangePassword}/>
                </div>
                <div className={styles.flex1}>
                    <p className={styles.forgot_password}>Quên mật khẩu</p>
                    <button disabled={!email.length || !password.length} className={styles.signin_btn} onClick={handleSignIn} >Đăng nhập</button >
                </div>
                <div className={styles.flex2}>
                    <p>Bạn chưa có tài khoản?</p>
                    <div onClick={handleSignup}><p className={styles.signup}>Đăng ký</p></div>
                </div>
                <p className={styles.continue} onClick={handleHome}>Tiếp tục truy cập trang chủ</p>
            </div>
        </div>
    )
}
export default SignInPage