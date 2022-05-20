import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { tablesResult } from "../../Atoms/HiringCompaign";
import { tables as allTables } from "../../Atoms/LoadData";
import { CANDIDATE_TABLE_URL } from "../../routes";

const HiringCampaigns = () => {
  const [hiringsRows] = useAtom(tablesResult);
  const [tables] = useAtom(allTables);
  const navigate = useNavigate();

  const runException = () => {
    throw "Dont find table!"
  }

  const hasClicked = (openTableByID: string) => {
    navigate(CANDIDATE_TABLE_URL(openTableByID));
  }

  const displayName = (id: string): string => {
    return tables.find((table) => table.id === id)?.displayName ?? runException();
  }

  return (
    <div className="bg-gray-700 p-3 rounded drop-shadow-xl">
      <table>
        <thead>
          <tr>
            <th className="w-40 text-stone-300 text-xl font-medium pb-2 text-center border-b-2 border-slate-800">Specialization</th>
            <th className="w-40 text-stone-300 text-xl font-medium pb-2 text-center border-b-2 border-slate-800">Pending</th>
            <th className="w-40 text-stone-300 text-xl font-medium pb-2 text-center border-b-2 border-slate-800">Filtred</th>
            <th className="w-40 text-stone-300 text-xl font-medium pb-2 text-center border-b-2 border-slate-800">Total</th>
          </tr>
        </thead>
        <tbody>
          {
            hiringsRows.map((row) =>
              <tr
                className="hover:bg-gray-800"
                key={row.tableID}
                onClick={() => hasClicked(row.tableID)}
              >
                <td className="w-40 text-slate-200 text-lg text-center pb-2 text-center border-b-2 border-slate-800"> {displayName(row.tableID)} </td>
                <td className="w-40 text-slate-200 text-lg text-center pb-2 text-center border-b-2 border-slate-800"> {row.pending} </td>
                <td className="w-40 text-slate-200 text-lg text-center pb-2 text-center border-b-2 border-slate-800"> {row.filtred} </td>
                <td className="w-40 text-slate-200 text-lg text-center pb-2 text-center border-b-2 border-slate-800"> {row.total} </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default HiringCampaigns;
