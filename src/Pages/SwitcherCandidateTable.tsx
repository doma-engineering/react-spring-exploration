import CandidateTableSwitcher from "../Components/CandidateTable/TableSwitcher";
import SwitherButtons from "../Components/HiringCampaign/SwitchButtons";

const CandidateTableSwitcherPage = () => {
  return (
    <div className="flex flex-col justify-center mt-10">
      <div className="m-2">
        <SwitherButtons />
      </div>
      <div className="mt-4">
        <CandidateTableSwitcher />
      </div>
    </div>
  )
}

export default CandidateTableSwitcherPage;