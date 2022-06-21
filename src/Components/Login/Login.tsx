import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentCompany } from "../../Atoms/Company";
import { companies } from "../../Atoms/LoadData";
import { loggedInCompany, loginInputString, pressedEnterButton } from "../../Atoms/Login";
import { HIRING_CAMPAIGNS_URL } from "../../routes";

const Login = () => {
  const navigate = useNavigate();
  const [logStr, setLogin] = useAtom(loginInputString);
  const [,setLoggedInCompany] = useAtom(loggedInCompany);
  const [,setCurrentCompany] = useAtom(currentCompany); 
  const [allCompanies] = useAtom(companies);
  const [pressedEnter, setPressedEnter] = useAtom(pressedEnterButton);

  const [errorMessage, setErrorMessage] = useState("");

  const tryToEnter = () => {
    const company = allCompanies.find((company) => company.displayName.toLowerCase() === logStr.toLowerCase());
    if(company){
      setCurrentCompany(company);
      setLoggedInCompany({companyId: company.id, isLoggedIn: true});
      navigate(HIRING_CAMPAIGNS_URL(company.id));
    }
    if(logStr !== "")
      setErrorMessage("That company don't exist");
  }
  
  const checkPressedButton = (e: any) => {
    setErrorMessage("");
    if (e.key === 'Enter') {
      tryToEnter()
    }
  }

  useEffect(() => {
    if (pressedEnter) {
      tryToEnter()
      setPressedEnter(false);
    }
  }// eslint-disable-next-line react-hooks/exhaustive-deps  
    , [pressedEnter]);

  return (
    <div>
      <div className="flex items-center text-stone-200 ">
        <span className="mr-2">Login as:</span>
        <input
          className="bg-slate-900 p-1 px-2"
          type="text"
          onChange={(e) => setLogin(e.target.value)}
          onKeyDown={checkPressedButton}
          defaultValue={`${logStr}`}
        />
      </div>
      <div className="absolute text-red-900">
        {errorMessage}
      </div>
    </div>
  );
}

export default Login;