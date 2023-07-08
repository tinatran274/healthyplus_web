import app from '../config/firebase'
import { getFirestore, setDoc, doc, getDocs, collection, getDoc, updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
//import ProductConverter from '../models/ProductModel';

const db = getFirestore(app);

export const getAllIngredient = async () => {
    const listProduct = [];
    const querySnapshot = await getDocs(collection(db, "ingredient"));
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        listProduct.push(product);
    });
    return listProduct;
}

export const getIngredientById = async (id) => {
    const docRef = doc(db, "ingredient", id);
    const docSnap = await getDoc(docRef);
    const product=docSnap.data();
    return product;
}