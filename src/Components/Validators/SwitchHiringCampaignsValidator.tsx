import { useAtom } from "jotai";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currentCompany } from "../../Atoms/Company";
import { filters, urlFilters } from "../../Atoms/Filters";
import { selectedType, switcherMouseHoverTable, switcherSelectedTable } from "../../Atoms/HiringCompaign";
import { comeChanges } from "../../Atoms/LoadData";
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
  }, [selected])

  return (
    <Fragment>
      <SwitcherHiringCampaignsPage />
    </Fragment>
  );
}

export default SwitchHiringCampaignsValidator;