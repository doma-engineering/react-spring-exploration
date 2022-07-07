import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { currentTable, emptyTable } from '../../Atoms/CandidateTables';
import {
    filters,
    notEqualFilters,
    savedUrlFilters,
    urlFilters,
} from '../../Atoms/Filters';
import {
    defaultSettingsTable,
    notEqualTablesSettings,
    savedTablesSettingsURL,
    tables as allTables,
    tablesSettings,
    tablesSettingsURL,
} from '../../Atoms/LoadData';
import { currentPath } from '../../Atoms/Login';
import { comeChanges } from '../../Atoms/SwithersAtoms';
import CandidateTablePage from '../../Pages/CandidatesTablePage';
import Error404Page from '../../Pages/Error404Page';
import {
    CANDIDATE_TABLE_SWITCH_MODE_URL,
    CANDIDATE_TABLE_URL,
} from '../../routes';

const CandidateTableValidator = () => {
    const navigate = useNavigate();
    const { CandidateTable } = useParams();

    const [, setCurrentTable] = useAtom(currentTable);
    const [tables] = useAtom(allTables);
    const [filter] = useAtom(filters);
    const [urlFilter] = useAtom(urlFilters);
    const [, setSavedUrl] = useAtom(savedTablesSettingsURL);
    const [, setSavedUrlFilters] = useAtom(savedUrlFilters);
    const [, setCurrentPath] = useAtom(currentPath);
    const [, setComeChange] = useAtom(comeChanges);
    const [url] = useAtom(tablesSettingsURL);
    const [tSettings, setTablesSettings] = useAtom(tablesSettings);

    const [returnPage, setReturnPage] = useState(<></>);

    const updateURL = (tableID: string) => {
        // if current table haven't in tables settings => add settings to url&etc.
        if (!filter.map((filter) => filter.tableID).includes(tableID)) {
            setTablesSettings([
                ...tSettings,
                { ...defaultSettingsTable, table: tableID },
            ]);
            return;
        }
        // for always display tables properties in URL!
        setTablesSettings([...tSettings]);
    };

    useEffect(
        () => {
            const foundTable =
                tables?.find(
                    (t) =>
                        t.id.toLowerCase() ===
                        (CandidateTable?.toLowerCase() ?? '')
                ) ?? emptyTable;
            if (
                foundTable.id.toLowerCase() ===
                (CandidateTable?.toLowerCase() ?? '').toLowerCase()
            ) {
                if (foundTable.id !== CandidateTable) {
                    navigate(CANDIDATE_TABLE_URL(foundTable.id));
                    return;
                }
                updateURL(foundTable.id);
                setCurrentTable(foundTable);
                setReturnPage(<CandidateTablePage />);
                setCurrentPath(CANDIDATE_TABLE_URL(foundTable.id));
                return;
            }

            setReturnPage(<Error404Page />);
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [CandidateTable]
    );

    useEffect(
        () => {
            if (url.length > 0 && notEqualTablesSettings(url, tSettings)) {
                // if open window without log in but with url settings => open table with current settings
                if (filter === undefined && url.length > 0) {
                    setTablesSettings([...url]);
                    return;
                }

                // if url filters come changes and filter is not empty => go to switchMode
                if (notEqualFilters(urlFilter, filter) && filter.length > 0) {
                    setComeChange(true);
                    setSavedUrl([...url]);
                    setSavedUrlFilters([...urlFilter]);
                    navigate(
                        CANDIDATE_TABLE_SWITCH_MODE_URL(CandidateTable || '')
                    );
                }

                // for update if changed not filter part, like sorting mode.
                else {
                    setTablesSettings([...url]);
                }
            }
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [url]
    );

    return returnPage;
};

export default CandidateTableValidator;
