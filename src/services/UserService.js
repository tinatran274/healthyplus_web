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

export const signupUser = (email, password, date) => {
  return new Promise(async (resolve, reject) => {
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
          coin: 0,
          stateCheck: 0,
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
          check: 0,
        };
        await setDoc(caloRef, dataToUpdate);

        const result = {
          uid: user.uid,
          status: true,
          message: "Đăng ký thành công",
        };
        resolve(result);
      })
      .catch((error) => {
        const result = {
          status: false,
          error: error.message,
          message: "Đăng ký thất bại",
        };
        reject(result);
      });
  });
};
export const userLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user) {
          const result = {
            uid: user.uid,
            status: true,
            message: "Đăng nhập thành công",
          };
          resolve(result);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        const result = {
          status: false,
          error: errorMessage,
          message: "Đăng nhập thất bại",
        };
        reject(result);
      });
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

// export const updateNameUser = async (uid, newname) => {
//   const uRef = doc(db, "user", uid);
//   await updateDoc(uRef, {
//     name: newname,
//   });
// };
export const updateNameUser = (uid, newname) => {
  return new Promise(async (resolve, reject) => {
    const uRef = doc(db, "user", uid);
    const docSnap = await getDoc(uRef);
    if (docSnap.exists()) {
      const uRef = doc(db, "user", uid);
      await updateDoc(uRef, {
        name: newname,
      });
      const result = {
        status: true,
        message: "Cập nhật thành công",
      };
      resolve(result);
    } else {
      const result = {
        status: false,
        message: "Cập nhật thất bại",
      };
      reject(result);
    }
  });
};
export const updateAimUser = (uid, naim) => {
  return new Promise(async (resolve, reject) => {
    const uRef = doc(db, "user", uid);
    const docSnap = await getDoc(uRef);
    if (docSnap.exists()) {
      await updateDoc(uRef, {
        aim: naim,
      });
      const result = {
        status: true,
        message: "Cập nhật thành công",
      };
      resolve(result);
    } else {
      const result = {
        status: false,
        message: "Cập nhật thất bại",
      };
      reject(result);
    }
  });
};
export const updateInfoUser = (
  uid,
  nage,
  ngender,
  nheight,
  nweight,
  nexercise
) => {
  return new Promise(async (resolve, reject) => {
    const uRef = doc(db, "user", uid);
    const docSnap = await getDoc(uRef);
    if (docSnap.exists()) {
      await updateDoc(uRef, {
        age: parseInt(nage),
        gender: ngender,
        height: parseInt(nheight),
        weight: parseInt(nweight),
        exercise: nexercise,
      });
      const result = {
        status: true,
        message: "Cập nhật thành công",
      };
      resolve(result);
    } else {
      const result = {
        status: false,
        message: "Cập nhật thất bại",
      };
      reject(result);
    }
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
export const updateUserCheck = async (uid, date, values) => {

  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);
  const docSnap = await getDoc(caloRef);
  const dataToUpdate = { check: parseInt(values) };
  if (docSnap.exists()) await updateDoc(caloRef, dataToUpdate);
  else await setDoc(caloRef, dataToUpdate);
};

export const updateUserCoin = async (uid, coin) => {
  const uRef = doc(db, "user", uid);

  const docSnap = await getDoc(uRef);
  const dataToUpdate = { coin: parseInt(coin) };
  if (docSnap.exists()) await updateDoc(uRef, dataToUpdate);
  else await setDoc(uRef, dataToUpdate);
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
export const getCoin = async (uid) => {
  const uRef = doc(db, "user", uid);

  const docSnap = await getDoc(uRef);
  const user = docSnap.data();
  try {
    if (user.coin) {
      return user.coin;
    }
    else return 0
  } catch (e) {
    console.log("Error");
    const dataToUpdate = { coin: 0 };
    await setDoc(uRef, dataToUpdate);
  }
};
export const getAim = async (uid) => {
  const uRef = doc(db, "user", uid);
  const docSnap = await getDoc(uRef);
  const user = docSnap.data();
  console.log(user);
  return 1;
};
export const createCheck = async (uid, date) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);
  const docSnap = await getDoc(caloRef);
  const user = docSnap.data();
  try {
    if (!user.check) {
      const dataToUpdate = { check: 0 };
      await setDoc(caloRef, dataToUpdate);
    }
  } catch (e) {
    console.log("Error");
    const dataToUpdate = { check: 0 };
    await setDoc(caloRef, dataToUpdate);
  }
};
export const getCheck = async (uid, date) => {
  const uRef = doc(db, "statistic", uid);
  const caloRef = doc(uRef, "dailyData", date);
  const docSnap = await getDoc(caloRef);
  const u = docSnap.data();
  if (u){
    if (u.check) {
      return u.check;
    }
    return 0;
  }
  return 0;
};

export const updateStateCheck = async (uid, num) => {
  const uRef = doc(db, "user", uid);
  const docSnap = await getDoc(uRef);

  const dataToUpdate = { stateCheck: num };
  if (docSnap.exists()) await updateDoc(uRef, dataToUpdate);
  else await setDoc(uRef, dataToUpdate);
};

