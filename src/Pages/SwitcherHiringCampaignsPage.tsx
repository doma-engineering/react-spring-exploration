import SwitcherTables from '../Components/HiringCampaign/HiringCampaignsSwitcher';
import SwitcherButtons from '../Components/Validators/SwitchButtons';

const SwitcherHiringCampaignsPage = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-12">
            <SwitcherButtons />
            <div className="flex mt-6">
                <SwitcherTables />
            </div>
        </div>
    );
};

export default SwitcherHiringCampaignsPage;
