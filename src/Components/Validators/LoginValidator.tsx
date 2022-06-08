import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentPath, loginedCompany } from "../../Atoms/Login";
import LoginPage from "../../Pages/LoginPage";
import { LOGIN_URL } from "../../routes";

const LoginValidator = () => {
  const navigate = useNavigate();
  const [loginedCompanyID] = useAtom(loginedCompany);
  const [path] = useAtom(currentPath);
  const [returnPage, setReturnPage] = useState(<></>);

  useEffect(() => {
    //try to redirect to previus logined open page;
    if (loginedCompanyID !== "") {
      if (path !== LOGIN_URL)
        navigate(path);
    }
    setReturnPage(<LoginPage />);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginedCompanyID]);

  return (returnPage);
}
export default LoginValidator;