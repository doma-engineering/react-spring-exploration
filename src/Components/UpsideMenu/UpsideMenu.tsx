import { useState } from 'react';
import ToLoginButton from '../Login/toLoginButton';

const UpsideMenu = () => {
    const [isMenu, setIsMenu] = useState(false);

    const handleClickMenu = () => setIsMenu(!isMenu);

    return (
        <div>
            <div className="bg-slate-900 border-b border-slate-600 flex">
                <button className="flex p-2 pr-8">
                    <img
                        className="w-10 h-10 ml-5 invert"
                        src="https://raw.githubusercontent.com/doma-engineering/design-exploration/main/layout%20prototype/LogoPlay-04.png"
                        alt="OHR logo"
                    />
                    <div className="text-white font-mono text-4xl">∅HR</div>
                </button>
                <div className="hidden md:flex md:w-full md:justify-between">
                    <div className="ml-10">
                        <button className="upsideCategory">Companies</button>
                        <button className="upsideCategory">Tasks</button>
                        <button className="upsideCategory">Community</button>
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
                        onClick={handleClickMenu}
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
