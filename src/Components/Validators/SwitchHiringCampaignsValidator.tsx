import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentCompany } from "../../Atoms/Company";
import { filters, urlFilters } from "../../Atoms/Filters";
import { comeChanges } from "../../Atoms/LoadData";
import { selectedType, switcherMouseHoverTable, switcherSelectedTable } from "../../Atoms/SwithersAtoms";
import ErrorSwitchModePage from "../../Pages/ErrorSwitchModePage";
import SwitcherHiringCampaignsPage from "../../Pages/SwitcherHiringCampaignsPage";
import { HIRINGS_COMPAIGNS_URL } from "../../routes";

const SwitchHiringCampaignsValidator = () => {

  const navigate = useNavigate();

  const [company] = useAtom(currentCompany);
  const [oldFilter, setFilters] = useAtom(filters);
  const [newFilter] = useAtom(urlFilters);
  const [selected, setSelected] = useAtom(switcherSelectedTable);
  const [, setMousehover] = useAtom(switcherMouseHoverTable);
  const [, setComeChange] = useAtom(comeChanges);

  const [returnPage, setReturnPage] = useState(<SwitcherHiringCampaignsPage />);

  useEffect(() => {
    if (selected !== selectedType.none) {
      if (selected === selectedType.new) setFilters([...newFilter]);
      if (selected === selectedType.old) setFilters([...oldFilter]);
      setSelected(selectedType.none);
      setMousehover(selectedType.none);
      setComeChange(false);
      navigate(HIRINGS_COMPAIGNS_URL(company.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    if (
      //Check is newFilter === oldFilter
      newFilter.reduce((ans, filtr, index) => (
        ans
        && filtr.tableID === oldFilter[index].tableID
        && filtr.tableFilters.toString() === oldFilter[index].tableFilters.toString()
      ), true)
    ) {
      setReturnPage(ErrorSwitchModePage);
    }
  }, [newFilter, oldFilter])

  return (returnPage);
}

export default SwitchHiringCampaignsValidator;