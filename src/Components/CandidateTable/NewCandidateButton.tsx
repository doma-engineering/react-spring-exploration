import { useAtom } from "jotai";
import { candidateCount, candidatesData } from "./candidateTableAtoms";
import { fakeCandidatesData } from "./fakeData";

const AddCandidateButton = () => {

  const [count, setCount] = useAtom(candidateCount);
  const [, setCandidates] = useAtom(candidatesData)

  const addCandidate = () => {
    setCount(count + 1);
    setCandidates(fakeCandidatesData.slice(0, count));
  }

  return (
    <button className="AddCandidateButton" onClick={addCandidate}>
      Add candidate
    </button>
  );
}

export default AddCandidateButton;
