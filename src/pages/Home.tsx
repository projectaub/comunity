import { auth } from "@/firebase";
import { useUserinfo } from "@/store/useUsers";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";

const Home = () => {
  // 로그인 상태 확인을 위한전역상태 관리
  const { setLogin, setCurrentUser } = useUserinfo() as {
    setCurrentUser: (Users: any) => void;
    setLogin: (login: boolean) => void;
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setLogin(true);
        console.log("성공");
      } else {
        setLogin(false);
        console.log("실패");
      }
    });
    setCurrentUser(auth.currentUser);
  }, []);

  const onLogOutClick = () => {
    signOut(auth);
  };

  return (
    <>
      <br />
      <button onClick={onLogOutClick}>로그아웃</button>
      <br />
      home
    </>
  );
};

export default Home;
