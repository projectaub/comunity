import { db } from "@/firebase";
import { useBoards } from "@/store/useBoard";

import { collection, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoticeBoard = () => {
  const navigate = useNavigate();
  // 1. 현재 시간(Locale)
  const curr = new Date();

  // 2. UTC 시간 계산
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

  // 3. UTC to KST (UTC + 9시간)
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000; //한국 시간(KST)은 UTC시간보다 9시간 더 빠르므로 9시간을 밀리초 단위로 변환.
  const kr_curr = new Date(utc + KR_TIME_DIFF); //UTC 시간을 한국 시간으로 변환하기 위해 utc 밀리초 값에 9시간을 더함.
  // 한국시간 : Tue May 31 2022 09:00:30 GMT+0900 (한국 표준시)
  const { boards, setBoards }: any = useBoards();
  console.log(boards);
  useEffect(() => {
    const getBoard = async () => {
      const q = query(collection(db, "board"));
      const querySnapshot = await getDocs(q);
      const boardData: any = [];
      querySnapshot.forEach((doc) => {
        boardData.push({
          docId: doc.id,
          time: kr_curr,
          ...doc.data(),
        });
        setBoards(boardData);
      });
    };
    getBoard();
  }, []);

  const handleBoardClick = (boardId: string) => {
    navigate(`/board/${boardId}`);
  };

  return (
    <>
      {boards.map((item: any) => {
        return (
          <button
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              marginBottom: "20px",
            }}
            key={item.id}
            onClick={() => handleBoardClick(item.boardId)}
          >
            <div>{item.title}</div>
            {item.photoURL && <img src={item.photoURL} alt={item.title} />}
          </button>
        );
      })}
      <button
        onClick={() => {
          navigate("/writepage");
        }}
      >
        글쓰러가기
      </button>
    </>
  );
};

export default NoticeBoard;
