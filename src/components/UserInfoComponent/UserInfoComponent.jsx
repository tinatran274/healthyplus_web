import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import {
  WrapperButton,
  WrapperWhiteText,
  WrapperIndexText,
  WrapperFlexRow,
} from "./style";
import InputFormComponent from "../../components/InputFormComponent/InputFormComponent";
import { Col, Row, Input, Popconfirm, Select } from "antd";
import app from "../../config/firebase";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import * as UserService from "../../services/UserService";
import bmiImg from "../../image/img_bmi.png";
import questionImg from "../../image/img_question.png";
import { updateName, updateInfo, updateAim } from "../../redux/user/User";
import { useDispatch, useSelector } from "react-redux";
import * as message from "../../components/MessageComponent/MessageComponent";
const getDateToday = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
  const year = currentDate.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};
const UserInfoComponent = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const { isLoading, error, status } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [exercise, setExercise] = useState("");
  const [aim, setAim] = useState("");
  const [water, setWater] = useState("1");
  const [bmi, setBMI] = useState("1");
  const [tdee, setTDEE] = useState("1");
  const [calo, setCalo] = useState("1");
  const [coin, setCoin] = useState("0"); // ok
  const [check, setCheck] = useState("0");

  const handleAuth = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await UserService.getDetailUser(user.uid);
        setUserData(userData);
        setName(userData.getName());
        setAge(userData.getAge());
        setGender(userData.getGender());
        setHeight(userData.getHeight());
        setWeight(userData.getWeight());
        setExercise(userData.getExercise());
        setAim(userData.getAim());
        setWater(userData.getWater());
        setBMI(userData.getBMI());
        setTDEE(userData.getTDEE());
        setCalo(userData.getCalories());

        setCheck(await UserService.getCheck(userData.id, getDateToday()));
      } else console.log("Chưa đăng nhập");
    });
  };
  useEffect(() => {
    handleAuth();
  }, []);

  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangeAge = (value) => {
    setAge(value);
  };
  const handleOnchangeGender = (value) => {
    setGender(value);
  };
  const handleOnchangeHeight = (value) => {
    setHeight(value);
  };
  const handleOnchangeWeight = (value) => {
    setWeight(value);
  };
  const handleOnchangeExercise = (value) => {
    setExercise(value);
  };
  const handleOnchangeAim = (value) => {
    setAim(value);
  };

  const handleUpdateName = () => {
    dispatch(updateName(userData.id, name));
  };
  const handleUpdateInfo = () => {
    dispatch(updateInfo(userData.id, age, gender, height, weight, exercise));
  };

  const handleUpdateAim = () => {
    dispatch(updateAim(userData.id, aim));
  };
  const confirmAccount = (e) => {
    handleUpdateName();
    message.success("Cập nhật thành công");
  };
  const cancelAccount = (e) => {
    message.error("Hủy cập nhật");
  };
  const confirmInfo = (e) => {
    handleUpdateInfo();
    message.success("Cập nhật thành công");
  };
  const cancelInfo = (e) => {
    message.error("Hủy cập nhật");
  };
  const confirmAim = (e) => {
    handleUpdateAim();
    message.success("Cập nhật thành công");
  };
  const cancelAim = (e) => {
    message.error("Hủy cập nhật");
  };

  return (
    <div className={styles.info_user}>
      <Row>
        <Col span={14}>
          <p className={styles.title}>Tài khoản</p>
          <div className={styles.view}></div>
          <Row className={styles.part}>
            <Col className={styles.flex1} span={8}>
              <img
                className={styles.avatar}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
              <WrapperButton>Cập nhật avatar</WrapperButton>
            </Col>
            <Col className={styles.flex2} span={16}>
              <span>Tên người dùng</span>
              <InputFormComponent
                className={styles.inp}
                placeholder=""
                value={name}
                onChange={handleOnchangeName}
              />
              <span>Email</span>
              <Input
                disabled
                className={styles.inp}
                placeholder="2345@gmail.com"
              />

              <div className={styles.flex3}>
                <Popconfirm
                  title="Cập nhật tài khoản"
                  description="Xác nhận cập nhật tài khoản?"
                  onConfirm={confirmAccount}
                  onCancel={cancelAccount}
                  okText="Xác nhận"
                  cancelText="Hủy bỏ"
                >
                  <WrapperButton>Cập nhật tài khoản </WrapperButton>
                </Popconfirm>
                <WrapperButton>Đổi mật khẩu</WrapperButton>
              </div>
            </Col>
          </Row>
          <p className={styles.title}>Thông tin cá nhân</p>
          <div className={styles.view}></div>
          <Row className={styles.part}>
            <Col className={styles.flex4} span={12}>
              <span>Tuổi</span>
              <InputFormComponent
                className={styles.inp}
                placeholder=""
                type="number"
                value={age}
                onChange={handleOnchangeAge}
              />
              <span>Giới tính</span>
              <Select
                className={styles.select}
                value={gender}
                onChange={handleOnchangeGender}
                options={[
                  { value: "Nam", label: "Nam" },
                  { value: "Nữ", label: "Nữ" },
                ]}
              />
              <br></br>
              <span>Mức độ vận động</span>
              <Select
                className={styles.select}
                value={exercise}
                onChange={handleOnchangeExercise}
                options={[
                  { value: "Không vận động", label: "Không vận động" },
                  { value: "1-2 buổi/tuần", label: "1-2 buổi/tuần" },
                  { value: "3-5 buổi/tuần", label: "3-5 buổi/tuần" },
                  { value: "5-7 buổi/tuần", label: "5-7 buổi/tuần" },
                ]}
              />
            </Col>
            <Col className={styles.flex4} span={12}>
              <span>Chiều cao</span>
              <InputFormComponent
                className={styles.inp}
                placeholder=""
                type="number"
                value={height}
                onChange={handleOnchangeHeight}
              />
              <span>Cân nặng</span>
              <InputFormComponent
                className={styles.inp}
                placeholder=""
                type="number"
                value={weight}
                onChange={handleOnchangeWeight}
              />
              <div className={styles.flex3}>
                <Popconfirm
                  title="Cập nhật thông tin cá nhân"
                  description="Xác nhận cập nhật thông tin cá nhân?"
                  onConfirm={confirmInfo}
                  onCancel={cancelInfo}
                  okText="Xác nhận"
                  cancelText="Hủy bỏ"
                >
                  <WrapperButton>Cập nhật tài khoản </WrapperButton>
                </Popconfirm>
              </div>
            </Col>
          </Row>
          <p className={styles.title}>Mục tiêu</p>
          <div className={styles.view}></div>
          <div className={styles.aim_box}>
            <div className={styles.aim}>
              <p>Mục tiêu hiện tại</p>
              <Select
                className={styles.aim_select}
                value={aim}
                onChange={handleOnchangeAim}
                options={[
                  { value: "Tăng cân", label: "Tăng cân" },
                  { value: "Giữ cân", label: "Giữ cân" },
                  { value: "Giảm cân", label: "Giảm cân" },
                ]}
              />
              <div className={styles.flex5}>
                <Popconfirm
                  title="Cập nhật mục tiêu"
                  description="Xác nhận cập nhật mục tiêu?"
                  onConfirm={confirmAim}
                  onCancel={cancelAim}
                  okText="Xác nhận"
                  cancelText="Hủy bỏ"
                >
                  <WrapperButton>Cập nhật mục tiêu </WrapperButton>
                </Popconfirm>
              </div>
            </div>
            <WrapperFlexRow>
              <WrapperWhiteText>
                Để đạt được mục tiêu bạn cần nạp:
              </WrapperWhiteText>
              <WrapperIndexText>{calo} </WrapperIndexText>
              <WrapperWhiteText>kcal</WrapperWhiteText>
            </WrapperFlexRow>
            <WrapperFlexRow>
              <WrapperWhiteText>
                Lượng nước uống cần thiết mỗi ngày:
              </WrapperWhiteText>
              <WrapperIndexText>{water} </WrapperIndexText>
              <WrapperWhiteText>lít</WrapperWhiteText>
            </WrapperFlexRow>
            <WrapperFlexRow>
              <WrapperWhiteText>BMI:</WrapperWhiteText>
              <WrapperIndexText>{bmi}</WrapperIndexText>
            </WrapperFlexRow>
            <WrapperFlexRow>
              <WrapperWhiteText>TDEE:</WrapperWhiteText>
              <WrapperIndexText>{tdee}</WrapperIndexText>
            </WrapperFlexRow>
          </div>
        </Col>
        <Col span={10}>
          <WrapperFlexRow>
            <img className={styles.question} src={questionImg} />
            <p className={styles.txtQuestion}>Có thể bạn đã biết</p>
          </WrapperFlexRow>
          <img className={styles.bmi} src={bmiImg} />
          <p className={styles.bmi}>
            Chỉ số BMI hay còn gọi là chỉ số khối cơ thể, là một công cụ thường
            được sử dụng để đo lượng mỡ trong cơ thể. Chỉ số BMI chuẩn được tính
            dựa trên chiều cao và cân nặng.
          </p>
        </Col>
      </Row>
    </div>
  );
};
export default UserInfoComponent;
