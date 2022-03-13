import "./Components/CandidateTable/candidateTable.css";

import Table from "./Components/CandidateTable/Table";
import Filter from "./Components/CandidateTable/Filter";
import AddCandidateButton from "./Components/CandidateTable/NewCandidateButton";

const TestCandidateTable = () => {
  return (
    <div className="TestCandidateTable">
      <Filter />
      <div className="CandidateListRow">
        <AddCandidateButton />
        <Table />
      </div>
    </div>
  );
}

export default TestCandidateTable;
