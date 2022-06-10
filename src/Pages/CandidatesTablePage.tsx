import Filter from "../Components/CandidateTable/Filter";
import Table from "../Components/CandidateTable/Table";
import DisplayUser from "../Components/Login/DisplayUser";
import ButtonBackToHiringCampaigns from "../Components/HiringCampaign/ButtonBackToHiringCampaigns";
import { useAtom } from "jotai";
import { currentTable } from "./../Atoms/CandidateTables";
import { useState } from "react";

const CandidateTablePage = () => {

  const [isLeftMenu, setIsLeftMenu] = useState(false);

  const [table] = useAtom(currentTable);
  const handleLeftMenuClick = () => setIsLeftMenu(!isLeftMenu);

  return (
    <div className="flex w-full">
      <div className="hidden xl:flex fixed flex-col ml-10 mx-4 my-4 justify-center">
        <div>
          <DisplayUser />
        </div>
      </div>
      <div className="flex w-full justify-center mt-6">

        <div className="hidden xl:flex pt-1 flex-col mr-3">
          <div className="text-stone-300 text-3xl text-right mb-1 font-medium px-3 py-1 underline decoration-sky-800">
            {table.displayName}
          </div>
          <div>
            <ButtonBackToHiringCampaigns />
          </div>
          <div className="flex">
            <Filter />
          </div>
        </div>
        <div className="z-20">
          <Table />
        </div>
      </div>
      <div className="fixed flex z-50 w-full xl:hidden pt-1 flex-col mr-3">
        <div className="flex">
          <div className={isLeftMenu ? "bg-gray-700 px-4 py-4" : "hidden"}>
            <div>
              <ButtonBackToHiringCampaigns />
            </div>
            <div className="flex">
              <Filter />
            </div>
          </div>
          <div className="flex items-center bg-slate-600 pb-2 rounded-r h-40 text-center text-stone-200
                          hover:bg-gray-800 
                          active:bg-gray-600 px-2"
            onClick={handleLeftMenuClick}
          >
            {isLeftMenu ? "<" : ">"}
          </div>
        </div>
      </div>
    </div >
  );
}

// const InitBTNsColors = () => (                                  {/*  Work when commented! o-o}
//   <div className="absolute invisible">                          {/*  That only initialization for not default tailwind colors :(                                       */}
//     <div className="bg-Senior border-Senior">Senior</div>   {/*  because if no where not written not default color in simple className string as there,             */}
//     <div className="bg-Middle border-Middle">Middle</div>   {/*  line like   className=`bg-${function()}`   will NOT work      function = () => ("btn-Middle")     */}
//     <div className="bg-Junior border-Junior">Junior</div>   {/*  I think for solve that problem need save that colors as final css, bc if write them simple (line 2), and delete after, they also work in (line 3).*/}
//     <div className="bg-NM     border-NM"    >NM</div>
//   </div>
// )

export default CandidateTablePage;