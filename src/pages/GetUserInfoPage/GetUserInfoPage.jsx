import React, { useEffect, useState } from 'react'
import * as UserService from '../../services/UserService'
import GetUserInfoComponent from "../../components/GetUserInfoComponent/GetUserInfoComponent"
import app from '../../config/firebase'
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const GetUserInfoPage = () => {

    const auth = getAuth(app);

    return(
        <div>
            <GetUserInfoComponent/>
        </div>
    )
}
export default GetUserInfoPage