import React, { useEffect, useState, useMemo } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import * as DishService from "../../services/DishService.js";
import app from "../../config/firebase";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import * as message from '../../components/MessageComponent/MessageComponent'
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import imgPhoto from "../../image/img_photo.png";
import imgName from "../../image/img_books.png";
import imgNutri from "../../image/img_nutrition.png";
import imgIngr from "../../image/img_ingre.png";
import imgRecipe from "../../image/img_recipe_book.png";
import { Card, Button, Input, Badge, Popconfirm } from 'antd';
const { TextArea } = Input;

const AddDishComponent = () => {
  const auth = getAuth(app);

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [listDish, setListDish] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileDish, setFileDish] = useState(null);
  const [name, setName] = useState('');
  const [kcal, setKcal] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [protein, setProtein] = useState(0);
  const [ingr, setIngr] = useState("");
  const [recipe, setRecipe] = useState("");

 
  const getListDish = async () => {
    setListDish(await DishService.getAllDish());
}

  const handleAuth = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await UserService.getDetailUser(user.uid);
        setUserData(userData)

        
      } else console.log("Chưa đăng nhập");
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFileDish(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
};
  
  useEffect(() => {
    handleAuth();
    getListDish()
  }, []);

  const handleOnchangeKcal = (value) => {
    setKcal(value)
}
const handleOnchangeCarbs = (value) => {
    setCarbs(value)
}
const handleOnchangeFat = (value) => {
    setFat(value)
}
const handleOnchangeProtein = (value) => {
    setProtein(value)
}
const convertToSnakecake = (txt) => {
  const withoutDiacritics = txt
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s]/g, '');

    // Replace spaces and commas with underscores and convert to lowercase
    const snakeCaseText = withoutDiacritics
      .toLowerCase()
      .replace(/[\s,]+/g, '_');
  return snakeCaseText;
};

const convertIngredient = () => {
  const lineArray = ingr.split('\n');
  return lineArray;
};

const convertRecipe = () => {
  const lineArray = recipe.split('\n');
  return lineArray;
};

const checkAll = () => {
  let i = 0;
  if (selectedImage)
    i++;
  if (name)
    i++;
  if (ingr)
    i++;
  if (recipe)
    i++;
  if (i==4)
    return true;
  return false;
}

const checkName = () => {
  let i = 0;
  listDish.forEach((item) => {
    if(convertToSnakecake(item.name) == convertToSnakecake(name)){
      console.log(convertToSnakecake(item.name) +" " +convertToSnakecake(name))
      i++;
    }
  });
  if (i>0)
    return false; //trung
  else
    return true; //khong trung
}

const confirmDish = (e) => {
  if (checkAll()) {
    if (checkName()){
      DishService.addDish(fileDish, convertToSnakecake(name), name, kcal, carbs, fat, protein, convertIngredient(), convertRecipe());  
      message.success(`Thêm món ăn thành công`)
      navigate(`/dish`)
    }
    else message.error(`Đã tồn tại tên món ăn`)
  }
  else message.error(`Bạn chưa điền đủ thông tin`)
};
const cancelDish = (e) => {
  message.error('Hủy thêm món ăn');
};

  return (
    <div className={styles.wrap}>
        <div className={styles.flex2}>
            <img className={styles.img_deco1} alt="example" src={imgPhoto} />
            <p className={styles.txt}> Tải hình ảnh</p>
        </div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {selectedImage && (
            <div className={styles.flex1}>
                <img className={styles.img_dish} src={selectedImage} alt="Selected" />
            </div>
        )}
        <div className={styles.flex2}>
            <img className={styles.img_deco1} alt="example" src={imgName} />
            <p className={styles.txt}>Tên món ăn</p>
        </div>
        <TextArea value={name} onChange={(e) => setName(e.target.value)} 
        placeholder="Nhập tên món ăn" autoSize={{ minRows: 1, maxRows: 3, }}/>
        <div className={styles.flex2}>
            <img className={styles.img_deco1} alt="example" src={imgNutri} />
            <p className={styles.txt}>Giá trị dinh dưỡng</p>
        </div>
        <div className={styles.flex3}>
            <div>
                <span className={styles.txt1}>kcal</span>
                <InputFormComponent className={styles.te} type="number" value={kcal} onChange={handleOnchangeKcal} 
                placeholder="Nhập số kcal" />
            </div>
            
            <div>
                <span className={styles.txt1}>carbs</span>
                <InputFormComponent className={styles.te} type="number" value={carbs} onChange={handleOnchangeCarbs} 
                placeholder="Nhập số gram carbs"/>
            </div>
            <div>
                <span className={styles.txt1}>fat</span>
                <InputFormComponent className={styles.te} type="number" value={fat} onChange={handleOnchangeFat} 
                placeholder="Nhập số gram fat"/>
            </div>
            <div>
                <span className={styles.txt1}>protein</span>
                <InputFormComponent className={styles.te} type="number" value={protein} onChange={handleOnchangeProtein} 
                placeholder="Nhập số gram protein"/>
            </div>
        </div>
        <div className={styles.flex2}>
            <img className={styles.img_deco1} alt="example" src={imgIngr} />
            <p className={styles.txt}>Nguyên liệu</p>
        </div>
        <TextArea value={ingr} onChange={(e) => setIngr(e.target.value)} 
        placeholder="Ví dụ: 100g thịt bò" autoSize={{ minRows: 5, maxRows: 7, }}/>
        <div className={styles.flex2}>
            <img className={styles.img_deco1} alt="example" src={imgRecipe} />
            <p className={styles.txt}>Công thức</p>
        </div>
        <TextArea value={recipe} onChange={(e) => setRecipe(e.target.value)} 
        placeholder="Ví dụ: 1. Rửa rau" autoSize={{ minRows: 5, maxRows: 7, }}/>
        
        <Popconfirm title="Thêm món ăn" description="Xác nhận Thêm món ăn?"
          onConfirm={confirmDish} onCancel={cancelDish}
          okText="Xác nhận" cancelText="Hủy bỏ" >
            <button className={styles.upload}>Hoàn tất</button >
         </Popconfirm>
        
    </div>
  );
}
  
export default AddDishComponent;
