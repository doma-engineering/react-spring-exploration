import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentTable } from '../../Atoms/CandidateTables';
import { filters, notEqualFilters, savedUrlFilters } from '../../Atoms/Filters';
import { savedTablesSettingsURL, tablesSettings } from '../../Atoms/LoadData';
import {
    comeChanges,
    selectedType,
    switcherMouseHoverTable,
    switcherSelectedTable,
} from '../../Atoms/SwithersAtoms';
import ErrorSwitcherCandidateTable from '../../Pages/ErrorSwitcherCandidateTable';
import CandidateTableSwitcherPage from '../../Pages/SwitcherCandidateTable';
import { CANDIDATE_TABLE_URL } from '../../routes';

const CandidateTableSwitcherValidator = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState(<CandidateTableSwitcherPage />);

    const [selected, setSelected] = useAtom(switcherSelectedTable);
    const [, setMouseHover] = useAtom(switcherMouseHoverTable);
    // switch mode is available only when changed filters
    const [oldFilter] = useAtom(filters);
    const [newFilter] = useAtom(savedUrlFilters);
    //
    const [oldSettings, setTablesSettings] = useAtom(tablesSettings);
    const [newSettings] = useAtom(savedTablesSettingsURL);
    const [table] = useAtom(currentTable);
    const [, setComeChange] = useAtom(comeChanges);

    useEffect(() => {
        //Check is newFilter === oldFilter => trying to enter to switch mod by hand write url!
        if (!notEqualFilters(newFilter, oldFilter)) {
            setPage(ErrorSwitcherCandidateTable);
        }
    }, [newFilter, oldFilter]);

    useEffect(() => {
        if (selected !== selectedType.none) {
            if (selected === selectedType.new)
                setTablesSettings([...newSettings]);
            if (selected === selectedType.old)
                setTablesSettings([...oldSettings]);
            setSelected(selectedType.none);
            setMouseHover(selectedType.none);
            setComeChange(false);
            navigate(CANDIDATE_TABLE_URL(table.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    return page;
};

export default CandidateTableSwitcherValidator;
