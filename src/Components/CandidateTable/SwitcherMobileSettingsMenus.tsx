import { useState } from 'react';
import { NewTableSettings, OldTableSettings } from './TableSettingsForSwitcher';

const SwitcherMobileSettingsMenus = () => {
    const [isOpenLeftMenu, setOpenLeftMenu] = useState(false);
    const [isOpenRightMenu, setOpenRightMenu] = useState(false);
    const handleClickLeftMenu = () => {
        setOpenLeftMenu(!isOpenLeftMenu);
    };
    const handleClickRightMenu = () => {
        setOpenRightMenu(!isOpenRightMenu);
    };

    return (
        <div className="xl:hidden">
            {/* -----  Left menu ----- */}
            <div className="fixed flex z-30 pt-1 mr-3">
                <div
                    className={
                        isOpenLeftMenu
                            ? 'bg-gray-700 px-4 py-4 shadow-md shadow-slate-900/60 flex'
                            : 'hidden'
                    }
                >
                    <OldTableSettings />
                </div>
                <div
                    className="flex items-center bg-slate-600 pb-2 rounded-r h-40 text-center text-stone-200 shadow-sm shadow-slate-900/60
              hover:bg-gray-800 
              active:bg-gray-600 px-1"
                    onClick={handleClickLeftMenu}
                >
                    {isOpenLeftMenu ? '<' : '>'}
                </div>
            </div>

            {/* -----  Right menu ----- */}
            <div className="right-0 fixed flex xl:hidden z-30 pt-1">
                <div
                    className="flex items-center bg-slate-600 pb-2 rounded-l h-40 text-center text-stone-200 shadow-sm shadow-slate-900/60
                            hover:bg-gray-800 
                            active:bg-gray-600 px-1"
                    onClick={handleClickRightMenu}
                >
                    {isOpenRightMenu ? '>' : '<'}
                </div>
                <div
                    className={
                        isOpenRightMenu
                            ? 'bg-gray-700 px-4 py-4 shadow-md shadow-slate-900/60 flex'
                            : 'hidden'
                    }
                >
                    <NewTableSettings />
                </div>
            </div>
        </div>
    );
};

export default SwitcherMobileSettingsMenus;
