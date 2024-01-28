const useValidation = () => {
  const passwordReg =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|\W)(?!.*\s)(?!.*[0123456789])(?!.*(0123|1234|2345|3456|4567|5678|6789))(?!.*(9876|8765|7654|6543|5432|4321|3210))(?!.*(qwerty|asdfgh|zxcvbn|password|admin))(?!.*([a-zA-Z]).\1).{10,}$/;

  const validatePassword = (password: string) => {
    if (password === "") {
      return "비밀번호를 입력해주세요";
    } else if (!passwordReg.test(password)) {
      return "10자리 이상 영어대문자,소문자,숫자,특수문자2종류 문자조합으로 이루어진비밀번호";
    }
  };
  return {
    validatePassword,
  };
};

export default useValidation;
