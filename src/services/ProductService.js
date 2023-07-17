import app from '../config/firebase'
import { getFirestore, setDoc, doc, getDocs, collection, getDoc, updateDoc, deleteField, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import ProductConverter from '../models/ProductModel';

const db = getFirestore(app);

export const addP = async () => {   
    const docRef = await addDoc(collection(db, "dish"), {
        name: "Ức gà sốt teriyaki",
        calo: 224,
        carb: 13.6,
        fat: 18,
        protein: 83.5,
        img: "",
        id: "",
        ingredient: ["500g ức gà phi lê", 
        "Rượu sake dùng để nấu ăn (có thể thay thế bằng rượu gạo)",
        "Rượu Mirin (gia vị Nhật dùng để nấu ăn)",
        "Mật ong",
        "Gừng băm",
        "Nước tương",
        "Đường nâu (hoặc đường trắng)",
        "Tiêu xay",
        "Mè trắng rang",
        "Hành lá cắt nhỏ",
    ],
        recipe: ["1. Ức gà dùng muối hoặc chanh khử sạch mùi tanh sau đó rửa lại bằng nước sạch và để ráo nước.", 
        "2. Dùng dao sắc khứa nhẹ các đường chéo song song trên cả hai mặt của miếng thịt gà để khi ướp gia vị sẽ bám và thẩm thấu vào miếng thịt gà nhanh hơn.",
        "3. Sau khi đã khứa xong 2 mặt của các miếng thịt gà, bạn ướp nhẹ chúng với gừng băm nhỏ và tiêu xay cho mùi vị của miếng thịt gà thơm hơn.",
        "4. Pha sốt làm gà áp chảo, pha các gia vị theo tỷ lệ như sau: 3-6 thìa nước tương, 3 thìa mirin, 1.5 thìa rượu sake dùng để nấu ăn, 1.5 thìa đường nâu, 2 thìa mật ong.",
        "5. Kế đến, bạn khuấy đều phần nước sốt cho các loại gia vị hòa tan vào nhau, sau đó cho thịt gà vào phần nước sốt vừa pha và ướp trong khoảng 10 phút.",
        "6. Bắc chảo lên bếp, chờ chảo khô thì cho gà đã ướp vào áp chảo, để bếp ở nhiệt độ trung bình hoặc mức lửa vừa. Mỗi mặt của miếng gà bạn sẽ áp chảo trong khoảng từ 5 - 7 phút, tùy vào độ dày.",
        "7. Trong khi áp chảo, bạn có thể cho thêm vào một chút rượu để thịt gà được thêm và mềm hơn.",
        "8. Khi gà đã vàng đều hai mặt, bạn cho phần sốt teriyaki vào chảo đun cùng trong khoảng 5 - 7 phút nữa và trở đều 2 mặt của các miếng thịt gà cho nước sốt thấm đều.",
        "9. Khi phần sốt sệt lại thì cũng là lúc miếng gà vừa chín tới, bạn chỉ cần chiết phần nước sốt ra bát. Còn các miếng thịt gà, bạn để nghỉ một lúc để giữ lại nước thịt, sau đó thì gắp ra thớt và thái thành từng miếng nhỏ vừa ăn.",
        "10. Để ăn món ức gà sốt teriyaki, có thể ăn kèm với salad rau củ và một chút cơm gạo lứt. Hoặc ăn kèm với cơm trắng và súp lơ xanh luộc ",
    
    ],
      });
      await updateDoc(docRef, {
        id: docRef.id
      });
    
}
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
    if (docSnap.exists()){
        const product=docSnap.data();
        return product;
    }
}

