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
    <div>
      Current Company Logined as
      <span style={{ fontWeight: "bold" }}> {companyName} </span>
    </div>
  );
}

export default DisplayUser;