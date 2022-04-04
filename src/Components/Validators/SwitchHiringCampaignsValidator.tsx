import { useAtom } from "jotai";
import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currentCompany } from "../../Atoms/Company";
import { filters, urlFilters } from "../../Atoms/Filters";
import { selectedType, switcherMouseHoverTable, switcherSelectedTable } from "../../Atoms/HiringCompaign";
import SwitcherHiringCampaignsPage from "../../Pages/SwitcherHiringCampaignsPage";

const SwitchHiringCampaignsValidator = () => {

  const navigate = useNavigate();

  const [company] = useAtom(currentCompany);
  const [oldFilter, setFilters] = useAtom(filters);
  const [newFilter] = useAtom(urlFilters);
  const [selected, setSelected] = useAtom(switcherSelectedTable);
  const [, setMousehover] = useAtom(switcherMouseHoverTable);

  useEffect(() => {
    if (selected !== selectedType.none) {
      if (selected === selectedType.new) setFilters([...newFilter]);
      if (selected === selectedType.old) setFilters([...oldFilter]);
      setSelected(selectedType.none);
      setMousehover(selectedType.none);
      navigate(`/Companies/${company.id}/Campaigns`);
    }
  },
    [selected])

  return (
    <Fragment>
      <SwitcherHiringCampaignsPage />
    </Fragment>
  );
}

export default SwitchHiringCampaignsValidator;