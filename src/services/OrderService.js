import app from '../config/firebase'
import { getFirestore, setDoc, doc, getDocs, collection, getDoc, updateDoc, deleteField, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const db = getFirestore(app);

export const addOrder = async (uid, address, date, delivery, pay, list_product, total) => {
    
    const docRef = await addDoc(collection(db, "bill"), {
        id: "",
        uid: uid,
        address: address,
        date: date,
        delivery: delivery,
        pay: pay,
        list_product: list_product,
        isPay: false,
        is_receive: false,
        total: total
      });
      await updateDoc(docRef, {id: docRef.id});

        const dataToUpdate = {};
        dataToUpdate[docRef.id] = true;
        const orderRef = doc(db, "order", uid);
        const docSnap = await getDoc(orderRef);
        if (docSnap.exists()) 
            await updateDoc(orderRef, dataToUpdate);
        else
            await setDoc(orderRef, dataToUpdate);
}

export const getAllOrder = async (uid) => {
    const listOrder = [];
    const querySnapshot = await getDoc(doc(db, "order", uid));
    const userOrder = querySnapshot.data();
    for (const key in userOrder) {
        if (userOrder.hasOwnProperty(key)) {
            const docRef = doc(db, "bill", key);
            const docSnap = await getDoc(docRef);
            const bill = docSnap.data();
            if (docSnap.exists()) {
                bill.isDelivery = userOrder[key];
                listOrder.push(bill)
            }
        }
    }
    return listOrder;
}
