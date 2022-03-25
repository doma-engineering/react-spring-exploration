import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";
import { currentCompany } from "../../Atoms/Company";
import { companies } from "../../Atoms/LoadData";
import { loginInputString } from "../../Atoms/Login";

const TryToEnter = () => {
  const [login] = useAtom(loginInputString);
  const [allCompanies] = useAtom(companies);

  const company = allCompanies.find(c => c.displayName.toLowerCase() === login.toLowerCase())?.id ?? login;

  return (
    <Navigate to={`/Companies/${company}/Campaigns`} />
  );
}

export default TryToEnter;