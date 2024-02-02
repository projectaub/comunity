import { useEffect, useState } from "react";
import { initialValues, initialValuesForm } from "./JoinForm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { useUserinfo } from "@/store/useUsers";

// P@ssw0rd1!
const LoginForm = () => {
  const navigate = useNavigate();
  const { setLoginUser } = useUserinfo() as {
    LoginUser: any;
    setLoginUser: (LoginUser: any) => void;
  };
  const [values, setValues] = useState<initialValuesForm>(initialValues);

  const handleChange = (key: string, value: string | number) => {
    setValues({ ...values, [key]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  // 로그인
  const Login = async () => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);

        const userData: any[] = [];
        querySnapshot.forEach((doc) => {
          userData.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setLoginUser(userData);
        // 데이터를 loginUser 상태로 설정
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchData();
  }, [setLoginUser]);

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
