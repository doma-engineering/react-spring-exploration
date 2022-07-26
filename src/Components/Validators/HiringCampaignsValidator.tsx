import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { currentCompany } from '../../Atoms/Company';
import {
    companies,
    notEqualTablesSettings,
    savedTablesSettingsURL,
    tables as allTables,
    tablesSettings,
    tablesSettingsURL,
} from '../../Atoms/LoadData';
import { currentPath, loggedInCompany } from '../../Atoms/Login';
import {
    filters,
    notEqualFilters,
    savedUrlFilters,
    urlFilters,
} from '../../Atoms/Filters';

import {
    defaultFilterParams,
    fakeFilterData,
} from '../../Atoms/mocks/fakeData';

import {
    CandidateTable,
    CandidateTableFilters,
    CandidateTableSettings,
    Company,
    TaskCategories,
} from '../../Atoms/candidateTableTypes';

import ErrorPage from '../../Pages/ErrorHiringCampaignsPage';
import HiringCampaignPage from '../../Pages/HiringCampaignsPage';
import { tablesResult } from '../../Atoms/HiringCampaign';
import {
    HIRING_CAMPAIGNS_SWITCH_MODE_URL,
    HIRING_CAMPAIGNS_URL,
    TASKS_BY_CATEGORY_URL,
} from '../../routes';
import { comeChanges } from '../../Atoms/SwithersAtoms';
import { emptyTable } from '../../Atoms/CandidateTables';
import { selectedCategory as selectedCategoryAtom } from '../../Atoms/Categories';

const HiringCampaignsPageValidator = () => {
    const { CompanyName } = useParams();
    const navigate = useNavigate();

    const [displayedCompany, setCurrentCompany] = useAtom(currentCompany);
    const [, setResult] = useAtom(tablesResult);
    const [filter, setFilters] = useAtom(filters);
    const [tables] = useAtom(allTables);
    const [urlFilter] = useAtom(urlFilters);
    const [, setCurrentPath] = useAtom(currentPath);
    const [, setComeChange] = useAtom(comeChanges);
    const [allCompanies] = useAtom(companies);
    const [loggedIn] = useAtom(loggedInCompany);
    const [url] = useAtom(tablesSettingsURL);
    const [, setSavedUrl] = useAtom(savedTablesSettingsURL);
    const [tSettings, setTablesSettings] = useAtom(tablesSettings);
    const [selectedCategory, setSelectedCategory] =
        useAtom(selectedCategoryAtom);

    const [returnPage, setPage] = useState(<></>);
    const [previousURLFilter, setPreviousUrlFilter] = useState('hidden Egg');
    const [needClearCategory, setNeedClearCategory] = useState(true);

    const [, setSavedUrlFilter] = useAtom(savedUrlFilters);

    const updateHiringTablesResult = (
        company: Company,
        filters: CandidateTableFilters[]
    ) => {
        setResult(
            company.tables.map((tableID) => {
                const tableData =
                    tables?.find((table) => table.id === tableID) ?? emptyTable;
                const filterData: boolean[] =
                    filters?.find(
                        (filter: CandidateTableFilters) =>
                            filter.tableID === tableID
                    )?.tableFilters ?? defaultFilterParams;
                return findResult(tableData, filterData);
            })
        );
    };

    // differencesOfTables return   > tables ID <   who haven't in   > filter <   but is in   > company <  .
    const differencesOfTables = (
        company: Company,
        filters: CandidateTableFilters[]
    ): string[] => {
        return company.tables.filter(
            (table) => !filters.map((filter) => filter.tableID).includes(table)
        );
    };

    useEffect(() => {
        const company = allCompanies?.find(
            (company) =>
                company.displayName.toLowerCase() ===
                    CompanyName?.toLowerCase() ?? false
        ) ?? { id: '', tables: [], displayName: '' };

        if (company.id !== '') {
            const different = differencesOfTables(company, filter);
            if (different.length > 0) {
                const newFilter = [...filter].concat(
                    different.map((tableID) => ({
                        tableID,
                        tableFilters: defaultFilterParams,
                    }))
                );
                setFilters([...newFilter]);
            }

            //setDisplayedCompany(company);
            setPage(<HiringCampaignPage />);
            setCurrentPath(HIRING_CAMPAIGNS_URL(company.id));
            setCurrentCompany(company);
            updateHiringTablesResult(company, filter);
        } else {
            setPage(<ErrorPage />);
            setCurrentPath(HIRING_CAMPAIGNS_URL(CompanyName || ''));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CompanyName]);

    const settingsToString = (table: CandidateTableSettings) =>
        `${table.table}${table.filters.join(':')}${table.sorting.fn}${
            table.sorting.isIncrease ? 'up' : 'down'
        }`;
    useEffect(() => {
        if (filter === undefined && url.length > 0) {
            setTablesSettings([...url]);
            return;
        }

        if (url.length > 0 && notEqualTablesSettings(url, tSettings)) {
            if (notEqualFilters(urlFilter, filter) && filter.length > 0) {
                setComeChange(true);
                setSavedUrl([...url]);
                setSavedUrlFilter([...urlFilter]);
                navigate(HIRING_CAMPAIGNS_SWITCH_MODE_URL(displayedCompany.id));
            } else {
                setTablesSettings([...url]);
                return;
            }
        }

        if (filter.length === 0) {
            const newFilter = displayedCompany.tables.map((tableID) => ({
                tableID,
                tableFilters: defaultFilterParams,
            }));
            setFilters(newFilter);
            updateHiringTablesResult(displayedCompany, newFilter);
            return;
        }

        if (
            previousURLFilter !==
            tSettings.map((table) => settingsToString(table)).join('-')
        ) {
            setPreviousUrlFilter(
                tSettings.map((table) => settingsToString(table)).join('-')
            );
            setTablesSettings([...tSettings]);
        }
    }, [url, displayedCompany]);

    useEffect(() => {
        if (needClearCategory) {
            setNeedClearCategory(false);
            setSelectedCategory(TaskCategories.notSelected);
            return;
        }
        if (selectedCategory !== TaskCategories.notSelected) {
            navigate(TASKS_BY_CATEGORY_URL(selectedCategory));
            setNeedClearCategory(true);
        }
    }, [selectedCategory]);

    return returnPage;
};

export default HiringCampaignsPageValidator;

export const findResult = (table: CandidateTable, filter: boolean[]) => {
    return {
        tableID: table.id,

        pending:
            table.table.length -
            table.table.filter((candidate) =>
                fakeFilterData
                    .filter((_rank, index) => !filter[index])
                    .map((rank) => rank.id)
                    .includes(candidate.rank)
            ).length,

        filtered:
            table.table.length -
            table.table.filter((candidate) =>
                fakeFilterData
                    .filter((_rank, index) => filter[index])
                    .map((rank) => rank.id)
                    .includes(candidate.rank)
            ).length,
        total: table.table.length,
    };
};
