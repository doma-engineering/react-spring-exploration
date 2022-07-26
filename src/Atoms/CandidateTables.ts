import { atom } from 'jotai';
import { filterData } from '../Components/Filters/filterData';
import {
    candidateSortingFunctionsTypes,
    currentSortFunction,
} from './CandidatesSorting';
import {
    CandidateTable,
    TaskCategories,
    TaskTiers,
} from './candidateTableTypes';
import { currentFilters } from './Filters';

export const emptyTable: CandidateTable = {
    id: '',
    category: TaskCategories.notSelected,
    tier: TaskTiers.base,
    displayName: '',
    table: [],
};

export const currentTable = atom<CandidateTable>(emptyTable);

export const tableData = atom((get) => {
    const dataDecrease = get(currentTable)
        .table.sort((item1, item2) =>
            (
                candidateSortingFunctionsTypes.get(
                    get(currentSortFunction).fn
                ) ?? candidateSortingFunctionsTypes.get('date')!
            )(
                //if sortFunction haven't in candidateSortingFunctions will called sorting by date.
                item1,
                item2
            )
        )
        .filter((candidate) =>
            filterData
                .filter((_rank, index) => get(currentFilters)[index])
                .map((rank) => rank.id)
                .includes(candidate.rank)
        );
    if (get(currentSortFunction).isIncrease) return dataDecrease.reverse();
    return dataDecrease;
});
