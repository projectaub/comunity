import { auth, db, storage } from "@/firebase";
import { useUserinfo } from "@/store/useUsers";
import { doc, updateDoc } from "@firebase/firestore";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

interface profill {
  nickname: string;
  greetings: string;
}

const Mypage = () => {
  const profillValue = {
    nickname: "",
    greetings: "",
  };
  const [values, setValues] = useState<profill>(profillValue);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const { LoginUser, nowUsers, setPhotoURL, photoURL }: any = useUserinfo();

  const imgHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onLogOutClick = () => {
    signOut(auth);
  };
  const updateNickname = async () => {
    const curUserData = LoginUser.filter((item: any) => {
      return item.email === nowUsers?.email;
    });

    const updateRef = doc(db, "users", curUserData[0].id);
    await updateDoc(updateRef, { nickname: values.nickname });
  };
  const updateGreetings = async () => {
    const curUserData = LoginUser.filter((item: any) => {
      return item.email === nowUsers?.email;
    });
    const updateRef = doc(db, "users", curUserData[0].id);
    await updateDoc(updateRef, { greetings: values.greetings });
  };
  const handlePhotoURL = async (downloadURL: string) => {
    const curUserData = LoginUser.filter((item: any) => {
      return item.email === nowUsers?.email;
    });
    const updateRef = doc(db, "users", curUserData[0].id);
    await updateDoc(updateRef, { photoURL: downloadURL });
    console.log(downloadURL);
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

  const handleChange = (key: string, value: string | null | File) => {
    setValues({ ...values, [key]: value });
  };

  const updateURL = async () => {
    const downloadURL = await imgHandleUpload();
    setPhotoURL(downloadURL);
    await handlePhotoURL(downloadURL);
  };

  return (
    <>
      Mypage
      <br />
      {LoginUser.filter((email: any) => {
        return email.email === nowUsers?.email;
      }).map((item: any) => {
        return (
          <>
            <div key={item.id}>
              {item.nickname}
              <br />
              <input
                style={{ border: "solid" }}
                value={values.nickname}
                type="email"
                onChange={(e) => handleChange("nickname", e.target.value)}
              />
              <button onClick={updateNickname}>업데이트닉네임</button>
              <br />
              {item.greetings}
              <br />
              <input
                style={{ border: "solid" }}
                value={values.greetings}
                type="email"
                onChange={(e) => handleChange("greetings", e.target.value)}
              />
              <br />
              <button onClick={updateGreetings}>업데이트인사말</button>
              <img src={`${photoURL}`} />
              <input
                style={{ border: "solid" }}
                type="file"
                onChange={imgHandleChange}
              />
              <button onClick={updateURL}>이미지 업로드</button>
            </div>
          </>
        );
      })}
      <button
        onClick={() => {
          sendPasswordResetEmail(auth, nowUsers.email);
        }}
      >
        비밀번호 재설정 이메일
      </button>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Mypage;
