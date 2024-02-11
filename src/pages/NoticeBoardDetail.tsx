import { auth, db } from "@/firebase";
import { useBoards } from "@/store/useBoard";
import { useUserinfo } from "@/store/useUsers";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NoticeBoardDetail = () => {
  const navigate = useNavigate();
  const { boards, setBoardImg }: any = useBoards();
  const { nowUsers }: any = useUserinfo();
  const [likesArray, setLikesArray]: any = useState([]);
  let params = useParams();
  const boardID = boards.filter((items: any) => {
    return items.boardId === params.id;
  });
  // 좋아요 길이 확인
  const likes = boardID[0].likes;
  const likesArrayThree: any[] = [];
  boardID.forEach((item: any) => {
    likesArrayThree.push(item.likes);
  });

  const likesLength = likesArray.filter((item: any) => {
    return item === true;
  }).length;
  useEffect(() => {
    if (likes) {
      setLikesArray(Object.keys(likes));
    }
    setBoardImg(boardID[0]);
  }, []);
  const likesCheck = likesArray.filter((item: any) => {
    return item == auth.currentUser?.uid;
  });
  console.log(likesArrayThree);
  console.log(likesCheck);
  console.log(boardID[0]);
  console.log(nowUsers);

  const boardLikes = async () => {
    const docRef = doc(db, "board", boardID[0].docId);
    const likes: { [key: string]: boolean } = boardID[0].likes
      ? { ...boardID[0].likes }
      : {};
    if (auth.currentUser?.uid) {
      likes[auth.currentUser.uid] = true;
    }
    if (auth.currentUser?.uid && boardID[0].likes && !likesCheck) {
      const updatedLikes = { ...boardID[0].likes };
      updatedLikes[auth.currentUser.uid] = true;
      await setDoc(
        docRef,
        {
          likes: updatedLikes,
        },
        { merge: true }
      );
      console.log("이미있다");
    } else if (auth.currentUser?.uid && boardID[0].likes && !likesCheck) {
      await setDoc(
        docRef,

        {
          likes: likes,
        },

        { merge: true }
      );
      console.log("새거");
    } else if (nowUsers.uid in boardID[0].likes) {
      console.log("발동!!");
      const updatedLikes = { ...boardID[0].likes };
      updatedLikes[nowUsers.uid] = !updatedLikes[nowUsers.uid];
      await updateDoc(docRef, {
        likes: updatedLikes,
      });
    }
  };

  return (
    <>
      {boards
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
                <span>{likesLength}</span>
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
              <button style={{ border: "solid" }} onClick={boardLikes}>
                좋아요 버튼
              </button>
            </div>
          );
        })}
    </>
  );
};

export default NoticeBoardDetail;

// if (auth.currentUser?.uid && boardID[0].likes) {
//   const updatedLikes = { ...boardID[0].likes };
//   updatedLikes[auth.currentUser.uid] = true;
//   await setDoc(
//     docRef,
//     {
//       likes: updatedLikes,
//     },
//     { merge: true }
//   );
//   console.log("이미있다");
// } else {
//   await setDoc(
//     docRef,
//     {
//       likes: likes,
//     },
//     { merge: true }
//   );
//   console.log("새거");
// }
// };
