import SwitcherTables from "../Components/HiringCampaign/HiringCampaignsSwitcher";
import SwitherButtons from "../Components/Validators/SwitchButtons";

const SwitcherHiringCampaignsPage = () => {

  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <SwitherButtons />
      <div className="flex mt-6">
        <SwitcherTables />
      </div>
    </div>
  );
}

export default SwitcherHiringCampaignsPage;