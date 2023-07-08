import React, { useEffect, useState } from 'react'
import { Col, Row, Image, Button, Card} from 'antd';
import { PlusOutlined, MinusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import styles from './style.module.css'
import app from '../../config/firebase'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import * as message from '../../components/MessageComponent/MessageComponent'


const CardItemCartComponent = () => {
    return(
       <div></div>
    )
}
export default CardItemCartComponent