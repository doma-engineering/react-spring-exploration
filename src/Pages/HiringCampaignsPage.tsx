import HiringCampaigns from "../Components/HiringCampaign/HiringCampaigns";
import DisplayUser from "../Components/Login/DisplayUser";
import Login from "../Components/Login/Login";
import ToLoginButton from "../Components/Login/toLoginButton";

const HiringCampaignPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row", fontSize: "25px", padding: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* TODO: there was infinity load bug, fix it. */}
        <Login />
        <ToLoginButton />
      </div>
      <div style={{ display: "flex", flexDirection: "column", placeContent: "center", alignContent: "center", justifyContent: "center", width: "80rem" }}>
        <DisplayUser />
        <div>Hiring compaigns</div>
        <HiringCampaigns />
      </div>
    </div>
  );
}

export default HiringCampaignPage;