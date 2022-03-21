import { atom, useAtom } from "jotai";
import { Link, useParams } from "react-router-dom";
import { candidateCount, filterData } from "../Components/CandidateTable/candidateTableAtoms";
import { rank } from "../Components/CandidateTable/candidateTableTypes";
import { companyName } from "../Router";
import TestCandidateTable from "../TestCandidateTable";
import Updater from "./Updater";

export const filterToLinkData = (filterData: rank[], count: number) => (
  "/Filter:" + filterData.reduce((text, rank) => (text = text + (rank.isSelected ? "T" : "F")), "") + `:${count}`
)

export const filterLink = atom(
  (get) => filterToLinkData(get(filterData), get(candidateCount)),
  (get, set, str: string) => {
    const newSelected = str.substring(7).split('').map((char) => (char === "T" ? true : false));
    const newFilter: rank[] = get(filterData).map(
      (item, index) => {
        item.isSelected = newSelected[index];
        return item;
      }
    );
    set(filterData, newFilter)
  }
);

const CandidateTable = () => {
  const [name] = useAtom(companyName);
  const [filter] = useAtom(filterLink);

  return (
    <div>
      <Updater />
      <h1>
        <Link
          style={{ color: "#0303AF" }}
          to={"/Compaigns" + name + filter}
        >
          BackToAll
        </Link>
      </h1>
      <TestCandidateTable />
    </div>
  );
}

export default CandidateTable