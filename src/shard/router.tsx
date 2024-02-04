import Home from "@/pages/Home";
import Mypage from "@/pages/Mypage";
import NoticeBoard from "@/pages/NoticeBoard";
import Profill from "@/pages/Profill";
import WritePage from "@/pages/WritePage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import Login from "@/pages/Login";
import Join from "@/pages/Join";
import AnotherUser from "@/pages/AnotherUser";
import AnotherUserMyPage from "@/pages/AnotherUserMyPage";
import NoticeBoardDetail from "@/pages/NoticeBoardDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="mypage" element={<Mypage />} />
          <Route path="profill" element={<Profill />} />
          <Route path="writepage" element={<WritePage />} />
          <Route path="another" element={<AnotherUser />} />
          <Route path="anotherclick" element={<AnotherUserMyPage />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="board" element={<NoticeBoard />} />
        <Route path="board/:id" element={<NoticeBoardDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
