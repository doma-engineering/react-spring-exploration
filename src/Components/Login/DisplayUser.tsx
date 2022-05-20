import { useAtom } from "jotai";
import { companies } from "../../Atoms/LoadData";
import { loginedCompany } from "../../Atoms/Login";

const DisplayUser = () => {
  const [companyID] = useAtom(loginedCompany);
  const [allCompanies] = useAtom(companies);
  const companyName = allCompanies.find(
    (company) => company.id === companyID
  )
    ?.displayName ?? "";
  return (
    <div className="text-gray-100 font-thin m-2">
      Current Company Logined as
      <span className="text-white font-bold"> {companyName} </span>
    </div>
  );
}

export default DisplayUser;