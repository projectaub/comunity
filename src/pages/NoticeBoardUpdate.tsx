import { UserInfo } from "@/components/auth/JoinForm";
import { db, storage } from "@/firebase";
import { useBoards } from "@/store/useBoard";
import { useUserinfo } from "@/store/useUsers";
import MDEditor from "@uiw/react-md-editor";
import { doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShortUniqueId from "short-unique-id";

const NoticeBoardUpdate = () => {
  const navigate = useNavigate();
  let params = useParams();
  const { boards, boardImg }: any = useBoards();
  const { setPhotoURL } = useUserinfo() as UserInfo;
  const filter = boards.filter((items: any) => {
    return items.boardId === params.id;
  });
  console.log(boardImg.boardId);
  const boardImgName = filter[0].imgName;
  console.log(boardImgName);
  const [contents, setContents] = useState<any>(filter[0].contents);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const boardId = new ShortUniqueId({ length: 10 });
  const imgID = boardId.rnd();
  const delImg = async () => {
    if (boardImg && boardImg.boardId) {
      const desertRef = ref(storage, `${boardImg.boardId}/${boardImgName}`);
      await deleteObject(desertRef);
    } else {
      console.log("이미지가 없습니다.");
    }
  };
  const imgHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const imgHandleUpload = async () => {
    const imageRef = ref(storage, `${imgID}/${selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  const updateBoard = async () => {
    const updateRef = doc(db, "board", filter[0].docId);
    await updateDoc(updateRef, { contents: contents });
    await updateBoardhendler();
    navigate(`/board/${params.id}`);
  };
  const imgUpdateBoard = async (downloadURL: any) => {
    const updateRef = doc(db, "board", filter[0].docId);
    await updateDoc(updateRef, { PhotoURL: downloadURL });
  };
  const updateBoardhendler = async () => {
    if (selectedFile.name != boardImgName) {
      const downloadURL = await imgHandleUpload();
      setPhotoURL(downloadURL);
      await delImg();
      await imgUpdateBoard(downloadURL);
    }
    await updateBoard();
  };

  return (
    <>
      {boards
        .filter((items: any) => {
          return items.boardId === params.id;
        })
        .map((item: any) => {
          return (
            <div>
              <div>{item.title}</div>
              <MDEditor
                value={contents}
                onChange={setContents}
                preview="edit"
                height={500}
              />
              <button style={{ border: "solid" }} onClick={updateBoard}>
                수정하기
              </button>
              <input
                style={{ border: "solid" }}
                type="file"
                onChange={imgHandleChange}
              />
              <button onClick={delImg}>지우기</button>
            </div>
          );
        })}
    </>
  );
};

export default NoticeBoardUpdate;
