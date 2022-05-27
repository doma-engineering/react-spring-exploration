import { atom, useAtom } from "jotai"
import { currentCompany } from "../../Atoms/Company";
import { filters, savedUrlFilters } from "../../Atoms/Filters";
import { tables as allTables } from "../../Atoms/LoadData"
import { selectedType, switcherMouseHoverTable } from "../../Atoms/SwithersAtoms";

import { findResult } from "../Validators/HiringCampaignsValidator";

type ChangingTableResult = {
  tableID: string,
  tableName: string,
  switchStatus: tableSwitchStatus,
  pendingOld: number,
  pendingNew: number,
  filtredOld: number,
  filtredNew: number,
  total: number,
}

enum tableSwitchStatus {
  changed = "changed",
  notChanged = "not changed",
}

const tableData = atom(
  (get) => (
    get(currentCompany).tables
      .map(
        (tableID) => (
          get(allTables).find((table) => table.id === tableID)!
        )
      )
      .map(
        (table): ChangingTableResult => {
          const resultOld = findResult(
            table,
            (get(filters).find((filter) => filter.tableID === table.id)?.tableFilters)!
          )
          const resultNew = findResult(
            table,
            (get(savedUrlFilters).find((filter) => filter.tableID === table.id)?.tableFilters)!
          )

          const haveUpdates = resultNew.filtred !== resultOld.filtred;
          const switchStatus = haveUpdates ? tableSwitchStatus.changed : tableSwitchStatus.notChanged;

          return {
            tableID: table.id,
            tableName: table.displayName,
            switchStatus: switchStatus,
            pendingOld: resultOld.pending,
            pendingNew: resultNew.pending,
            filtredOld: resultOld.filtred,
            filtredNew: resultNew.filtred,
            total: resultNew.total,
          }
        }
      )
  ),
);

const SwitcherTables = () => {

  const [table] = useAtom(tableData);
  const [mouseHoverVersion] = useAtom(switcherMouseHoverTable);

  const tdChangable = (oldData: number, newData: number, switchStatus: tableSwitchStatus) => {

    const isSelected =
      mouseHoverVersion !== selectedType.none
      && switchStatus === tableSwitchStatus.changed

    const firstDisplayedNumber = mouseHoverVersion === selectedType.new ? newData : oldData

    const isSecondNumber =
      mouseHoverVersion === selectedType.none
      && switchStatus === tableSwitchStatus.changed

    return (
      <td className={isSelected ? "text-green-300" : ""}>
        {firstDisplayedNumber}
        <span className={isSecondNumber ? "" : "hidden"}> &#10240;⇾&#10240;
          {newData}
        </span>
      </td>
    );
  }

  return (
    <div className="tableDiv">
      <table
        className="HiringCompaignsCompare"
      >
        <thead>
          <tr>
            <th> Specialization </th>
            <th> Pending        </th>
            <th> Filtred        </th>
            <th> Total          </th>
          </tr>
        </thead>
        <tbody>
          {
            table.map(row =>
              <tr key={row.tableID}>
                <td>
                  {row.tableName}
                </td>
                {
                  tdChangable(row.pendingOld, row.pendingNew, row.switchStatus)
                }
                {
                  tdChangable(row.filtredOld, row.filtredNew, row.switchStatus)
                }
                <td>
                  {row.total}
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default SwitcherTables;