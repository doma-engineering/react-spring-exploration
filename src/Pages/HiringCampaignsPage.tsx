import { useAtom } from "jotai";
import { differentCompany } from "../Atoms/HiringCompaign";
import HiringCampaigns from "../Components/HiringCampaign/HiringCampaigns";
import DisplayUser from "../Components/Login/DisplayUser";
import Login from "../Components/Login/Login";
import ToLoginButton from "../Components/Login/toLoginButton";

const HiringCampaignPage = () => {
  const [isTableCompany] = useAtom(differentCompany);
  return (
    <div style={{ display: "flex", flexDirection: "row", fontSize: "25px", padding: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Login />
        <ToLoginButton />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "80rem" }}>
        <DisplayUser />
        <div style={{ margin: "1rem" }}>
          Hiring compaigns
          {isTableCompany === "" ? <></> : <span> for <b>{isTableCompany}</b></span>}
        </div>
        <HiringCampaigns />
      </div>
    </div>
  );
}

export default HiringCampaignPage;