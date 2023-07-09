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