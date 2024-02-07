import { UserInfo } from "@/components/auth/JoinForm";
import { db, storage } from "@/firebase";

import { useUserinfo } from "@/store/useUsers";
import MDEditor from "@uiw/react-md-editor";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShortUniqueId from "short-unique-id";

const WritePage = () => {
  const { nowUsers }: any = useUserinfo();
  const boardId = new ShortUniqueId({ length: 10 });
  const imgID = boardId.rnd();
  console.log(boardId.rnd());
  const [title, setTitle] = useState<any>("제목을 입력해주세요.");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const { setPhotoURL } = useUserinfo() as UserInfo;
  const [contents, setContents] = useState<any>("**내용을 입력해주세요.**");
  const navigate = useNavigate();

  const currDate = new Date();
  const formattedDay = currDate.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = currDate.toLocaleString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

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

  const addBoard = async (photoURL: string) => {
    try {
      const docRef = await addDoc(collection(db, "board"), {
        boardId: imgID,
        id: nowUsers.uid,
        title: title,
        contents: contents,
        photoURL: photoURL,
        imgName: selectedFile.name,
        day: formattedDay,
        time: formattedTime,
      });

      navigate("/board");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const uploadBoard = async () => {
    const downloadURL = await imgHandleUpload();
    setPhotoURL(downloadURL);

    await addBoard(downloadURL);
  };

  const titleHendler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <>
      <div>
        <input type="text" value={title} onChange={titleHendler} />
        <MDEditor value={contents} onChange={setContents} />
        <input
          style={{ border: "solid" }}
          type="file"
          onChange={imgHandleChange}
        />
        <button onClick={uploadBoard}>작성하기</button>
      </div>
    </>
  );
};

export default WritePage;
