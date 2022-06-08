import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentPath, loggedInCompany } from "../../Atoms/Login";
import LoginPage from "../../Pages/LoginPage";
import { LOGIN_URL } from "../../routes";

const LoginValidator = () => {
  const navigate = useNavigate();
  const [loggedIn] = useAtom(loggedInCompany);
  const [path] = useAtom(currentPath);
  const [returnPage, setReturnPage] = useState(<></>);

  useEffect(() => {
    //try to redirect to previous open page;
    if (loggedIn !== "") {
      if (path !== LOGIN_URL)
        navigate(path);
    }
    setReturnPage(<LoginPage />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (returnPage);
}
export default LoginValidator;