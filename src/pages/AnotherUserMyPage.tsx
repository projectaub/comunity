import { useUserinfo } from "@/store/useUsers";

const AnotherUserMyPage = () => {
  const { LoginUser, selectUser }: any = useUserinfo();

  return (
    <>
      {LoginUser.filter((item: any) => {
        return item.id === selectUser;
      }).map((user: any) => {
        return (
          <div key={user.id}>
            <div>{user.email}</div>
            <div>{user.nickname}</div>
            <div>{user.greetings}</div>
          </div>
        );
      })}
    </>
  );
};

export default AnotherUserMyPage;
