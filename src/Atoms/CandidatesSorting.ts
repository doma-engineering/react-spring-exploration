import { atom } from 'jotai';
import { currentTable } from './CandidateTables';
import {
    CandidateTableSettings,
    SortFunctionAtom,
    SortingFunction,
    SortingMode,
    UserStatus,
    userStatusSortingWeight,
} from './candidateTableTypes';
import { tablesSettings } from './LoadData';

const sortByScore: SortingFunction = (candidate1, candidate2) =>
    candidate2.score - candidate1.score;

const sortByDate: SortingFunction = (candidate1, candidate2) =>
    candidate2.taskEndDate.valueOf() - candidate1.taskEndDate.valueOf();

const getUserStatusSortingWeight = (status: UserStatus) =>
    userStatusSortingWeight.get(status) ?? -1;

const sortByStatus: SortingFunction = (candidate1, candidate2) =>
    getUserStatusSortingWeight(candidate2.userStatus) -
    getUserStatusSortingWeight(candidate1.userStatus);

export const candidateSortingFunctionsTypes = new Map<string, SortingFunction>([
    ['date', sortByDate],
    ['score', sortByScore],
    ['status', sortByStatus],
]);

export const defaultSortingParams: SortFunctionAtom = {
    fn: 'date',
    isIncrease: false,
};

export const currentSortFunction = atom(
    (get): SortFunctionAtom =>
        get(tablesSettings).find(
            (t: CandidateTableSettings) => t.table === get(currentTable).id
        )?.sorting ?? defaultSortingParams,
    (get, set, arg: SortFunctionAtom) =>
        set(
            tablesSettings,
            get(tablesSettings).map((table) => {
                if (table.table === get(currentTable).id)
                    return { ...table, sorting: arg };
                return table;
            })
        )
);

export const doPassiveMode = (before: SortingMode) => {
    if (before === SortingMode.decActive) return SortingMode.decPassive;
    if (before === SortingMode.incActive) return SortingMode.incPassive;
    return before;
};
