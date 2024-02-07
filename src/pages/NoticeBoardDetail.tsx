import { useBoards } from "@/store/useBoard";
import { useUserinfo } from "@/store/useUsers";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const NoticeBoardDetail = () => {
  const navigate = useNavigate();
  const { boards, setBoardImg }: any = useBoards();
  const { nowUsers }: any = useUserinfo();
  let params = useParams();
  const boardID = boards.filter((items: any) => {
    return items.boardId === params.id;
  });

  useEffect(() => {
    setBoardImg(boardID[0]);
  }, []);

  return (
    <>
      {boards
        .filter((items: any) => {
          return items.boardId === params.id;
        })
        .map((item: any) => {
          return (
            <div>
              <img src={item.photoURL} />
              <div>{item.contents}</div>
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
            </div>
          );
        })}
    </>
  );
};

export default NoticeBoardDetail;
