import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currentTable } from "../../Atoms/CandidateTables";
import { filters, urlFilters } from "../../Atoms/Filters";
import { tables as allTables } from "../../Atoms/LoadData";
import CandidateTablePage from "../../Pages/CandidatesTablePage";
import Error404Page from "../../Pages/Error404Page";

const CandidateTableValidator = () => {

  const navigate = useNavigate();
  const { CandidateTable } = useParams();

  const [, setCurrentTable] = useAtom(currentTable);
  const [tables] = useAtom(allTables);
  const [filter, setFilters] = useAtom(filters);
  const [urlFilter] = useAtom(urlFilters);

  const [returnPage, setReturnPage] = useState(<></>);

  // TODO: need to fix bug - if load as new window or use link to another table, it loose current logined company.

  useEffect(() => {
    if (urlFilter !== filter) {
      setFilters(urlFilter);
    }
  }
    , [urlFilter]);

  useEffect(() => {
    const findedTable = tables?.find((t) => t.id.toLowerCase() === (CandidateTable?.toLowerCase() ?? "")) ?? { id: "", displayName: "Error!", table: [] };
    if (findedTable.id.toLowerCase() === (CandidateTable?.toLowerCase() ?? "").toLowerCase()) {

      if (findedTable.id !== CandidateTable) {
        navigate(`/CandidateTables/${findedTable.id}`);
        return;
      }

      setFilters([...filter]); // for always display filter propertys in URL!
      setCurrentTable(findedTable);
      setReturnPage(<CandidateTablePage />);
      return;
    }

    setReturnPage(<Error404Page />);
  }
    , [CandidateTable]);

  return (returnPage);
}

export default CandidateTableValidator;