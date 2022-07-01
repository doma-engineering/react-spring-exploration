import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loggedInCompany } from '../../Atoms/Login';
import {
    COMMUNITY_URL,
    COMPANIES_URL,
    HIRING_CAMPAIGNS_URL,
    LOGIN_URL,
    TASKS_URL,
} from '../../routes';
import ToLoginButton from '../Login/toLoginButton';

const UpsideMenu = () => {
    const navigate = useNavigate();
    const loggedIn = useAtomValue(loggedInCompany);
    const [isMenu, setIsMenu] = useState(false);

    const handleClickMenu = () => setIsMenu(!isMenu);
    const handleClickLogo = () => {
        navigateToHiringCampaigns();
    };
    const navigateToHiringCampaigns = () => {
        if (loggedIn.isLoggedIn) {
            if (
                window.location.pathname !==
                HIRING_CAMPAIGNS_URL(loggedIn.companyId)
            ) {
                navigate(HIRING_CAMPAIGNS_URL(loggedIn.companyId));
            }
        } else {
            navigate(LOGIN_URL);
        }
    };

    return (
        <div>
            <div className="bg-slate-900 border-b border-slate-600 flex">
                <button className="flex p-2 pr-8" onClick={handleClickLogo}>
                    <img
                        className="w-10 h-10 ml-5 invert"
                        src="https://raw.githubusercontent.com/doma-engineering/design-exploration/main/layout%20prototype/LogoPlay-04.png"
                        alt="OHR logo"
                    />
                    <div className="text-white font-mono text-4xl">∅HR</div>
                </button>
                <div className="hidden md:flex md:w-full md:justify-between">
                    <div className="ml-10">
                        <button
                            className="upsideCategory"
                            onClick={() => navigate(COMPANIES_URL)}
                        >
                            Companies
                        </button>
                        <button
                            className="upsideCategory"
                            onClick={() => navigate(TASKS_URL)}
                        >
                            Tasks
                        </button>
                        <button
                            className="upsideCategory"
                            onClick={() => navigate(COMMUNITY_URL)}
                        >
                            Community
                        </button>
                        <button
                            className="upsideCategory"
                            onClick={handleClickLogo}
                        >
                            Hiring campaigns
                        </button>
                    </div>
                    <div className="flex items-center">
                        <ToLoginButton
                            text="logout"
                            style="px-5 mr-5 border-2 p-1 rounded-full border-stone-400 text-stone-300 hover:border-0 hover:bg-sky-900"
                        />
                    </div>
                </div>
                <div className="flex w-full justify-end md:hidden">
                    <button
                        onClick={navigateToHiringCampaigns}
                        className="btnAccent bg-cyan-800 rounded-full px-8"
                    >
                        {isMenu ? 'Close' : 'Menu'}
                    </button>
                </div>
            </div>
            <div className="md:hidden">
                <div className={isMenu ? '' : 'hidden'}>
                    <div className="flex flex-col text-2xl bg-slate-900">
                        <button className="upsideCategory text-3xl border-b-4 py-4 pd-3 border-slate-600">
                            Companies
                        </button>
                        <button className="upsideCategory text-3xl border-b-4 py-4 pd-3 border-slate-600">
                            Tasks
                        </button>
                        <button className="upsideCategory text-3xl border-b-4 py-4 pd-3 border-slate-600">
                            Community
                        </button>
                    </div>
                    <div
                        className="py-8 flex justify-center"
                        onClick={handleClickMenu}
                    >
                        <ToLoginButton
                            text="logout"
                            style="bg-cyan-800 px-14 py-3 rounded-full text-slate-200 hover:border-0 hover:bg-sky-900"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpsideMenu;
