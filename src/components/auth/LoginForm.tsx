import { useState } from "react";
import { initialValues, initialValuesForm } from "./JoinForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { getUser } from "@/api/User";
import { User, useUserinfo } from "@/store/useUsers";

const LoginForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<initialValuesForm>(initialValues);
  const userInfo: any = useUserinfo();
  const handleChange = (key: string, value: string | number) => {
    setValues({ ...values, [key]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  // 로그인
  const Login = async () => {
    await signInWithEmailAndPassword(auth, values.email, values.password);
    const user = await getUser(values.email);
    userInfo.setUser(user);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        로그인 이 메 일:
        <input
          style={{ border: "solid" }}
          value={values.email}
          type="email"
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <br />
        로그인 패스워드:
        <input
          style={{ border: "solid" }}
          value={values.password}
          type="password"
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <button style={{ border: "solid" }} onClick={Login}>
          Login
        </button>
        <button onClick={() => navigate("/join")}>Join 으로</button>
      </form>
    </>
  );
};

export default LoginForm;
