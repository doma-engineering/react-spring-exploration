import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentCompany } from "../../Atoms/Company";
import { filters, savedUrlFilters } from "../../Atoms/Filters";
import { comeChanges, selectedType, switcherMouseHoverTable, switcherSelectedTable } from "../../Atoms/SwithersAtoms";
import ErrorSwitchModePage from "../../Pages/ErrorSwitchModePage";
import SwitcherHiringCampaignsPage from "../../Pages/SwitcherHiringCampaignsPage";
import { HIRING_CAMPAIGNS_URL } from "../../routes";

const SwitchHiringCampaignsValidator = () => {

  const navigate = useNavigate();

  const [company] = useAtom(currentCompany);
  const [oldFilter, setFilters] = useAtom(filters);
  const [newFilter] = useAtom(savedUrlFilters);
  const [selected, setSelected] = useAtom(switcherSelectedTable);
  const [, setMouseHover] = useAtom(switcherMouseHoverTable);
  const [, setComeChange] = useAtom(comeChanges);

  const [returnPage, setReturnPage] = useState(<SwitcherHiringCampaignsPage />);

  useEffect(() => {
    if (selected !== selectedType.none) {
      if (selected === selectedType.new) setFilters([...newFilter]);
      if (selected === selectedType.old) setFilters([...oldFilter]);
      setSelected(selectedType.none);
      setMouseHover(selectedType.none);
      setComeChange(false);
      navigate(HIRING_CAMPAIGNS_URL(company.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    if (
      //Check is newFilter === oldFilter
      newFilter.reduce((answer, filterItem, index) => (
        answer
        && filterItem.tableID === oldFilter[index].tableID
        && filterItem.tableFilters.toString() === oldFilter[index].tableFilters.toString()
      ), true) || (newFilter === null)
    ) {
      setReturnPage(<ErrorSwitchModePage />);
    }
  }, [newFilter, oldFilter])

  return (returnPage);
}

export default SwitchHiringCampaignsValidator;