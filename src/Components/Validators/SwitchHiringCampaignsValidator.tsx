import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentCompany } from "../../Atoms/Company";
import { filters, notEqualFilters, savedUrlFilters } from "../../Atoms/Filters";
import { savedTablesSettingsURL, tablesSettings } from "../../Atoms/LoadData";
import { comeChanges, selectedType, switcherMouseHoverTable, switcherSelectedTable } from "../../Atoms/SwithersAtoms";
import ErrorSwitchModePage from "../../Pages/ErrorSwitchModePage";
import SwitcherHiringCampaignsPage from "../../Pages/SwitcherHiringCampaignsPage";
import { HIRING_CAMPAIGNS_URL } from "../../routes";

const SwitchHiringCampaignsValidator = () => {

  const navigate = useNavigate();

  const [company] = useAtom(currentCompany);
  const [oldFilter] = useAtom(filters);
  const [newFilter] = useAtom(savedUrlFilters);
  const [oldSettings, setTablesSettings] = useAtom(tablesSettings);
  const [newSettings] = useAtom(savedTablesSettingsURL);
  const [selected, setSelected] = useAtom(switcherSelectedTable);
  const [, setMouseHover] = useAtom(switcherMouseHoverTable);
  const [, setComeChange] = useAtom(comeChanges);

  const [returnPage, setReturnPage] = useState(<SwitcherHiringCampaignsPage />);

  useEffect(() => {
    if (selected !== selectedType.none) {
      if (selected === selectedType.new) setTablesSettings([...newSettings]);
      if (selected === selectedType.old) setTablesSettings([...oldSettings]);
      setSelected(selectedType.none);
      setMouseHover(selectedType.none);
      setComeChange(false);
      navigate(HIRING_CAMPAIGNS_URL(company.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    if (! notEqualFilters(newFilter, oldFilter)) {
      setReturnPage(<ErrorSwitchModePage />);
    }
  }, [newFilter, oldFilter])

  return (returnPage);
}

export default SwitchHiringCampaignsValidator;