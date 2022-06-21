import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentPath, loggedInCompany } from "../../Atoms/Login";
import LoginValidator from "./LoginValidator";

const RootValidator = () => {
  
  const navigate = useNavigate();

  const [lastOpenedTab] = useAtom(currentPath);
  const [company] = useAtom(loggedInCompany);

  const [returnPage] = useState(<LoginValidator />);

  useEffect(() => {
    if(company.isLoggedIn){
      navigate(lastOpenedTab);
    }
  }, []);

  return (returnPage);
}

export default RootValidator;