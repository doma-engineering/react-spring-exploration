import { useAtom } from 'jotai';
import { currentCompany } from '../Atoms/Company';
import { isPageForOtherCompany } from '../Atoms/Login';
import HiringCampaigns from '../Components/HiringCampaign/HiringCampaigns';
import DisplayUser from '../Components/Login/DisplayUser';
import TaskCategoriesGrid from '../Components/TaskCategories/TaskCategoriesGrid';

const HiringCampaignPage = () => {
    const [isTableForNotLoggedIn] = useAtom(isPageForOtherCompany);
    const [company] = useAtom(currentCompany);
    return (
        <div className="flex">
            <div className="flex fixed ml-10 mx-auto my-4 w-full invisible md:visible">
                <div className="">
                    <DisplayUser />
                </div>
            </div>

            <div className="z-50 flex flex-col w-full items-center justify-center mt-2 px-4">
                <div className="text-2xl text-center text-stone-300 border-b-2 border-slate-600 pb-3 w-full mb-5">
                    {isTableForNotLoggedIn ? (
                        <span>
                            Hiring campaigns for <b>{company.displayName}</b>{' '}
                        </span>
                    ) : (
                        <span>Hiring campaigns</span>
                    )}
                </div>
                <div className="flex flex-col">
                    <div>
                        <HiringCampaigns />
                    </div>
                    {isTableForNotLoggedIn ? (
                        <></>
                    ) : (
                        <div className="flex flex-col items-center rounded mt-5 pb-5 px-5 bg-gray-700 shadow-lg text-lg shadow-slate-900/50">
                            <p className="text-center my-3 text-slate-200 font-semibold">
                                You can add new task!
                            </p>
                            <TaskCategoriesGrid
                                size="sm"
                                styleModify="bg-cyan-800 rounded shadow-md"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HiringCampaignPage;
