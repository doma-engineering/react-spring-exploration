import CandidateTableSwitcher from "../Components/CandidateTable/TableSwitcher";
import SwitherButtons from "../Components/HiringCampaign/SwitchButtons";

const CandidateTableSwitcherPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3rem",
      }}
    >
      <SwitherButtons />
      <CandidateTableSwitcher />
    </div>
  )
}

export default CandidateTableSwitcherPage;