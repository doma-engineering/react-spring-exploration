import "./Components/CandidateTable/candidateTable.css";

import Table from "./Components/CandidateTable/Table";
import Filter from "./Components/CandidateTable/Filter";

// TODO return functionalyty for this file
// for that need only load fake data to currentTableAtom

const TestCandidateTable = () => {
  return (
    <div className="TestCandidateTable">
      <Filter />
      <div className="CandidateListRow">
        <Table />
      </div>
    </div>
  );
}

export default TestCandidateTable;
