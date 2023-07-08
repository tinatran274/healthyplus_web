import app from '../config/firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore,  doc, setDoc, getDoc, collection, updateDoc} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import UserConverter from '../models/UserModel';

const auth = getAuth(app);
const db = getFirestore(app);

export const signupUser = async (email, password, date) => {
    createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const userData = {
                    id: user.uid,
                    name: "",
                    age: 1,
                    gender: "Nữ",
                    height: 1,
                    weight: 1,
                    aim: "Giữ cân",
                    exercise: "Không vận động"    
                };
                await setDoc(doc(db, "user", user.uid), userData);

                const uRef = doc(db, "statistic", user.uid);
                const caloRef = doc (uRef, "dailyData", date)   
                const dataToUpdate = {
                    calories: 0,
                    breakfast: 0,
                    noon: 0,
                    dinner: 0,
                    snack: 0,
                    water: 0
                };
                await setDoc(caloRef, dataToUpdate);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return null
            });

}
export const signinUser = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export const getDetailUser = async (uid) => {
    const uRef = doc(db, "user", uid).withConverter(UserConverter);
    const docSnap = await getDoc(uRef);
    if (docSnap.exists()) {
        const user = docSnap.data();
        return user
    } else {
        console.log("No such document!");
        return null
    }
}

export const updateNameUser = async (uid, newname) => {
    const uRef = doc(db, "user", uid);
    await updateDoc(uRef, {
        name: newname
    });
}
export const updateAimUser = async (uid, naim) => {
    const uRef = doc(db, "user", uid);
    await updateDoc(uRef, {
        aim: naim
    });
}
export const updateInfoUser = async (uid, nage, ngender, nheight, nweight, nexercise) => {
    const uRef = doc(db, "user", uid);
    await updateDoc(uRef, {
        age: parseInt(nage),
        gender: ngender,
        height: parseInt(nheight),
        weight: parseInt(nweight),
        exercise: nexercise,
    });
}
export const updateUserCalories = async (uid, date, calo) => {
    const uRef = doc(db, "statistic", uid);
    const caloRef = doc (uRef, "dailyData", date)

    const docSnap = await getDoc(caloRef);
    const dataToUpdate = {calories: parseInt(calo)};
    if (docSnap.exists()) {
        await updateDoc(caloRef, dataToUpdate);
    } else {
        console.log("No such document!");
        await setDoc(caloRef, dataToUpdate);
    }
}

export const getUserCalories = async (uid, date) => {
    const uRef = doc(db, "statistic", uid);
    const caloRef = doc (uRef, "dailyData", date)

    const docSnap = await getDoc(caloRef);
    if (docSnap.exists()) {
        const ucalo = docSnap.data();
        console.log(ucalo)
        return ucalo
    } else {
        return null
    }
}
export const updateUserMorning = async (uid, date, calo) => {
    const uRef = doc(db, "statistic", uid);
    const caloRef = doc (uRef, "dailyData", date)

    const dataToUpdate = {morning: parseInt(calo)};
    await updateDoc(caloRef, dataToUpdate);
}

export const updateUserNoon = async (uid, date, calo) => {
    const uRef = doc(db, "statistic", uid);
    const caloRef = doc (uRef, "dailyData", date)

    const dataToUpdate = {noon: parseInt(calo)};
    await updateDoc(caloRef, dataToUpdate);
}
export const updateUserDinner = async (uid, date, calo) => {
    const uRef = doc(db, "statistic", uid);
    const caloRef = doc (uRef, "dailyData", date)

    const dataToUpdate = {dinner: parseInt(calo)};
    await updateDoc(caloRef, dataToUpdate);
}
export const updateUserSnack = async (uid, date, calo) => {
    const uRef = doc(db, "statistic", uid);
    const caloRef = doc (uRef, "dailyData", date)

    const dataToUpdate = {snack: parseInt(calo)};
    await updateDoc(caloRef, dataToUpdate);
}
export const updateUserExercise = async (uid, date, calo) => {
    const uRef = doc(db, "statistic", uid);
    const caloRef = doc (uRef, "dailyData", date)

    const dataToUpdate = {exercise: parseInt(calo)};
    await updateDoc(caloRef, dataToUpdate);
}
export const updateUserWater = async (uid, date, calo) => {
    const uRef = doc(db, "statistic", uid);
    const caloRef = doc (uRef, "dailyData", date)

    const dataToUpdate = {water: parseInt(calo)};
    await updateDoc(caloRef, dataToUpdate);
}


// export const logoutUser = async () => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`)
//     return res.data
// }
