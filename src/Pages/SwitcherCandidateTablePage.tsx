import CandidateTableSwitcher from '../Components/CandidateTable/TableSwitcher';
import SwitcherButtons from '../Components/Validators/SwitchButtons';
import {
    NewTableSettings,
    OldTableSettings,
} from '../Components/CandidateTable/TableSettingsForSwitcher';
import { useState } from 'react';
import SwitcherMobileSettingsMenus from '../Components/CandidateTable/SwitcherMobileSettingsMenus';

const CandidateTableSwitcherPage = () => {
    return (
        <div>
            <SwitcherMobileSettingsMenus />
            <div className="flex flex-col justify-center items-center mt-10">
                <div className="m-2">
                    <SwitcherButtons />
                </div>
                <div className="flex justify-center mt-4">
                    <div className="hidden xl:block">
                        <OldTableSettings />
                    </div>
                    <div className="flex h-full">
                        <CandidateTableSwitcher />
                    </div>
                    <div className="hidden xl:block">
                        <NewTableSettings />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidateTableSwitcherPage;
