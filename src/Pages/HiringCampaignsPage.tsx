import { useAtom } from "jotai";
import { differentCompany } from "../Atoms/HiringCampaign";
import HiringCampaigns from "../Components/HiringCampaign/HiringCampaigns";
import DisplayUser from "../Components/Login/DisplayUser";

const HiringCampaignPage = () => {
  const [isTableCompany] = useAtom(differentCompany);
  return (
    <div className="flex">
      <div className="flex fixed ml-10 mx-auto my-4 w-full invisible md:visible">
        <div className="">
          <DisplayUser />
        </div>
      </div>

      <div className="z-50 flex flex-col w-full items-center justify-center mt-2 px-4">
        <div className="text-2xl text-center text-stone-300 border-b-2 border-slate-600 pb-3 w-full mb-5">
          Hiring campaigns
          {isTableCompany === "" ? <></> : <span> for <b>{isTableCompany}</b></span>}
        </div>
        <HiringCampaigns />
      </div>
    </div >
  );
}

export default HiringCampaignPage;