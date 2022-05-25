import { useAtom } from "jotai"
import { useEffect, useState } from "react";
import { currentCompany } from "../../Atoms/Company";
import { filters, urlFilters } from "../../Atoms/Filters";
import { tables as allTables } from "../../Atoms/LoadData"
import { selectedType, switcherMouseHoverTable, switcherSelectedTable } from "../../Atoms/SwithersAtoms";
import { CandidateTableFilters, Company, TableResult, TablesResult } from "../CandidateTable/candidateTableTypes";
import { defaultFilterParams } from "../../Atoms/fakeData";
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

  const getTextColor = (props: {
    isDifference: boolean,
    isOld: boolean,
    isSingle?: boolean,
  }) => {
    if (props.isSingle) return styles.colors.textWithoutDiference;
    if (!props.isDifference) return styles.colors.textDifferenceDefault;
    if (props.isOld) return styles.colors.textDifferenceOld;
    return styles.colors.textDifferenceNew;
  }

  const renderCell = (props: {
    content: string,
    key: string,
    isDifference: boolean,
    isOld: boolean,
    isSingle?: boolean,
  }) => (
    <td
      key={props.key}
      style={{
        ...styles.tdTh,
        textAlign: "center",
        color: getTextColor({
          isDifference: props.isDifference,
          isOld: props.isOld,
          isSingle: props.isSingle
        })
      }}
    >
      {props.content}
    </td>
  )

  const renderRowWithoutDiference = (
    rowOfTable: TableResult,
  ) => (
    <>
      <tr
        key={rowOfTable.tableID + "old"}
        onClick={() => hasClickedOld()}
        style={{
          background: styles.colors.rowWithoutDifference,
        }}
      >

        {renderCell({
          content: displayName(rowOfTable.tableID),
          key: `${rowOfTable.tableID}_name_old`,
          isOld: true,
          isDifference: false,
          isSingle: true,
        })}
        {renderCell({
          content: `${rowOfTable.pending}`,
          key: `${rowOfTable.tableID}_pend_old`,
          isOld: true,
          isDifference: false,
          isSingle: true,
        })}
        {renderCell({
          content: `${rowOfTable.filtred}`,
          key: `${rowOfTable.tableID}_filt_old`,
          isOld: true,
          isDifference: false,
          isSingle: true,
        })}
        {renderCell({
          content: `${rowOfTable.total}`,
          key: `${rowOfTable.tableID}_totl_old`,
          isOld: true,
          isDifference: false,
          isSingle: true,
        })}

      </tr>
    </>
  )

  const renderRowWithDiference = (
    rowOfTable1: TableResult,
    rowOfTable2: TableResult,
    diference: { any: boolean, pending: boolean, filtred: boolean, total: boolean }
  ) => (
    <>
      <tr
        key={rowOfTable1.tableID + "old"}
        onClick={() => hasClickedOld()}
        onMouseEnter={() => setMouseHover(selectedType.old)}
        onMouseLeave={() => setMouseHover(selectedType.none)}
        style={{
          background:
            mouseHover === selectedType.old ? styles.colors.selectedOld : styles.colors.rowWithDifferenceDefault
        }}
      >

        {renderCell({
          content: displayName(rowOfTable1.tableID),
          key: `${rowOfTable1.tableID}_name_old`,
          isOld: true,
          isDifference: false,
        })}
        {renderCell({
          content: `${rowOfTable1.pending}`,
          key: `${rowOfTable1.tableID}_pend_old`,
          isOld: true,
          isDifference: diference.pending,
        })}
        {renderCell({
          content: `${rowOfTable1.filtred}`,
          key: `${rowOfTable1.tableID}_filt_old`,
          isOld: true,
          isDifference: diference.filtred,
        })}
        {renderCell({
          content: `${rowOfTable1.total}`,
          key: `${rowOfTable1.tableID}_totl_old`,
          isOld: true,
          isDifference: diference.total,
        })}

      </tr>

      <tr
        key={rowOfTable2.tableID + "new"}
        onClick={() => hasClickedNew()}
        onMouseEnter={() => setMouseHover(selectedType.new)}
        onMouseLeave={() => setMouseHover(selectedType.none)}
        style={{
          background: (mouseHover === selectedType.new) ? styles.colors.selectedNew : styles.colors.rowWithDifferenceDefault
        }}
      >

        {renderCell({
          content: displayName(rowOfTable2.tableID),
          key: `${rowOfTable2.tableID}_name_new`,
          isOld: false,
          isDifference: false,
        })}
        {renderCell({
          content: `${rowOfTable2.pending}`,
          key: `${rowOfTable2.tableID}_pend_new`,
          isOld: false,
          isDifference: diference.pending,
        })}
        {renderCell({
          content: `${rowOfTable2.filtred}`,
          key: `${rowOfTable2.tableID}_filt_new`,
          isOld: false,
          isDifference: diference.filtred,
        })}
        {renderCell({
          content: `${rowOfTable2.total}`,
          key: `${rowOfTable2.tableID}_totl_new`,
          isOld: false,
          isDifference: diference.total,
        })}

      </tr>
    </>
  )

  const renderRow = (rowOfTable1: TableResult, rowOfTable2: TableResult) => {

    const difference = {
      pending: rowOfTable1.pending !== rowOfTable2.pending,
      filtred: rowOfTable1.filtred !== rowOfTable2.filtred,
      total: rowOfTable1.total !== rowOfTable2.total,
    }

    const haveDifference: boolean =
      difference.filtred || difference.pending || difference.total;

    if (!haveDifference)
      return (renderRowWithoutDiference(rowOfTable1))
    return (
      renderRowWithDiference(
        rowOfTable1,
        rowOfTable2,
        { any: haveDifference, ...difference }
      )
    )
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

  return (
    <table
      className="HiringCompaignsCompare"
      style={{ ...styles.table, borderCollapse: "collapse", }}
    >
      <thead>
        <tr>
          <th key={"HSpecialization"} style={{ ...styles.tdTh, width: "15rem", }}>
            Specialization
          </th>
          <th key={"HPending"} style={styles.tdTh}>
            Pending
          </th>
          <th key={"Hfiltred"} style={styles.tdTh}>
            Filtred
          </th>
          <th key={"Htotal"} style={styles.tdTh}>
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {
          oldTable.map((row, index) =>
            renderRow(row, newTable[index])
          )
        }
      </tbody>
    </table>
  );
}

export default SwitcherTables;

const styles = {
  colors: {
    selectedOld: "#DDAAAA",
    selectedNew: "#AADDAA",
    rowWithDifferenceDefault: "#CCCCCC",
    rowWithoutDifference: "#CCCCCC",
    textDifferenceNew: "#058005",
    textDifferenceOld: "#F02222",
    textDifferenceDefault: "#000000",
    textWithoutDiference: "#777777",
  },
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