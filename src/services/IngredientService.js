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
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
//import ProductConverter from '../models/ProductModel';

const db = getFirestore(app);

export const getAllIngredient = async () => {
  const listIngredient = [];
  const querySnapshot = await getDocs(collection(db, "ingredient"));
  querySnapshot.forEach((doc) => {
    const ingredient = doc.data();
    listIngredient.push(ingredient);
  });
  return listIngredient;
};

export const getIngredientById = async (id) => {
  const docRef = doc(db, "ingredient", id);
  const docSnap = await getDoc(docRef);
  const ingredient = docSnap.data();
  return ingredient;
};

export const getListIngredientNameById = async (listId) => {
  const listIngredient = [];
  listId.forEach(async (id) => {
    const docSnap = await getDoc(doc(db, "ingredient", id));
    const ingredient = docSnap.data().name;
    listIngredient.push(ingredient);
  });
  return listIngredient;
};
export const getCalo = async (id) => {
  const docSnap = await getDoc(doc(db, "ingredient", id));
  const ingredientCalo = docSnap.data().calo;

  return ingredientCalo;
};
