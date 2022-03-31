import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { tablesResult } from "../../Atoms/HiringCompaign";
import { tables as allTables } from "../../Atoms/LoadData";

const HiringCampaigns = () => {
  const [hiringsRows] = useAtom(tablesResult);
  const [tables] = useAtom(allTables);
  const navigate = useNavigate();

  const runException = () => {
    throw "Dont find table!"
  }

  const hasClicked = (openTableByID: string) => {
    navigate(`/CandidateTables/${openTableByID}`);
  }

  const displayName = (id: string): string => {
    return tables.find((table) => table.id === id)?.displayName ?? runException();
  }

  return (
    <div>
      <table style={{ ...styles.table, borderCollapse: "collapse", }}>
        <thead>
          <tr>
            <th style={styles.tdTh}>Specialization</th>
            <th style={styles.tdTh}>Pending</th>
            <th style={styles.tdTh}>Filtred</th>
            <th style={styles.tdTh}>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            hiringsRows.map((row) =>
              <tr
                key={row.tableID}
                onClick={() => hasClicked(row.tableID)}
              >
                <td style={{ ...styles.tdTh, textAlign: "center", }}> {displayName(row.tableID)} </td>
                <td style={{ ...styles.tdTh, textAlign: "center", }}> {row.pending} </td>
                <td style={{ ...styles.tdTh, textAlign: "center", }}> {row.filtred} </td>
                <td style={{ ...styles.tdTh, textAlign: "center", }}> {row.total} </td>
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