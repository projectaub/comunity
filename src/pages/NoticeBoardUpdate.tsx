import { db, storage } from "@/firebase";
import { useBoards } from "@/store/useBoard";

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

const NoticeBoardUpdate = () => {
  const navigate = useNavigate();
  let params = useParams();
  const { boards, boardImg }: any = useBoards();

  const filter = boards.filter((items: any) => {
    return items.boardId === params.id;
  });

  const boardImgName = filter[0].imgName;
  console.log(boardImgName);
  const [contents, setContents] = useState<any>(filter[0].contents);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  //  문제없음
  const delImg = async () => {
    if (boardImg && boardImg.boardId) {
      const desertRef = ref(storage, `${filter[0].boardId}/${boardImgName}`);
      try {
        await deleteObject(desertRef);
        console.log("이미지가 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.log("이미지를 삭제하는 중 오류가 발생했습니다:", error);
      }
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
    const imageRef = ref(storage, `${filter[0].boardId}/${selectedFile?.name}`);
    await uploadBytes(imageRef, selectedFile);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  };

  const updateBoard = async () => {
    const updateRef = doc(db, "board", filter[0].docId);
    await updateDoc(updateRef, { contents: contents });
    navigate(`/board/${params.id}`);
  };

  const updateBoardHandler = async () => {
    if (selectedFile?.name !== boardImgName && selectedFile) {
      const downloadURL = await imgHandleUpload();
      await updatePhotoURL(downloadURL); // photoURL 업데이트
      await delImg();
    }
    await updateBoard();
  };

  const updatePhotoURL = async (downloadURL: string) => {
    const updateRef = doc(db, "board", filter[0].docId);
    await updateDoc(updateRef, {
      photoURL: downloadURL,
      imgName: selectedFile.name,
    });
  };

  const handleUpdateClick = async () => {
    if (selectedFile?.name !== boardImgName && selectedFile) {
      await updateBoardHandler(); // 이미지 업로드 및 삭제 완료 후 게시글 업데이트
    } else {
      await updateBoard(); // 이미지 변경 없이 게시글만 업데이트
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
            <div>
              <div>{item.title}</div>
              <MDEditor
                value={contents}
                onChange={setContents}
                preview="edit"
                height={500}
              />
              <button style={{ border: "solid" }} onClick={handleUpdateClick}>
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
