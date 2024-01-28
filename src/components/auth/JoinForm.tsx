import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useValidation from "./useValidation";

export interface initialValuesForm {
  email: string;
  password: string;
}

export const initialValues: initialValuesForm = {
  email: "",
  password: "",
};

const JoinForm = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<initialValuesForm>(initialValues);
  const { validatePassword } = useValidation();
  const handleChange = (key: string, value: string | number) => {
    setValues({ ...values, [key]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordValidationResult = validatePassword(values.password);
    if (passwordValidationResult) {
      alert(passwordValidationResult);
      return;
    }
  };

  const Signup = async () => {
    await createUserWithEmailAndPassword(auth, values.email, values.password);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        이 메 일:
        <input
          style={{ border: "solid" }}
          value={values.email}
          type="email"
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <br />
        패스워드:
        <input
          style={{ border: "solid" }}
          value={values.password}
          type="password"
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <button style={{ border: "solid" }} onClick={Signup}>
          Join
        </button>
        <button onClick={() => navigate("/login")}>Join 으로</button>
      </form>
    </>
  );
};

export default JoinForm;
