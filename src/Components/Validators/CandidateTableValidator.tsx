import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currentTable } from "../../Atoms/CandidateTables";
import { filters, urlFilters } from "../../Atoms/Filters";
import { tables as allTables } from "../../Atoms/LoadData";
import { currentPath } from "../../Atoms/Login";
import { comeChanges } from "../../Atoms/SwithersAtoms";
import CandidateTablePage from "../../Pages/CandidatesTablePage";
import Error404Page from "../../Pages/Error404Page";
import { CANDIDATE_TABLE_SWITCH_MODE_URL, CANDIDATE_TABLE_URL } from "../../routes";
import { defaultFilterParams } from "../CandidateTable/fakeData";

const CandidateTableValidator = () => {

  const navigate = useNavigate();
  const { CandidateTable } = useParams();

  const [, setCurrentTable] = useAtom(currentTable);
  const [tables] = useAtom(allTables);
  const [filter, setFilters] = useAtom(filters);
  const [urlFilter] = useAtom(urlFilters);
  const [, setCurrentPath] = useAtom(currentPath);
  const [, setComeChange] = useAtom(comeChanges);

  const [returnPage, setReturnPage] = useState(<></>);

  const updateFilters = (tableID: string) => {

    if (!filter.map((filter) => filter.tableID)
      .includes(tableID)
    ) {
      setFilters([
        ...filter,
        { tableID, tableFilters: defaultFilterParams }
      ]);
      return;
    }

    // for always display filter propertys in URL!
    setFilters([...filter]);
  }

  useEffect(() => {
    const findedTable = tables?.find((t) => t.id.toLowerCase() === (CandidateTable?.toLowerCase() ?? "")) ?? { id: "", displayName: "Error!", table: [] };
    if (findedTable.id.toLowerCase() === (CandidateTable?.toLowerCase() ?? "").toLowerCase()) {

      if (findedTable.id !== CandidateTable) {
        navigate(CANDIDATE_TABLE_URL(findedTable.id));
        return;
      }

      updateFilters(findedTable.id);
      setCurrentTable(findedTable);
      setReturnPage(<CandidateTablePage />);
      setCurrentPath(CANDIDATE_TABLE_URL(findedTable.id));
      return;
    }

    setReturnPage(<Error404Page />);
  }
    , [CandidateTable]);

  useEffect(() => {
    if (
      (urlFilter.length > 0)
      // && (urlFilter !== filter)
      && (!urlFilter.reduce((answ, filtr, index) => (
        answ
        && filtr.tableID === filter[index].tableID
        && filtr.tableFilters.toString() === filter[index].tableFilters.toString()
      ), true))
    ) {
      setComeChange(true);
      navigate(CANDIDATE_TABLE_SWITCH_MODE_URL(CandidateTable || ""));
      return;
    }
  }
    , [urlFilter]);

  return (returnPage);
}

export default CandidateTableValidator;