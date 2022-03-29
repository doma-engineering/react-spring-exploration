import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import Filter from "../Components/CandidateTable/Filter";
import Table from "../Components/CandidateTable/Table";
import { companyName } from "../Atoms/Company";
import DisplayUser from "../Components/Login/DisplayUser";

const CandidateTablePage = () => {
  const [name] = useAtom(companyName);

  return (
    <div>
      <DisplayUser />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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