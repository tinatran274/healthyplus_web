import React, { useState, useEffect } from "react";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import styles from './style.module.css'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { register } from '../../redux/auth/Auth';
import logo from '../../image/Picture1.png'
import { Alert, Space, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as message from '../../components/MessageComponent/MessageComponent'
import { useDispatch, useSelector } from "react-redux";
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const SignUpPage = () => {

    const auth = getAuth(app);
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
    const { isLoading, error, status } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                navigate('/get_user_info')
                message.success("Đăng ký thành công")
            }
            else 
                console.log("Chưa đăng nhập");
        });
      }, [])

    useEffect(() => {
        if (!isLoading && error)
            setShowError(true);
        console.log("loading: "+ isLoading + " error: " + error + " status: " + status )
            
    }, [isLoading]);

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
        dispatch(register(email, password, getDateToday(), navigate));
        // UserService.signupUser(email, password, getDateToday());
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
                {isLoading && <Spin size="large" ></Spin>}
                {showError && (
                    <Alert
                    message="Lỗi!! Đăng ký thất bại"
                    type="error"
                    showIcon
                  />
                )}
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