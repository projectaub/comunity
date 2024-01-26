import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

interface initialValuesForm {
  email: string;
  password: string;
}

const initialValues: initialValuesForm = {
  email: "",
  password: "",
};

const JoinForm = () => {
  const [values, setValues] = useState<initialValuesForm>(initialValues);

  const handleChange = (key: string, value: string | number) => {
    setValues({ ...values, [key]: value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      </form>
    </>
  );
};

export default JoinForm;
