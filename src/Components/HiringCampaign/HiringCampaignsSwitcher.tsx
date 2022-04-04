import { useAtom } from "jotai"
import { useEffect, useState } from "react";
import { currentCompany } from "../../Atoms/Company";
import { filters, urlFilters } from "../../Atoms/Filters";
import { selectedType, switcherMouseHoverTable, switcherSelectedTable } from "../../Atoms/HiringCompaign";
import { tables as allTables } from "../../Atoms/LoadData"
import { CandidateTableFilters, Company, TablesResult } from "../CandidateTable/candidateTableTypes";
import { defaultFilterParams } from "../CandidateTable/fakeData";
import { findResult } from "../Validators/HiringCampaignsValidator";


const SwitcherTables = () => {

  const [tables] = useAtom(allTables);
  const [company] = useAtom(currentCompany);
  const [oldFilter] = useAtom(filters);
  const [newFilter] = useAtom(urlFilters);
  const [, setSelected] = useAtom(switcherSelectedTable);
  const [mouseHover, setMouseHover] = useAtom(switcherMouseHoverTable);

  const [oldTable, setOldTable] = useState<TablesResult>([]);
  const [newTable, setNewTable] = useState<TablesResult>([]);

  const getHiringTablesResult = (company: Company, tfilters: CandidateTableFilters[]): TablesResult => {
    return (
      company.tables.map(
        (tableID) => {
          const tableData = tables?.find((table) => table.id === tableID) ?? (() => { throw "error find Table"; })();
          const filterData: boolean[] = tfilters?.find((filter: CandidateTableFilters) => filter.tableID === tableID)?.tableFilters ?? defaultFilterParams;
          return findResult(tableData, filterData);
        }
      )
    );
  }

  const hasClickedOld = () => {
    setSelected(selectedType.old);
  }

  const hasClickedNew = () => {
    setSelected(selectedType.new);
  }

  const displayName = (id: string): string => {
    return tables.find((table) => table.id === id)?.displayName ?? 'Error finding';
  }

  useEffect(() => {
    setNewTable(
      getHiringTablesResult(company, newFilter)
    );
    setOldTable(
      getHiringTablesResult(company, oldFilter)
    );
  }
    , []);

  //TODO: each cell five uniq key
  //TODO style 
  return (
    <table style={{ ...styles.table, borderCollapse: "collapse", }}>
      <thead>
        <tr>
          <th style={{ ...styles.tdTh, width: "15rem", }}>Specialization</th>
          <th style={styles.tdTh}>Pending</th>
          <th style={styles.tdTh}>Filtred</th>
          <th style={styles.tdTh}>Total</th>
        </tr>
      </thead>
      <tbody>
        {
          oldTable.map((row, index) =>
            <>
              <tr
                key={row.tableID + "old"}
                onClick={() => hasClickedOld()}
                onMouseEnter={() => setMouseHover(selectedType.old)}
                onMouseLeave={() => setMouseHover(selectedType.none)}
                style={{
                  background: mouseHover === selectedType.old ? "#DDAAAA" : "#EEEEEE"
                }}
              >
                <td style={{ ...styles.tdTh, textAlign: "center", }}> {displayName(row.tableID)} </td>
                <td style={{ ...styles.tdTh, textAlign: "center", }}> {row.pending} </td>
                <td style={{ ...styles.tdTh, textAlign: "center", }}> {row.filtred} </td>
                <td style={{ ...styles.tdTh, textAlign: "center", }}> {row.total} </td>

              </tr>

              <tr
                key={row.tableID + "new"}
                onClick={() => hasClickedNew()}
                onMouseEnter={() => setMouseHover(selectedType.new)}
                onMouseLeave={() => setMouseHover(selectedType.none)}
                style={{
                  background: mouseHover === selectedType.new ? "#AADDAA" : "#EEEEEE"
                }}
              >
                <td style={{ ...styles.tdTh, textAlign: "center", }}> {displayName(newTable[index].tableID)} </td>
                <td style={{ ...styles.tdTh, textAlign: "center", }}> {newTable[index].pending} </td>
                <td style={{ ...styles.tdTh, textAlign: "center", }}> {newTable[index].filtred} </td>
                <td style={{ ...styles.tdTh, textAlign: "center", }}> {newTable[index].total} </td>
              </tr>
            </>
          )
        }
      </tbody>
    </table>
  );
}

export default SwitcherTables;

const styles = {
  table: {
    background: "#A0A0C0",
    borders: "1px solid rgb(36, 34, 34)",
    width: "50rem",
    border: "1px solid rgb(36, 34, 34)",
  },
  tdTh: {
    border: "1px solid rgb(36, 34, 34)",
    width: "10rem",
  }
};