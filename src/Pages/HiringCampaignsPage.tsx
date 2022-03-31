import { useAtom } from "jotai";
import { comeChanges } from "../Atoms/LoadData";
import HiringCampaigns from "../Components/HiringCampaign/HiringCampaigns";
import DisplayUser from "../Components/Login/DisplayUser";
import Login from "../Components/Login/Login";
import ToLoginButton from "../Components/Login/toLoginButton";
import AcceptLine from "../Components/Validators/AcceptLine";

const HiringCampaignPage = () => {
  const [isChanged] = useAtom(comeChanges);
  return (
    <div style={{ display: "flex", flexDirection: "row", fontSize: "25px", padding: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Login />
        <ToLoginButton />
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "80rem" }}>
        {
          isChanged ? <AcceptLine /> : <></>
        }
        <DisplayUser />
        <div>Hiring compaigns</div>
        <HiringCampaigns />
      </div>
    </div>
  );
}

export default HiringCampaignPage;