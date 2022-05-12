import SwitcherTables from "../Components/HiringCampaign/HiringCampaignsSwitcher";
import SwitherButtons from "../Components/HiringCampaign/SwitchButtons";

const SwitcherHiringCampaignsPage = () => {

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "3rem" }}>
      <SwitherButtons />
      <SwitcherTables />
    </div>
  );
}

export default SwitcherHiringCampaignsPage;