import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loggedInCompany } from '../../Atoms/Login';
import {
    COMMUNITY_URL,
    COMPANIES_URL,
    GET_STARTED_URL,
    HIRING_CAMPAIGNS_URL,
    LOGIN_URL,
    REGISTRATION_URL,
    TASKS_URL,
} from '../../routes';
import ToLoginButton from '../Login/toLoginButton';

const UpsideMenu = () => {
    const navigate = useNavigate();
    const loggedIn = useAtomValue(loggedInCompany);
    const [isMenu, setIsMenu] = useState(false);

    const handleClickMenu = () => setIsMenu(!isMenu);
    const handleClickCategory = (URL: string) => {
        navigate(URL);
        setIsMenu(false);
    };
    const handleClickLogo = () => {
        navigateToHiringCampaigns();
    };
    const navigateToHiringCampaigns = () => {
        if (loggedIn.isLoggedIn) {
            if (
                window.location.pathname !==
                HIRING_CAMPAIGNS_URL(loggedIn.companyId)
            ) {
                navigate(
                    HIRING_CAMPAIGNS_URL(loggedIn.companyId) +
                        window.location.hash // for save url tables settings
                );
            }
        } else {
            navigate(GET_STARTED_URL);
        }
    };

    return (
        <div className="">
            <div className="bg-slate-900 border-b border-slate-600 flex w-full absolute md:fixed shadow-md shadow-gray-100/10 z-50">
                <button className="flex p-2 pr-8" onClick={handleClickLogo}>
                    <img
                        className="w-10 h-10 ml-5 invert"
                        src="https://raw.githubusercontent.com/doma-engineering/design-exploration/main/layout%20prototype/LogoPlay-04.png"
                        alt="OHR logo"
                    />
                    <div className="text-white font-mono text-4xl">∅HR</div>
                </button>
                <div className="hidden md:flex md:w-full md:justify-between">
                    <div className="flex flex-nowrap">
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
                            onClick={() => navigateToHiringCampaigns()}
                        >
                            Hiring campaigns
                        </button>
                    </div>
                    {loggedIn.isLoggedIn ? (
                        <div className="flex items-center">
                            <ToLoginButton
                                text="logout"
                                style="px-5 mr-5 border-2 p-1 rounded-full border-stone-400 text-stone-300 hover:border-0 hover:bg-sky-900"
                            />
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <Link
                                to={REGISTRATION_URL}
                                className="px-5 mr-2 border-2 p-1 rounded-full border-stone-400 text-stone-300 hover:border-0 hover:bg-sky-900"
                            >
                                register
                            </Link>
                            <Link
                                to={LOGIN_URL}
                                className="mr-5 border-2 py-1 px-7 rounded-full border-stone-400 text-stone-300 hover:border-0 hover:bg-sky-900"
                            >
                                login
                            </Link>
                        </div>
                    )}
                </div>
                <div className="flex w-full justify-end md:hidden">
                    <button
                        onClick={handleClickMenu}
                        className="btnAccent bg-cyan-800 rounded-full px-8 py-1"
                    >
                        {isMenu ? 'Close' : 'Menu'}
                    </button>
                </div>
            </div>
            <div
                className="absolute mt-14 w-full md:hidden z-50"
                onClick={handleClickMenu}
            >
                <div className={isMenu ? '' : 'hidden'}>
                    <div className="bg-slate-600 rounded-bl-lg pb-5 shadow-md shadow-slate-900/50">
                        <div className="flex flex-col text-2xl bg-slate-800 ml-4">
                            <button
                                className="upsideCategory text-xl border-b-2 py-4 pd-3 border-slate-600"
                                onClick={() =>
                                    handleClickCategory(COMPANIES_URL)
                                }
                            >
                                Companies
                            </button>
                            <button
                                className="upsideCategory text-xl border-b-2 py-4 pd-3 border-slate-600"
                                onClick={() => handleClickCategory(TASKS_URL)}
                            >
                                Tasks
                            </button>
                            <button
                                className="upsideCategory text-xl border-b-2 py-4 pd-3 border-slate-600"
                                onClick={() =>
                                    handleClickCategory(COMMUNITY_URL)
                                }
                            >
                                Community
                            </button>
                            <button
                                className="upsideCategory text-xl border-b-2 py-4 pd-3 border-slate-600"
                                onClick={() => {
                                    navigateToHiringCampaigns();
                                    setIsMenu(false);
                                }}
                            >
                                Hiring campaigns
                            </button>
                        </div>
                        {loggedIn.isLoggedIn ? (
                            <div className="flex items-center justify-center pt-5">
                                <ToLoginButton
                                    text="logout"
                                    style="px-5 mr-5 border-2 p-1 rounded-full border-stone-400 text-stone-300 hover:border-0 hover:bg-sky-900"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center pt-5">
                                <Link
                                    to={REGISTRATION_URL}
                                    className="px-5 mr-2 border-2 p-1 rounded-full border-stone-400 text-stone-300 hover:border-0 hover:bg-sky-900"
                                >
                                    register
                                </Link>
                                <Link
                                    to={LOGIN_URL}
                                    className="mr-5 border-2 py-1 px-7 rounded-full border-stone-400 text-stone-300 hover:border-0 hover:bg-sky-900"
                                >
                                    login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full h-14"></div>
        </div>
    );
};

export default UpsideMenu;
