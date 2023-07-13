import app from '../config/firebase'
import { getFirestore, setDoc, doc, getDocs, collection, getDoc, updateDoc, deleteField, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const db = getFirestore(app);

export const addDish = async () => {
    
    const docRef = await addDoc(collection(db, "dish"), {
        name: "Canh cá nâu chua ngọt",
        protein: 18,
        carb: 20,
        fat: 10,
        calo: 280,
        img: "",
        ingredient: ["300g cá nâu, làm sạch và cắt miếng, thái lát mỏng", "1 củ hành tím, thái nhỏ", 
        "2 củ tỏi, băm nhỏ", "1 củ gừng, băm nhỏ",
        "2 củ cà chua, thái hạt lựu", "2-3 quả cà chua cherry, cắt đôi", "1/2 quả ớt đỏ, thái lát mỏng", "2-3 quả chanh, lấy nước cốt","Muối", "Tiêu", "Hành lá (trang trí)"],
        recipe: ["1. Trong một nồi, đun nóng dầu ăn và phi tỏi, hành tím, gừng cho thơm.",
    "2. Thêm cá nâu vào nồi, đảo đều cho cá chín một chút.",
"3. Tiếp theo, thêm cà chua, ớt đỏ, và nước cốt chanh vào nồi.",
"4. Đun sôi và nấu khoảng 5-7 phút cho cá và cà chua chín mềm.",
"5. Nêm đường và muối vào nồi, khuấy đều cho gia vị thấm vào món canh.",
"6. Tiếp tục nấu canh trong vài phút nữa, cho đến khi cá nâu và cà chua mềm và chín đều.",
"7. Trước khi tắt bếp, trang trí canh bằng cà chua cherry và rau thơm."]
      });
    console.log(docRef)
}

export const getAllDish = async () => {
    const listDish = [];
    const querySnapshot = await getDocs(collection(db, "dish"));
    querySnapshot.forEach((doc) => {
        const dish = doc.data();
        listDish.push(dish);
    });
    return listDish;
}

export const getDishtById = async (id) => {
    const docRef = doc(db, "dish", id);
    const docSnap = await getDoc(docRef);
    const dish=docSnap.data();
    return dish;
}

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
}
export const getDishFavo = async (uid) => {
    const listFavo = [];
    const favoRef = doc(db, "favorite", uid);
    const favoSnap = await getDoc(favoRef);
    console.log()
    if (favoSnap.exists()) {
        const dish=favoSnap.data()
        for (const key in dish) {
            listFavo.push(key);
        }
        return listFavo;
    }
}
export const deleteDishFavo = async (uid, did) => {
    const favoRef = doc(db, "favorite", uid);
    const dataToUpdate = {};
    dataToUpdate[did] = deleteField();
    await updateDoc(favoRef, dataToUpdate);
}

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

            listFavo.push(dish)
        }
      }
    return listFavo
}
export const addCommentDish = async (uid, did, date, content) => {
    const cmtRef = await addDoc(collection(db, "comment"), {
        date: date,
        uid: uid,
        content: content
      });
    const dishRef = doc(db, "dish", did);
    const listCmtRef = doc (dishRef, "comment", uid)
    const docSnap = await getDoc(listCmtRef);
    const dataToUpdate = {};
    dataToUpdate[cmtRef.id] = 0;
    if (docSnap.exists()) 
        await updateDoc(listCmtRef, dataToUpdate);
    else
        await setDoc(listCmtRef, dataToUpdate);
}

export const addRatingDish = async (uid, did, rating) => {
    const dishRef = doc(db, "dish", did);
    const rateRef = doc (dishRef, "rating", uid)
    const dataToUpdate = {rating: rating};
    await setDoc(rateRef, dataToUpdate);
}

export const getCommentDish = async (did) => {  
    const list = [];
    const listComment = [];
    const dishRef = doc(db, "dish", did);
    const querySnapshot = await getDocs(collection(dishRef, "comment"))
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
            list.push(cmt)
            }
    }
    return list;
}

export const getUserRatingDish = async (uid, did) => {
    const dishRef = doc(db, "dish", did);
    const rateRef = doc (dishRef, "rating", uid)
    const docSnap = await getDoc(rateRef);
    if (docSnap.exists()) {
        const rate = docSnap.data();
        return rate
    }
}
export const getAllRatingDish = async (did) => {
    const listRate = []
    const dishRef = doc(db, "dish", did);
    const querySnapshot = await getDocs(collection(dishRef, "rating"))
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

export const getNumRatingDish = async (did) => {
    const listRate = []
    const dishRef = doc(db, "dish", did);
    const querySnapshot = await getDocs(collection(dishRef, "rating"))
    querySnapshot.forEach((doc) => {
        const rating = doc.data().rating;
        listRate.push(rating);
    })
    const count = listRate.length;
    return count;
}
