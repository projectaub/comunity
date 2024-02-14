import { auth, db } from "@/firebase";
import { useBoards } from "@/store/useBoard";
import { useUserinfo } from "@/store/useUsers";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";

const Home = () => {
  // 로그인 상태 확인을 위한전역상태 관리
  const { boards, setBoards }: any = useBoards();
  console.log(boards);
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

    const getBoard = async () => {
      const q = query(collection(db, "board"));
      const querySnapshot = await getDocs(q);
      const boardData: any = [];
      querySnapshot.forEach((doc) => {
        boardData.push({
          docId: doc.id,

          ...doc.data(),
        });
        setBoards(boardData);
      });
    };
    getBoard();
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
