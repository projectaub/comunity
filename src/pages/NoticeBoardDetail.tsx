import { auth, db } from "@/firebase";
import { useBoards } from "@/store/useBoard";
import { useUserinfo } from "@/store/useUsers";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import _debounce from "lodash/debounce";
import debounce from "lodash/debounce";
const NoticeBoardDetail = () => {
  const navigate = useNavigate();
  const { boards, setBoardImg }: any = useBoards();
  const [board, setBoard] = useState<any>(boards);
  const { nowUsers }: any = useUserinfo();
  const [likesArray, setLikesArray]: any = useState([]);
  // const [boardID ,setBoardId] = useState()
  let params = useParams();
  // const boardID = boards.filter((items: any) => {
  //   return items.boardId === params.id;
  // });

  // 좋아요 길이 확인
  const index = boards.findIndex((board: any) => board.boardId === params.id);
  const likesTrue = { ...board[index].likes };
  console.log(likesTrue);
  // 객체가 정의되어 있는지 및 객체가 null 또는 undefined가 아닌지 확인합니다.

  // 객체를 복사하여 updatedLikes에 저장
  const updatedLikes = { ...board[index].likes };

  // nowUsers.uid 키에 해당하는 속성 값을 반전
  updatedLikes[nowUsers.uid] = !updatedLikes[nowUsers.uid];

  // 보드를 매핑하여 특정 인덱스의 요소를 업데이트하고, 변경된 보드를 반환

  useEffect(() => {
    if (likesTrue && typeof likesTrue === "object") {
      const trueValues = Object.entries(likesTrue)
        .filter(([key, value]) => value === true)
        .map(([key, value]) => key);
      console.log(trueValues);
      setLikesArray(trueValues);
    } else {
      console.log("likesTrue 객체가 정의되지 않았거나 객체가 아닙니다.");
    }

    setBoardImg(board[index]);
  }, [board]);
  const likesCheck = likesArray.filter((item: any) => {
    return item == auth.currentUser?.uid;
  });
  console.log(boards);

  const boardHandler = async () => {
    const updatedLikes = { ...board[index].likes };

    const likes: { [key: string]: boolean } = board[index].likes
      ? { ...board[index].likes }
      : {};

    if (auth.currentUser?.uid && board[index].likes && !likesCheck) {
      const updatedLikes = { ...board[index].likes };
      updatedLikes[auth.currentUser.uid] = true;
      const updatedBoard = board.map((item: any, i: any) => {
        if (i === index) {
          // 특정 인덱스의 요소를 업데이트
          return { ...item, likes: updatedLikes };
        }
        return item; // 변경할 필요가 없는 경우에는 그대로 반환
      });
      setBoard(updatedBoard);

      console.log("이미있다");
    } else if (auth.currentUser?.uid && board[index].likes && !likesCheck) {
      const updatedBoard = board.map((item: any, i: any) => {
        if (i === index) {
          // 특정 인덱스의 요소를 업데이트
          return { ...item, likes: likes };
        }
        return item; // 변경할 필요가 없는 경우에는 그대로 반환
      });
      setBoard(updatedBoard);
    } else if (nowUsers.uid in board[index].likes) {
      console.log("발동!!");
      // nowUsers.uid 키에 해당하는 속성 값을 반전
      updatedLikes[nowUsers.uid] = !updatedLikes[nowUsers.uid];

      const updatedBoard = board.map((item: any, i: any) => {
        if (i === index) {
          // 특정 인덱스의 요소를 업데이트
          return { ...item, likes: updatedLikes };
        }
        return item; // 변경할 필요가 없는 경우에는 그대로 반환
      });
      setBoard(updatedBoard);
    }
  };
  const boardLikes = async () => {
    const docRef = doc(db, "board", board[index].docId);
    const likes: { [key: string]: boolean } = board[index].likes
      ? { ...board[index].likes }
      : {};
    if (auth.currentUser?.uid) {
      likes[auth.currentUser.uid] = true;
    }
    if (auth.currentUser?.uid && board[index].likes && !likesCheck) {
      const updatedLikes = { ...board[index].likes };
      updatedLikes[auth.currentUser.uid] = true;
      await setDoc(
        docRef,
        {
          likes: updatedLikes,
        },
        { merge: true }
      );
      console.log("이미있다");
    } else if (auth.currentUser?.uid && board[index].likes && !likesCheck) {
      await setDoc(
        docRef,

        {
          likes: likes,
        },

        { merge: true }
      );
      console.log("새거");
    } else if (nowUsers.uid in board[index].likes) {
      console.log("발동!!");
      await updateDoc(docRef, {
        likes: updatedLikes,
      });
    }
  };
  const debouncedServerUpdate = _debounce(async () => {
    await boardLikes();
  }, 3000);

  const likesfuction = async () => {
    boardHandler();
    debouncedServerUpdate();
  };
  return (
    <>
      {board
        .filter((items: any) => {
          return items.boardId === params.id;
        })
        .map((item: any) => {
          return (
            <div key={item.boardId}>
              <img src={item.photoURL} />
              <div key={item.id}>
                <span>{item.contents}</span>
                <br />
                <span>{likesArray.length}</span>
              </div>

              {nowUsers.uid === item.id && (
                <button
                  style={{ border: "solid" }}
                  onClick={() => {
                    navigate(`update`);
                  }}
                >
                  수정
                </button>
              )}
              <button style={{ border: "solid" }} onClick={likesfuction}>
                좋아요 버튼
              </button>
            </div>
          );
        })}
    </>
  );
};

export default NoticeBoardDetail;
