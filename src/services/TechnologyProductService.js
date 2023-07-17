import app from '../config/firebase'
import { getFirestore, setDoc, doc, getDocs, collection, getDoc, updateDoc, deleteField, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import ProductConverter from '../models/ProductModel';

const db = getFirestore(app);

export const getAllTechnologyProduct = async () => {
    const listProduct = [];
    const querySnapshot = await getDocs(collection(db, "technology_product").withConverter(ProductConverter));
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        listProduct.push(product);
    });
    return listProduct;
}

export const getTechnologyProductById = async (id) => {
    const docRef = doc(db, "technology_product", id);
    const docSnap = await getDoc(docRef);
    const product=docSnap.data();
    return product;
}

export const addTechnologyProductToCart = async (uid, pid, num) => {
    const dataToUpdate = {};
    dataToUpdate[pid] = num;
    const cartRef = doc(db, "cart", uid);
    const docSnap = await getDoc(cartRef);
    if (docSnap.exists()) 
        await updateDoc(cartRef, dataToUpdate);
    else
        await setDoc(cartRef, dataToUpdate);
}

export const addCommentTechnologyProduct = async (uid, did, date, content) => {
    const cmtRef = await addDoc(collection(db, "comment"), {
        date: date,
        uid: uid,
        content: content
      });
    const productRef = doc(db, "technology_product", did);
    const listCmtRef = doc (productRef, "comment", uid)
    const docSnap = await getDoc(listCmtRef);
    const dataToUpdate = {};
    dataToUpdate[cmtRef.id] = 0;
    if (docSnap.exists()) 
        await updateDoc(listCmtRef, dataToUpdate);
    else
        await setDoc(listCmtRef, dataToUpdate);
}

export const addLike = async (uid, pid, cid, num) => {
    const productRef = doc(db, "technology_product", pid);
    const listCmtRef = doc (productRef, "comment", uid)
    const docSnap = await getDoc(listCmtRef);
    const dataToUpdate = {};
    dataToUpdate[cid] = num;
    if (docSnap.exists()) 
        await updateDoc(listCmtRef, dataToUpdate);
    else
        await setDoc(listCmtRef, dataToUpdate);
}

export const addRatingTechnologyProduct = async (uid, did, rating) => {
    const productRef = doc(db, "technology_product", did);
    const rateRef = doc (productRef, "rating", uid)
    const dataToUpdate = {rating: rating};
    await setDoc(rateRef, dataToUpdate);
}

export const getTechnologyProductComment = async (did) => {  
    const list = [];
    const listComment = [];
    const productRef = doc(db, "technology_product", did);
    const querySnapshot = await getDocs(collection(productRef, "comment"))
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        listComment.push(product);
    })
    const mergedObject1 = listComment.reduce((acc, curr) => ({ ...acc, ...curr }), {});

    for (const key in mergedObject1) {
        if (mergedObject1.hasOwnProperty(key)) {
            const docRef = doc(db, "comment", key);
            const docSnap = await getDoc(docRef);
            const cmt = docSnap.data();
            cmt.id = key
            cmt.numLike = mergedObject1[key]
            list.push(cmt)
            }
    }
    return list;
}

export const getUserRatingTechnologyProduct = async (uid, did) => {
    const productRef = doc(db, "protechnology_productduct", did);
    const rateRef = doc (productRef, "rating", uid)
    const docSnap = await getDoc(rateRef);
    if (docSnap.exists()) {
        const rate = docSnap.data();
        return rate
    }
}
export const getAllRatingTechnologyProduct = async (did) => {
    const listRate = []
    const productRef = doc(db, "technology_product", did);
    const querySnapshot = await getDocs(collection(productRef, "rating"))
    querySnapshot.forEach((doc) => {
        const rating = doc.data().rating;
        listRate.push(rating);
    })
    const total = listRate.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const count = listRate.length;
    const average = (total / count).toFixed(2);
    console.log(average)
    return average;
}

export const getNumRatingTechnologyProduct = async (did) => {
    const listRate = []
    const productRef = doc(db, "technology_product", did);
    const querySnapshot = await getDocs(collection(productRef, "rating"))
    querySnapshot.forEach((doc) => {
        const rating = doc.data().rating;
        listRate.push(rating);
    })
    const count = listRate.length;
    return count;
}

