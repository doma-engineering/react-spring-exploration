import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentPath, loginedCompany } from "../../Atoms/Login";
import LoginPage from "../../Pages/LoginPage";
import { LOGIN_URL } from "../../routes";

const LoginValidator = () => {
  const navigate = useNavigate();
  const [loginedCompanyID] = useAtom(loginedCompany);
  const [path, setPath] = useAtom(currentPath);
  const [returnPage, setReturnPage] = useState(<></>);


  useEffect(() => {
    //try to redirect to previus logined open page;
    if (loginedCompanyID !== "") {
      if ((path.indexOf("/Companies/") !== -1) && (path.indexOf("/Campaigns") !== -1)) //TODO: think what will if path will changes? How we can fix it?
        navigate(path);
      if (path.indexOf("/CandidateTables/") !== -1)
        navigate(path);
    }
    setReturnPage(<LoginPage />);
    setPath(LOGIN_URL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginedCompanyID]);

  return (returnPage);
}
export default LoginValidator;