import { atom } from 'jotai';
import {
    CandidateTableFilters,
    CandidateTableSettings,
} from './candidateTableTypes';
import { defaultFilterParams } from './mocks/fakeData';
import { currentTable } from './CandidateTables';
import { filterSubscribeToSettingsAtom } from './storageHelpsFunctions';
import { tablesSettingsURL } from './LoadData';

export const currentFilters = atom(
    (get): boolean[] =>
        get(filters)?.find(
            (filter: CandidateTableFilters) =>
                filter.tableID === get(currentTable).id
        )?.tableFilters ?? defaultFilterParams,
    (get, set, newFilterSelection: boolean[]) =>
        set(
            filters,
            get(filters).map((filter: CandidateTableFilters) => {
                if (filter.tableID === get(currentTable).id)
                    return {
                        tableID: get(currentTable).id,
                        tableFilters: newFilterSelection,
                    };
                return filter;
            })
        )
);

export const filters = filterSubscribeToSettingsAtom();
export const urlFilters = atom((get): CandidateTableFilters[] =>
    get(tablesSettingsURL).map(
        (table: CandidateTableSettings): CandidateTableFilters => ({
            tableID: table.table,
            tableFilters: table.filters,
        })
    )
);

export const savedUrlFilters = atom<CandidateTableFilters[]>([]);

export const currentSavedUrlFilters = atom(
    (get): boolean[] =>
        get(savedUrlFilters)?.find(
            (filter: CandidateTableFilters) =>
                filter.tableID === get(currentTable).id
        )?.tableFilters ?? defaultFilterParams,
    (get, set, newFilterSelection: boolean[]) =>
        set(
            savedUrlFilters,
            get(savedUrlFilters).map((filter: CandidateTableFilters) => {
                if (filter.tableID === get(currentTable).id)
                    return {
                        tableID: get(currentTable).id,
                        tableFilters: newFilterSelection,
                    };
                return filter;
            })
        )
);

export const notEqualFilters = (
    urlFilter: CandidateTableFilters[],
    savedFilters: CandidateTableFilters[]
) =>
    !urlFilter.reduce(
        (answer, filterItem, index) =>
            answer &&
            (filterItem.tableID === savedFilters[index]?.tableID ?? false) &&
            filterItem.tableFilters.toString() ===
                savedFilters[index].tableFilters.toString(),
        true
    );
