import { useAtom } from 'jotai';
import { useState } from 'react';
import { a, useSpring } from 'react-spring';
import { currentTable } from '../../Atoms/CandidateTables';
import Filter from '../Filters/Filter';
import ButtonBackToHiringCampaigns from '../HiringCampaign/ButtonBackToHiringCampaigns';

const MobileMenu = () => {
    const [table] = useAtom(currentTable);

    const [isLeftMenu, setIsLeftMenu] = useState(false);

    const handleLeftMenuClick = () => setIsLeftMenu(!isLeftMenu);

    return (
        <div className="fixed flex z-30 xl:hidden pt-1 flex-col mr-3">
            <div className="flex">
                <div
                    className={isLeftMenu ? 'bg-gray-700 px-4 py-4' : 'hidden'}
                >
                    <div className="text-2xl text-stone-300 text-center">
                        {table.displayName}
                    </div>
                    <div>
                        <ButtonBackToHiringCampaigns />
                    </div>
                    <div className="flex">
                        <Filter />
                    </div>
                </div>
                <div
                    className="flex items-center bg-slate-600 pb-2 rounded-r h-40 text-center text-stone-200
                               first-letter:hover:bg-gray-800 
                               active:bg-gray-600 px-1"
                    onClick={handleLeftMenuClick}
                >
                    {isLeftMenu ? '<' : '>'}
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
