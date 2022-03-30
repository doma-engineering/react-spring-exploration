import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentPath, loginedCompany } from "../../Atoms/Login";
import LoginPage from "../../Pages/LoginPage";

const LoginValidator = () => {
  const navigate = useNavigate();
  const [loginedCompanyName] = useAtom(loginedCompany);
  const [path, setPath] = useAtom(currentPath);
  const [returnPage, setReturnPage] = useState(<></>);


  useEffect(() => {
    //try to redirect to previus logined open page;
    if (loginedCompanyName !== "") {
      if ((path.indexOf("/Companies/") !== -1) && (path.indexOf("/Campaigns") !== -1))
        navigate(`/Companies/${loginedCompanyName}/Campaigns`);
      if (path.indexOf("/CandidateTables/") !== -1)
        navigate(`/CandidateTables/${path.substring(17, path.length)}`);
    }
    setReturnPage(<LoginPage />);
    setPath("/Login");
  },
    [loginedCompanyName]);

  return (returnPage);
}
export default LoginValidator;