import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import Filter from "../Components/CandidateTable/Filter";
import Table from "../Components/CandidateTable/Table";
import DisplayUser from "../Components/Login/DisplayUser";
import { loginedCompany } from "../Atoms/Login";
import { comeChanges } from "../Atoms/LoadData";
import AcceptLine from "../Components/Validators/AcceptLine";

const CandidateTablePage = () => {
  const [name] = useAtom(loginedCompany);
  const [isChanged] = useAtom(comeChanges);

  return (
    <div>
      <DisplayUser />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {isChanged ? <AcceptLine /> : <></>}
        <Link
          style={{ color: "#0303AF", fontSize: "large" }}
          to={`/Companies/${name}/Campaigns`}
        >
          Back to all compaigns
        </Link>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <Filter />
          <Table />
        </div>
      </div>
    </div>
  );
}


export default CandidateTablePage;