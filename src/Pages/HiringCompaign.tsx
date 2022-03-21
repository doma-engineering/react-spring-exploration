import { atom, useAtom } from "jotai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { candidatesData } from "../Components/CandidateTable/candidateTableAtoms";
import { tableData } from "../Components/CandidateTable/Table";
import { filterLink } from "./CandidatesTable";
import Updater from "./Updater";

const resultsAtom = atom(
  (get) => (
    {
      pending: get(tableData).length,
      filtred: get(candidatesData).length - get(tableData).length,
      total: get(candidatesData).length,
    }
  ),
);

const HiringCompaign = () => {
  const [candidatesResult] = useAtom(resultsAtom);
  const [filter] = useAtom(filterLink);
  const { CompanyName } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Updater />
      <h1> {CompanyName} </h1>
      <h1> Hiring compaigns </h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Specialization</th>
            <th>Pending</th>
            <th>Filtred</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            onClick={() => navigate("/CandidateTables/Pyton" + filter)}
          >
            <td>Python</td>
            <td> {candidatesResult.pending} </td>
            <td> {candidatesResult.filtred} </td>
            <td> {candidatesResult.total} </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HiringCompaign;

const styles = {
  table: {
    background: "#A0A0C0",
    borders: "1px solid rgb(36, 34, 34)"
  },
};