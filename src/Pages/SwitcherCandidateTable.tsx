import CandidateTableSwitcher from "../Components/CandidateTable/TableSwitcher";
import SwitcherButtons from "../Components/Validators/SwitchButtons";

const CandidateTableSwitcherPage = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="m-2">
        <SwitcherButtons />
      </div>
      <div className="mt-4 flex">
        <CandidateTableSwitcher />
      </div>
    </div>
  )
}

export default CandidateTableSwitcherPage;