import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import Filter from "../Components/CandidateTable/Filter";
import Table from "../Components/CandidateTable/Table";
import DisplayUser from "../Components/Login/DisplayUser";
import { loginedCompany } from "../Atoms/Login";
import { HIRINGS_COMPAIGNS_URL } from "../routes";

const CandidateTablePage = () => {
  const [name] = useAtom(loginedCompany);
  const navigate = useNavigate();

  return (
    <div>
      <DisplayUser />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <button
          onClick={() => navigate(HIRINGS_COMPAIGNS_URL(name))}
        >
          Back to all compaigns
        </button>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <Filter />
          <Table />
        </div>
      </div>
    </div>
  );
}


export default CandidateTablePage;