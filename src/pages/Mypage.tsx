import { auth } from "@/firebase";
import { CurrentUser, useUserinfo } from "@/store/useUsers";
import { signOut } from "firebase/auth";

const Mypage = () => {
  const { users } = useUserinfo() as { users: CurrentUser };
  console.log(users);
  const onLogOutClick = () => {
    signOut(auth)
      .then(() => {})
      .catch(() => {});
  };

  return (
    <>
      Mypage
      <br />
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Mypage;