export const addProductToCart = async (uid, pid, num) => {
    const dataToUpdate = {};
    dataToUpdate[pid] = num;
    const cartRef = doc(db, "cart", uid);
    const docSnap = await getDoc(cartRef);
    if (docSnap.exists()) 
        await updateDoc(cartRef, dataToUpdate);
    else
        await setDoc(cartRef, dataToUpdate);
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
            if (docSnap.exists()) {
                product.num = userCart[key]
                product.type = 0
                listProduct.push(product)
            }
        }
        if (userCart.hasOwnProperty(key)) {
            const docRef = doc(db, "technology_product", key);
            const docSnap = await getDoc(docRef);
            const product = docSnap.data();
            if (docSnap.exists()) {
                product.num = userCart[key]
                product.type = 1
                listProduct.push(product)
            }
        }
      }
    return listProduct
}
export const getListProductPayment = async (list) => {
    const listProduct = [];
    
    list.forEach(async (item) => {
        const docSnap1 = await getDoc(doc(db, "product", item.id));
        const product1 = docSnap1.data();
            if (docSnap1.exists()) {
                product1.num = item.num
                listProduct.push(product1)
            }
    });
    list.forEach(async (item) => {
        const docSnap2 = await getDoc(doc(db, "technology_product", item.id));
        const product2 = docSnap2.data();
        if (docSnap2.exists()) {
            product2.num = item.num
            listProduct.push(product2)
        }
    });
    return listProduct;
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
export const addCommentProduct = async (uid, did, date, content) => {
    const cmtRef = await addDoc(collection(db, "comment"), {
        date: date,
        uid: uid,
        content: content
      });
    const productRef = doc(db, "product", did);
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
    const productRef = doc(db, "product", pid);
    const listCmtRef = doc (productRef, "comment", uid)
    const docSnap = await getDoc(listCmtRef);
    const dataToUpdate = {};
    dataToUpdate[cid] = num;
    if (docSnap.exists()) 
        await updateDoc(listCmtRef, dataToUpdate);
    else
        await setDoc(listCmtRef, dataToUpdate);
}

export const addRatingProduct = async (uid, did, rating) => {
    const productRef = doc(db, "product", did);
    const rateRef = doc (productRef, "rating", uid)
    const dataToUpdate = {rating: rating};
    await setDoc(rateRef, dataToUpdate);
}

export const getProductComment = async (did) => {  
    const list = [];
    const listComment = [];
    const productRef = doc(db, "product", did);
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
            if (docSnap.exists()) {
                const cmt = docSnap.data();
                cmt.id = key
                cmt.numLike = mergedObject1[key]
                list.push(cmt)
            }
        }
    }
    return list;
}

export const getUserRatingProduct = async (uid, did) => {
    const productRef = doc(db, "product", did);
    const rateRef = doc (productRef, "rating", uid)
    const docSnap = await getDoc(rateRef);
    if (docSnap.exists()) {
        const rate = docSnap.data();
        return rate
    }
}
export const getAllRatingProduct = async (did) => {
    const listRate = []
    const productRef = doc(db, "product", did);
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

export const getNumRatingProduct = async (did) => {
    const listRate = []
    const productRef = doc(db, "product", did);
    const querySnapshot = await getDocs(collection(productRef, "rating"))
    querySnapshot.forEach((doc) => {
        const rating = doc.data().rating;
        listRate.push(rating);
    })
    const count = listRate.length;
    return count;
}

export const addReplyCmt = async (cid, uid, date, content) => {
    const replyRef = await addDoc(collection(db, "reply"), {
        date: date,
        cid: cid,
        uid: uid,
        content: content
      });
    const cmtRef = doc(db, "comment", cid);
    const listRepRef = doc (cmtRef, "reply", uid)
    const docSnap = await getDoc(listRepRef);
    const dataToUpdate = {};
    dataToUpdate[replyRef.id] = 0;
    if (docSnap.exists()) 
        await updateDoc(listRepRef, dataToUpdate);
    else
        await setDoc(listRepRef, dataToUpdate);
}

export const getReply = async (cid) => {  
    const list = [];
    const listRep = [];
    const cmtRef = doc(db, "comment", cid);
    const querySnapshot = await getDocs(collection(cmtRef, "reply"))
    querySnapshot.forEach((doc) => {
        const product = doc.data();
        listRep.push(product);
    })
    const mergedObject1 = listRep.reduce((acc, curr) => ({ ...acc, ...curr }), {});

    for (const key in mergedObject1) {
        if (mergedObject1.hasOwnProperty(key)) {
            const docRef = doc(db, "reply", key);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const rep = docSnap.data();
                rep.id = key
                list.push(rep)
            }
        }
    }
    return list;
}

