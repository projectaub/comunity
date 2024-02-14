import { auth, db, storage } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useValidation from "./useValidation";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUserinfo } from "@/store/useUsers";

export interface UserInfo {
  photoURL: string;
  setPhotoURL: (url: string) => void;
}

export interface initialValuesForm {
  email: string;
  password: string;
  nickname: string;
  greetings: string;
}

export const initialValues: initialValuesForm = {
  email: "",
  password: "P@ssw0rd1!",
  nickname: "",
  greetings: "",
};

//P@ssw0rd1!
const JoinForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<initialValuesForm>(initialValues);
  const { setPhotoURL } = useUserinfo() as UserInfo;
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const { validatePassword } = useValidation();
  const handleChange = (key: string, value: string | null) => {
    setValues({ ...values, [key]: value });
  };
  const imgHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const imgHandleUpload = async () => {
    const imageRef = ref(
      storage,
      `${auth.currentUser?.uid}/${selectedFile.name}`
    );
    await uploadBytes(imageRef, selectedFile);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordValidationResult = validatePassword(values.password);
    if (passwordValidationResult) {
      alert(passwordValidationResult);
      return;
    }
  };

  const Signup = async () => {
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    const downloadURL = await imgHandleUpload();
    setPhotoURL(downloadURL);
    await addUserInfo(downloadURL);
    navigate("/login");
  };

  const addUserInfo = async (photoURL: string) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        email: values.email,
        nickname: values.nickname,
        greetings: values.greetings,
        photoURL: photoURL,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  console.log(selectedFile);

  return (
    <>
      <form onSubmit={onSubmit}>
        이 메 일:
        <input
          style={{ border: "solid" }}
          value={values.email}
          type="email"
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <br />
        패스워드:
        <input
          style={{ border: "solid" }}
          value={values.password}
          type="password"
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <br />
        별 명:
        <input
          style={{ border: "solid" }}
          value={values.nickname}
          type="text"
          onChange={(e) => handleChange("nickname", e.target.value)}
        />
        <br />
        인사말:
        <input
          style={{ border: "solid" }}
          value={values.greetings}
          type="text"
          onChange={(e) => handleChange("greetings", e.target.value)}
        />
        <br />
        프로필사진:
        <input
          style={{ border: "solid" }}
          type="file"
          onChange={imgHandleChange}
        />
        <button style={{ border: "solid" }} onClick={Signup}>
          Join
        </button>
        <button onClick={() => navigate("/login")}>Join 으로</button>
      </form>
    </>
  );
};

export default JoinForm;
