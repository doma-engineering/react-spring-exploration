import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { filters, urlFilters } from "../../Atoms/Filters";
import ErrorSwitherCandidateTable from "../../Pages/ErrorSwitcherCandidateTable";
import CandidateTableSwitcherPage from "../../Pages/SwitcherCandidateTable";

const CandidateTableSwitcherValidator = () => {

  const [page, setPage] = useState(<CandidateTableSwitcherPage />);

  const [oldFilter, setFilters] = useAtom(filters);
  const [newFilter] = useAtom(urlFilters);

  useEffect(() => {
    if (
      //Check is newFilter === oldFilter
      newFilter.reduce((ans, filtr, index) => (
        ans
        && filtr.tableID === oldFilter[index].tableID
        && filtr.tableFilters.toString() === oldFilter[index].tableFilters.toString()
      ), true)
    ) {
      setPage(ErrorSwitherCandidateTable);
    }
  }, [newFilter, oldFilter])

  return (page);
}

export default CandidateTableSwitcherValidator;