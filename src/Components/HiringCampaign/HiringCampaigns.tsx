import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { tablesResult } from "../../Atoms/HiringCampaign";
import { tables as allTables } from "../../Atoms/LoadData";
import { CANDIDATE_TABLE_URL } from "../../routes";

const HiringCampaigns = () => {
  const [hiringRows] = useAtom(tablesResult);
  const [tables] = useAtom(allTables);
  const navigate = useNavigate();

  const hasClicked = (openTableByID: string) => {
    navigate(CANDIDATE_TABLE_URL(openTableByID));
  }

  const displayName = (id: string): string => {
    return tables.find((table) => table.id === id)?.displayName || "Table dont found";
  }

  return (
    <div className="tableDiv">
      <table>
        <thead>
          <tr>
            <th>Specialization</th>
            <th>Pending</th>
            <th>Filtered</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            hiringRows.map((row) =>
              <tr
                className="hover:bg-gray-800"
                key={row.tableID}
                onClick={() => hasClicked(row.tableID)}
              >
                <td> {displayName(row.tableID)} </td>
                <td> {row.pending} </td>
                <td> {row.filtered} </td>
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
