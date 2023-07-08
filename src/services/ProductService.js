import app from '../config/firebase'
import { getFirestore, setDoc, doc, getDocs, collection, getDoc, updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import ProductConverter from '../models/ProductModel';

const db = getFirestore(app);

export const getAllProduct = async () => {
    const listProduct = [];
    const querySnapshot = await getDocs(collection(db, "product").withConverter(ProductConverter));
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        listProduct.push(product);
    });
    return listProduct;
}

export const getProductById = async (id) => {
    const docRef = doc(db, "product", id);
    const docSnap = await getDoc(docRef);
    const product=docSnap.data();
    return product;
}

export const addProductToCart = async (uid, pid, num) => {
    const dataToUpdate = {};
    dataToUpdate[pid] = num;
    const cartRef = doc(db, "cart", uid);
    await updateDoc(cartRef, dataToUpdate);
}

export const getProductInCart = async (uid) => {

    const listProduct = [];
    const cartRef = doc(db, "cart", uid);
    const cartSnap = await getDoc(cartRef);
    const userCart = cartSnap.data();
    
    for (const key in userCart) {
        if (userCart.hasOwnProperty(key)) {
            const docRef = doc(db, "product", key);
            const docSnap = await getDoc(docRef);
            const product = docSnap.data();
            product.num = userCart[key]

            //const data = {pid: key, num: userCart[key]};
            listProduct.push(product)
        }
      }
    return listProduct
}
export const decreaseProductCart = async (uid, pid, num) => {
    const cartRef = doc(db, "cart", uid);
    const dataToUpdate = {};
    dataToUpdate[pid] = parseInt(num)-1;
    await updateDoc(cartRef, dataToUpdate);

}
export const increaseProductCart = async (uid, pid, num) => {
    const cartRef = doc(db, "cart", uid);
    const dataToUpdate = {};
    dataToUpdate[pid] = parseInt(num)+1;
    await updateDoc(cartRef, dataToUpdate);
}
export const deleteProductCart = async (uid, pid) => {
    const cartRef = doc(db, "cart", uid);
    const dataToUpdate = {};
    dataToUpdate[pid] = deleteField();
    await updateDoc(cartRef, dataToUpdate);
}