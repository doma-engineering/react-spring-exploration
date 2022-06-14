import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currentTable } from "../../Atoms/CandidateTables";
import { filters, savedUrlFilters, urlFilters } from "../../Atoms/Filters";
import { tables as allTables, tablesSettings, tablesSettingsURL } from "../../Atoms/LoadData";
import { currentPath } from "../../Atoms/Login";
import { comeChanges } from "../../Atoms/SwithersAtoms";
import CandidateTablePage from "../../Pages/CandidatesTablePage";
import Error404Page from "../../Pages/Error404Page";
import { CANDIDATE_TABLE_SWITCH_MODE_URL, CANDIDATE_TABLE_URL } from "../../routes";
import { defaultFilterParams } from "../../Atoms/mocks/fakeData";

const CandidateTableValidator = () => {

  const navigate = useNavigate();
  const { CandidateTable } = useParams();

  const [, setCurrentTable] = useAtom(currentTable);
  const [tables] = useAtom(allTables);
  const [filter, setFilters] = useAtom(filters);
  const [urlFilter] = useAtom(urlFilters);
  const [, setSavedUrlFilter] = useAtom(savedUrlFilters);
  const [, setCurrentPath] = useAtom(currentPath);
  const [, setComeChange] = useAtom(comeChanges);
  const [url] = useAtom(tablesSettingsURL);
  const [, setTablesSettings] = useAtom(tablesSettings);

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

    // for always display filter properties in URL!
    setFilters([...filter]);
  }

  useEffect(() => {

  }, []);

  useEffect(() => {
    const foundTable = tables?.find((t) => t.id.toLowerCase() === (CandidateTable?.toLowerCase() ?? "")) ?? { id: "", displayName: "Error!", table: [] };
    if (foundTable.id.toLowerCase() === (CandidateTable?.toLowerCase() ?? "").toLowerCase()) {

      if (foundTable.id !== CandidateTable) {
        navigate(CANDIDATE_TABLE_URL(foundTable.id));
        return;
      }

      updateFilters(foundTable.id);
      setCurrentTable(foundTable);
      setReturnPage(<CandidateTablePage />);
      setCurrentPath(CANDIDATE_TABLE_URL(foundTable.id));
      return;
    }

    setReturnPage(<Error404Page />);
  } // eslint-disable-next-line react-hooks/exhaustive-deps
    , [CandidateTable]);

  useEffect(() => {
    if (
      (urlFilter.length > 0)
      // && (urlFilter !== filter)
      && (!urlFilter.reduce((answer, filterItem, index) => (
        answer
        && filterItem.tableID === filter[index].tableID
        && filterItem.tableFilters.toString() === filter[index].tableFilters.toString()
      ), true))
    ) {
      setComeChange(true);
      setSavedUrlFilter([...urlFilter]);
      navigate(CANDIDATE_TABLE_SWITCH_MODE_URL(CandidateTable || ""));
      return;
    }
    setTablesSettings(url);
  } // eslint-disable-next-line react-hooks/exhaustive-deps
    , [url]);

  return (returnPage);
}

export default CandidateTableValidator;