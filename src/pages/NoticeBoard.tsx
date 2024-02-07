import { db } from "@/firebase";
import { useBoards } from "@/store/useBoard";

import { collection, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoticeBoard = () => {
  const navigate = useNavigate();

  const { boards, setBoards }: any = useBoards();

  const sortedBoards = boards.sort((a: any, b: any) => {
    const timeA = new Date(`${a.day.replace(/\s/g, "")} ${a.time}`);
    const timeB = new Date(`${b.day.replace(/\s/g, "")} ${b.time}`);
    return timeA.getTime() - timeB.getTime();
  });

  useEffect(() => {
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
  }, []);

  const handleBoardClick = (boardId: string) => {
    navigate(`/board/${boardId}`);
  };

  return (
    <>
      {sortedBoards.map((item: any) => {
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
