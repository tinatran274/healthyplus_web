import app from "../config/firebase";
import {
  getFirestore,
  setDoc,
  doc,
  getDocs,
  collection,
  getDoc,
  updateDoc,
  deleteField,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes,  uploadBytesResumable, getDownloadURL} 
from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

const db = getFirestore(app);
const storage = getStorage(app);

export const addDish = async (file, f_name, name, calo, carb, fat, protein, ingr, recipe) => {
  
  const storageRef = ref(storage,`dish/${f_name}.png`);
  const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
      (snapshot) => {
      }, 
      (error) => {
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const docRef = await addDoc(collection(db, "dish"), {
            name: name,
            protein: parseInt(protein),
            carb: parseInt(carb),
            fat: parseInt(fat),
            calo: parseInt(calo),
            img: downloadURL,
            ingredient: ingr,
            recipe: recipe
          });
          await updateDoc(docRef, {id: docRef.id});
        });
      }
    );
};
export const getDishName = async () => {
  const listDish = [];
  const querySnapshot = await getDocs(collection(db, "dish"));
  querySnapshot.forEach((doc) => {
    const dish = doc.data().name;
    listDish.push(dish);
  });
  return listDish;
}

export const getAllDish = async () => {
  const listDish = [];
  const querySnapshot = await getDocs(collection(db, "dish"));
  querySnapshot.forEach((doc) => {
    const dish = doc.data();
    listDish.push(dish);
  });
  return listDish;
};

export const getDishtById = async (id) => {
  const docRef = doc(db, "dish", id);
  const docSnap = await getDoc(docRef);
  const dish = docSnap.data();
  return dish;
};

export const addDishFavo = async (uid, did) => {
  const dataToUpdate = {};
  dataToUpdate[did] = 0;
  const favoRef = doc(db, "favorite", uid);
  const docSnap = await getDoc(favoRef);

  if (docSnap.exists()) {
    await updateDoc(favoRef, dataToUpdate);
  } else {
    console.log("No such document!");
    await setDoc(favoRef, dataToUpdate);
  }
};
export const getDishFavo = async (uid) => {
  const listFavo = [];
  const favoRef = doc(db, "favorite", uid);
  const favoSnap = await getDoc(favoRef);
  console.log();
  if (favoSnap.exists()) {
    const dish = favoSnap.data();
    for (const key in dish) {
      listFavo.push(key);
    }
    return listFavo;
  }
};
export const deleteDishFavo = async (uid, did) => {
  const favoRef = doc(db, "favorite", uid);
  const dataToUpdate = {};
  dataToUpdate[did] = deleteField();
  await updateDoc(favoRef, dataToUpdate);
};

export const getDetailDishFavo = async (uid) => {
  const listFavo = [];
  const favoRef = doc(db, "favorite", uid);
  const favoSnap = await getDoc(favoRef);
  const userFavo = favoSnap.data();

  for (const key in userFavo) {
    if (userFavo.hasOwnProperty(key)) {
      const docRef = doc(db, "dish", key);
      const docSnap = await getDoc(docRef);
      const dish = docSnap.data();
      listFavo.push(dish);
    }
  }
  return listFavo;
};
export const addCommentDish = async (uid, did, date, content) => {
  const cmtRef = await addDoc(collection(db, "comment"), {
    date: date,
    uid: uid,
    content: content,
  });
  const dishRef = doc(db, "dish", did);
  const listCmtRef = doc(dishRef, "comment", uid);
  const docSnap = await getDoc(listCmtRef);
  const dataToUpdate = {};
  dataToUpdate[cmtRef.id] = 0;
  if (docSnap.exists()) await updateDoc(listCmtRef, dataToUpdate);
  else await setDoc(listCmtRef, dataToUpdate);
};

export const addLike = async (uid, pid, cid, num) => {
  const productRef = doc(db, "dish", pid);
  const listCmtRef = doc(productRef, "comment", uid);
  const docSnap = await getDoc(listCmtRef);
  const dataToUpdate = {};
  dataToUpdate[cid] = num;
  if (docSnap.exists()) await updateDoc(listCmtRef, dataToUpdate);
  else await setDoc(listCmtRef, dataToUpdate);
};

export const addRatingDish = async (uid, did, rating) => {
  const dishRef = doc(db, "dish", did);
  const rateRef = doc(dishRef, "rating", uid);
  const dataToUpdate = { rating: rating };
  await setDoc(rateRef, dataToUpdate);
};

export const getCommentDish = async (did) => {
  const list = [];
  const listComment = [];
  const dishRef = doc(db, "dish", did);
  const querySnapshot = await getDocs(collection(dishRef, "comment"));
  querySnapshot.forEach((doc) => {
    const product = doc.data();
    listComment.push(product);
  });
  const mergedObject1 = listComment.reduce(
    (acc, curr) => ({ ...acc, ...curr }),
    {}
  );

  for (const key in mergedObject1) {
    if (mergedObject1.hasOwnProperty(key)) {
      const docRef = doc(db, "comment", key);
      const docSnap = await getDoc(docRef);
      const cmt = docSnap.data();
      cmt.id = key;
      cmt.numLike = mergedObject1[key];
      list.push(cmt);
    }
  }
  return list;
};

export const getUserRatingDish = async (uid, did) => {
  const dishRef = doc(db, "dish", did);
  const rateRef = doc(dishRef, "rating", uid);
  const docSnap = await getDoc(rateRef);
  if (docSnap.exists()) {
    const rate = docSnap.data();
    return rate;
  }
};
export const getAllRatingDish = async (did) => {
  const listRate = [];
  const dishRef = doc(db, "dish", did);
  const querySnapshot = await getDocs(collection(dishRef, "rating"));
  querySnapshot.forEach((doc) => {
    const rating = doc.data().rating;
    listRate.push(rating);
  });
  const total = listRate.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const count = listRate.length;
  const average = (total / count).toFixed(2);
  console.log(average);
  return average;
};

export const getNumRatingDish = async (did) => {
  const listRate = [];
  const dishRef = doc(db, "dish", did);
  const querySnapshot = await getDocs(collection(dishRef, "rating"));
  querySnapshot.forEach((doc) => {
    const rating = doc.data().rating;
    listRate.push(rating);
  });
  const count = listRate.length;
  return count;
};

export const upLoadDish = (name, file) => {
  if (file) {
    // Create a Firebase Storage reference
    const storageRef = ref(storage,`dish/${name}.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
      (snapshot) => {
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
        
  }
};