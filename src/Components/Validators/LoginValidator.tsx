import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { currentPath } from "../../Atoms/Login";
import LoginPage from "../../Pages/LoginPage";
import { LOGIN_URL } from "../../routes";

const LoginValidator = () => {
  const [, setPath] = useAtom(currentPath);
  const [returnPage, ] = useState(<LoginPage />);
  useEffect(() => {
    setPath(LOGIN_URL);
  },[])
  return (returnPage);
}
export default LoginValidator;