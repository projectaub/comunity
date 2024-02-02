import { useUserinfo } from "@/store/useUsers";
import { useNavigate } from "react-router-dom";

const AnotherUser = () => {
  const navigate = useNavigate();
  const { LoginUser, nowUsers, setSelectUser } = useUserinfo() as any;
  const handlerUserId = (id: string) => {
    setSelectUser(id);
    navigate("/anotherclick");
  };
  return (
    <>
      <div>
        {LoginUser.filter((email: any) => {
          return email.email !== nowUsers.email;
        }).map((item: any) => {
          return (
            <button
              key={item.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                marginBottom: "20px",
              }}
              onClick={() => handlerUserId(item.id)}
            >
              <div>{item.email}</div>
              <div>{item.greetings}</div>
              <div>{item.nickname}</div>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default AnotherUser;
