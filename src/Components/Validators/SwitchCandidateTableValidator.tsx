import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentTable } from "../../Atoms/CandidateTables";
import { filters, savedUrlFilters, urlFilters } from "../../Atoms/Filters";
import { comeChanges, selectedType, switcherMouseHoverTable, switcherSelectedTable } from "../../Atoms/SwithersAtoms";
import ErrorSwitherCandidateTable from "../../Pages/ErrorSwitcherCandidateTable";
import CandidateTableSwitcherPage from "../../Pages/SwitcherCandidateTable";
import { CANDIDATE_TABLE_URL } from "../../routes";

const CandidateTableSwitcherValidator = () => {

  const navigate = useNavigate();

  const [page, setPage] = useState(<CandidateTableSwitcherPage />);

  const [selected, setSelected] = useAtom(switcherSelectedTable);
  const [, setMousehover] = useAtom(switcherMouseHoverTable);
  const [oldFilter, setFilters] = useAtom(filters);
  const [newFilter] = useAtom(savedUrlFilters);
  const [table] = useAtom(currentTable);
  const [, setComeChange] = useAtom(comeChanges);

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
  }, [newFilter, oldFilter]);

  useEffect(() => {
    if (selected !== selectedType.none) {
      if (selected === selectedType.new) setFilters([...newFilter]);
      if (selected === selectedType.old) setFilters([...oldFilter]);
      setSelected(selectedType.none);
      setMousehover(selectedType.none);
      setComeChange(false);
      navigate(CANDIDATE_TABLE_URL(table.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (page);
}

export default CandidateTableSwitcherValidator;