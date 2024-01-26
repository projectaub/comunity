import Home from "@/pages/Home";
import Mypage from "@/pages/Mypage";
import NoticeBoard from "@/pages/NoticeBoard";
import Profill from "@/pages/Profill";
import WritePage from "@/pages/WritePage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import Login from "@/pages/Login";
import Join from "@/pages/Join";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="mypage" element={<Mypage />} />
          <Route path="profill" element={<Profill />} />
          <Route path="writepage" element={<WritePage />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="noticeboard" element={<NoticeBoard />} />
        <Route path="login" element={<Login />} />
        <Route path="join" element={<Join />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
