import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { filterToLinkData } from "../../Pages/CandidatesTable";
import { candidateCount, candidatesData, filterData } from "./candidateTableAtoms";
import { fakeCandidatesData } from "./fakeData";

const AddCandidateButton = () => {

  const [count, setCount] = useAtom(candidateCount);
  const [, setCandidates] = useAtom(candidatesData);
  const navigate = useNavigate();
  const [filter] = useAtom(filterData);

  const addCondidate = () => {
    setCount(count + 1);
    setCandidates(fakeCandidatesData.slice(0, count + 1));
  }

  return (
    <button className="AddCandidateButton" onClick={() => { addCondidate(); navigate("/CandidateTables/Pyton" + filterToLinkData(filter, count + 1)); }}>Add candidate</button>
  );
}

export default AddCandidateButton;
