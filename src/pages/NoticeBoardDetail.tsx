import React from "react";
import { useBoards } from "@/store/useBoard";
import { useUserinfo } from "@/store/useUsers";
import { useParams } from "react-router-dom";

const NoticeBoardDetail = () => {
  const { boards }: any = useBoards();
  const { nowUsers }: any = useUserinfo();
  let params = useParams();
  console.log(params.id);
  return (
    <>
      {boards
        .filter((items: any) => {
          return items.boardId === params.id;
        })
        .map((item: any) => {
          return <div>{item.contents}</div>;
        })}
    </>
  );
};

export default NoticeBoardDetail;
