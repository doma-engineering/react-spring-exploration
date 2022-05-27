import { useAtom } from "jotai";
import { differentCompany } from "../Atoms/HiringCompaign";
import HiringCampaigns from "../Components/HiringCampaign/HiringCampaigns";
import DisplayUser from "../Components/Login/DisplayUser";

const HiringCampaignPage = () => {
  const [isTableCompany] = useAtom(differentCompany);
  return (
    <div className="flex">
      <div className="flex fixed flex-col ml-10 mx-4 my-4 justify-center">
        <div>
          <DisplayUser />
        </div>
      </div>

      <div className="z-50 flex flex-col w-full items-center justify-center mt-2">
        <div className="text-2xl text-center text-stone-300 border-b-2 border-slate-600 pb-3 w-full mb-5">
          Hiring compaigns
          {isTableCompany === "" ? <></> : <span> for <b>{isTableCompany}</b></span>}
        </div>
        <HiringCampaigns />
      </div>
    </div >
  );
}

export default HiringCampaignPage;