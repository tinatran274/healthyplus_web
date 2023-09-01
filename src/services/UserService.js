import app from "../config/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  updateDoc,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import UserConverter from "../models/UserModel";

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
        exercise: "Không vận động",
        premium: 0,
      };
      await setDoc(doc(db, "user", user.uid), userData);

      const uRef = doc(db, "statistic", user.uid);
      const caloRef = doc(uRef, "dailyData", date);
      const dataToUpdate = {
        calories: 0,
        breakfast: 0,
        noon: 0,
        dinner: 0,
        snack: 0,
        water: 0,
      };
      await setDoc(caloRef, dataToUpdate);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return null;
    });
};
export const signinUser = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const getDetailUser = async (uid) => {
  const uRef = doc(db, "user", uid).withConverter(UserConverter);
  const docSnap = await getDoc(uRef);
  if (docSnap.exists()) {
    const user = docSnap.data();
    return user;
  } else {
    console.log("No such document!");
    return null;
  }
};

export const updateNameUser = async (uid, newname) => {
  const uRef = doc(db, "user", uid);
  await updateDoc(uRef, {
    name: newname,
  });
};
export const updateAimUser = async (uid, naim) => {
  const uRef = doc(db, "user", uid);
  await updateDoc(uRef, {
    aim: naim,
  });
};
export const updateInfoUser = async (
  uid,
  nage,
  ngender,
  nheight,
  nweight,
  nexercise
) => {
  const uRef = doc(db, "user", uid);
  await updateDoc(uRef, {
    age: parseInt(nage),
    gender: ngender,
    height: parseInt(nheight),
    weight: parseInt(nweight),
    exercise: nexercise,
  });
};
export const getUserCalories = async (uid, date) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);

  const docSnap = await getDoc(caloRef);
  if (docSnap.exists()) {
    const ucalo = docSnap.data();
    return ucalo;
  } else {
    return null;
  }
};

// export const updateUserCalories = async (uid, date, calo) => {
//     const uRef = doc(db, "statistic", uid);
//     const caloRef = doc (uRef, "dailyData", date)

//     const docSnap = await getDoc(caloRef);
//     const dataToUpdate = {calories: parseInt(calo)};
//     if (docSnap.exists()) {
//         await updateDoc(caloRef, dataToUpdate);
//     } else {
//         console.log("No such document!");
//         await setDoc(caloRef, dataToUpdate);
//     }
// }

export const updateUserMorning = async (uid, date, calo) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);

  const docSnap = await getDoc(caloRef);
  const dataToUpdate = { morning: parseInt(calo) };
  if (docSnap.exists()) await updateDoc(caloRef, dataToUpdate);
  else await setDoc(caloRef, dataToUpdate);
};

export const updateUserNoon = async (uid, date, calo) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);

  const docSnap = await getDoc(caloRef);
  const dataToUpdate = { noon: parseInt(calo) };
  if (docSnap.exists()) await updateDoc(caloRef, dataToUpdate);
  else await setDoc(caloRef, dataToUpdate);
};
export const updateUserDinner = async (uid, date, calo) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);

  const docSnap = await getDoc(caloRef);
  const dataToUpdate = { dinner: parseInt(calo) };
  if (docSnap.exists()) await updateDoc(caloRef, dataToUpdate);
  else await setDoc(caloRef, dataToUpdate);
};
export const updateUserSnack = async (uid, date, calo) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);

  const docSnap = await getDoc(caloRef);
  const dataToUpdate = { snack: parseInt(calo) };
  if (docSnap.exists()) await updateDoc(caloRef, dataToUpdate);
  else await setDoc(caloRef, dataToUpdate);
};
export const updateUserExercise = async (uid, date, calo) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);

  const docSnap = await getDoc(caloRef);
  const dataToUpdate = { exercise: parseInt(calo) };
  if (docSnap.exists()) await updateDoc(caloRef, dataToUpdate);
  else await setDoc(caloRef, dataToUpdate);
};
export const updateUserPractice = async (uid, date, calo) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);

  const docSnap = await getDoc(caloRef);
  const dataToUpdate = { exercise: parseInt(calo) };
  if (docSnap.exists()) {
    const ucalo = docSnap.data();
    if (ucalo.exercise)
      await updateDoc(caloRef, { exercise: ucalo.exercise + parseInt(calo) });
    else await updateDoc(caloRef, dataToUpdate);
  } else await setDoc(caloRef, dataToUpdate);
};
export const updateUserWater = async (uid, date, calo) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);

  const docSnap = await getDoc(caloRef);
  const dataToUpdate = { water: parseInt(calo) };
  if (docSnap.exists()) await updateDoc(caloRef, dataToUpdate);
  else await setDoc(caloRef, dataToUpdate);
};

export const getWaterInWeek = async (uid, date) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);
  const docSnap = await getDoc(caloRef);
  const uwater = docSnap.data();
  if (docSnap.exists() && uwater.water) {
    const dataReturn = {
      date: date,
      water: uwater.water,
    };
    return dataReturn;
  }
};

export const getCaloriesInWeek = async (uid, date) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);
  const docSnap = await getDoc(caloRef);
  const u = docSnap.data();

  if (docSnap.exists()) {
    let sumc = 0;
    if (u.morning) sumc += u.morning;
    if (u.noon) sumc += u.noon;
    if (u.dinner) sumc += u.dinner;
    if (u.snack) sumc += u.snack;
    if (u.exercise) sumc -= u.exercise;
    const dataReturn = {
      date: date,
      calories: sumc,
    };
    return dataReturn;
  }
};

export const getExerciseInWeek = async (uid, date) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);
  const docSnap = await getDoc(caloRef);
  const u = docSnap.data();
  if (docSnap.exists() && u.exercise) {
    const dataReturn = {
      date: date,
      water: u.exercise,
    };
    return dataReturn;
  }
};
export const getMorning = async (uid, date) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);
  const docSnap = await getDoc(caloRef);
  const u = docSnap.data();

  if (docSnap.data()) {
    const dataReturn = {
      calories: u.morning,
    };
    return dataReturn.calories;
  }
};
export const getNoon = async (uid, date) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);
  const docSnap = await getDoc(caloRef);
  const u = docSnap.data();

  if (docSnap.data()) {
    const dataReturn = {
      calories: u.noon,
    };
    return dataReturn.calories;
  }
};
export const getDinner = async (uid, date) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);
  const docSnap = await getDoc(caloRef);
  const u = docSnap.data();

  if (docSnap.data()) {
    const dataReturn = {
      calories: u.dinner,
    };
    return dataReturn.calories;
  }
};
export const getAim = async (uid) => {
  const uRef = doc(db, "user", uid);
  const docSnap = await getDoc(uRef);
  const user = docSnap.data();
  console.log(user);
  return 1;
};
