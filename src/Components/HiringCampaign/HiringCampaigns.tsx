import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { currentTable } from "../../Atoms/CandidateTables";
import { tablesResult } from "../../Atoms/HiringCompaign";
import { tables as allTables } from "../../Atoms/LoadData";

const HiringCampaigns = () => {
  const [hiringsRows] = useAtom(tablesResult);
  const [, updateCurrentTable] = useAtom(currentTable);
  const [tables] = useAtom(allTables);
  const navigate = useNavigate();

  const runException = () => {
    throw "Dont find table!"
  }

  const hasClicked = (openTableByID: string) => {
    // TODO: remove this line.
    // updateCurrentTable(tables?.find((table) => table.id === openTableByID) ?? runException());
    navigate(`/CandidateTables/${openTableByID}`);
  }

  const displayName = (id: string): string => {
    return tables.find((table) => table.id === id)?.displayName ?? runException();
  }

  return (
    <div>
      <table style={{ ...styles.table, borderCollapse: "collapse", }}>
        <thead>
          <tr style={styles.tdTh}>
            <th>Specialization</th>
            <th>Pending</th>
            <th>Filtred</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            hiringsRows.map((row) =>
              <tr
                key={row.tableID}
                onClick={() => hasClicked(row.tableID)}
                style={styles.tdTh}
              >
                <td> {displayName(row.tableID)} </td>
                <td> {row.pending} </td>
                <td> {row.filtred} </td>
                <td> {row.total} </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default HiringCampaigns;

const styles = {
  table: {
    background: "#A0A0C0",
    borders: "1px solid rgb(36, 34, 34)",
    width: "50rem",
    border: "1px solid rgb(36, 34, 34)",
  },
  tdTh: {
    border: "1px solid rgb(36, 34, 34)",
  }
};