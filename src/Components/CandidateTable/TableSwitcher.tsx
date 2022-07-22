import { atom, useAtom } from 'jotai';
import { useState } from 'react';
import {
    candidateSortingFunctionsTypes,
    currentSortFunction,
} from '../../Atoms/CandidatesSorting';
import { currentTable } from '../../Atoms/CandidateTables';
import {
    getDefaultValuesSortingTriangles,
    Rank,
    SortingMode,
    SortingTriangles,
    UserStatus,
} from '../../Atoms/candidateTableTypes';
import { filters, savedUrlFilters } from '../../Atoms/Filters';
import { savedTablesSettingsURL, tablesSettings } from '../../Atoms/LoadData';
import { defaultFilterParams } from '../../Atoms/mocks/fakeData';
import {
    candidateSwitchStatus,
    selectedType,
    switcherMouseHoverTable,
} from '../../Atoms/SwithersAtoms';
import { filterData } from './filterData';

type CandidateInSwitching = {
    switchStatus: candidateSwitchStatus;
    hash: string;
    score: number;
    scorePercent: number;
    rank: Rank;
    taskStartDate: Date;
    taskEndDate: Date;
    userStatus: UserStatus;
};

const tableData = atom((get) => {
    const oldTable = get(tablesSettings).find(
        (table) => table.table === get(currentTable).id
    );
    const newTable = get(savedTablesSettingsURL).find(
        (table) => table.table === get(currentTable).id
    );

    // filters
    const oldF = oldTable?.filters ?? defaultFilterParams;
    const newF = newTable?.filters ?? defaultFilterParams;

    const oldSorting = oldTable?.sorting;
    const newSorting = newTable?.sorting;

    const selectedSorting =
        get(switcherMouseHoverTable) === selectedType.none
            ? oldSorting
            : get(switcherMouseHoverTable) === selectedType.new
            ? newSorting
            : oldSorting;

    const dataDecrease = get(currentTable)
        .table.map((candidate) => {
            // transform each candidate to candidate with switch status.
            // switch status is position on table: is candidate removed or added, in both tables or no one.

            // rank index for current candidate.
            const rankIndex = filterData.findIndex(
                (rank) => rank.id === candidate.rank
            );

            if (oldF[rankIndex] && newF[rankIndex]) {
                return {
                    ...candidate,
                    switchStatus: candidateSwitchStatus.inBoth,
                };
            }
            if (oldF[rankIndex])
                return {
                    ...candidate,
                    switchStatus: candidateSwitchStatus.removed,
                };
            if (newF[rankIndex])
                return {
                    ...candidate,
                    switchStatus: candidateSwitchStatus.added,
                };

            return {
                ...candidate,
                switchStatus: candidateSwitchStatus.notDisplayed,
            };
        })
        .filter((c) => c.switchStatus !== candidateSwitchStatus.notDisplayed)
        .sort((c1, c2) =>
            //if currentSortFunction haven't in candidateSortingFunctionsTypes will called sorting by date.
            candidateSortingFunctionsTypes.get(selectedSorting?.fn ?? 'date')!(
                c1,
                c2
            )
        );

    if (selectedSorting?.isIncrease) return dataDecrease.reverse();
    return dataDecrease;
});

const CandidateTableSwitcher = () => {
    const [mouseHoverVersion] = useAtom(switcherMouseHoverTable);
    const [data] = useAtom(tableData);

    const [sortingTriangles, setSortingTriangles] = useState<SortingTriangles>(
        getDefaultValuesSortingTriangles()
    );

    const handleClickSorting = (s: any) => {};

    const formatDate = (date: Date) => date.toLocaleDateString();
    const formatHash = (hash: string) => hash.substring(hash.length - 8);
    const rankColor = (rankName: string): string => {
        const rank = filterData.find((rank) => rank.id === rankName);
        return rank === undefined ? 'white' : rank.color;
    };

    const displayType = (candidate: CandidateInSwitching): string => {
        if (mouseHoverVersion === selectedType.new) {
            if (candidate.switchStatus !== candidateSwitchStatus.removed)
                return 'tableDivRow-selected';
            return 'tableDivRow-lowContrast line-through';
        }
        if (mouseHoverVersion === selectedType.old) {
            if (candidate.switchStatus !== candidateSwitchStatus.added)
                return 'tableDivRow-selected';
            return 'tableDivRow-lowContrast line-through';
        }

        if (candidate.switchStatus === candidateSwitchStatus.added)
            return 'tableDivRow-new';
        if (candidate.switchStatus === candidateSwitchStatus.removed)
            return 'tableDivRow-removed';
        return 'tableDivRow';
    };

    return (
        <div className="tableDiv">
            <div className="tableDivHeaderRow">
                <div
                    className="flex tableDivHeaderCell items-center justify-center
                                w-10 
                                sm:w-24
                                md:w-32 
                                lg:w-52"
                >
                    <div className="hidden sm:block text-center">Candidate</div>
                    <div className="block sm:hidden text-center">Rank</div>
                </div>
                <button
                    className="tableDivHeaderCell
                               w-14 
                               sm:w-20 sm:flex sm:items-center sm:justify-center
                               md:w-24 
                               lg:w-24"
                    onClick={() => handleClickSorting('score')}
                >
                    <div>Score</div>
                    <div className="text-sm text-center px-2">
                        {sortingTriangles.get('score')?.mode ??
                            SortingMode.undefined}
                    </div>
                </button>
                <div
                    className="tableDivHeaderCell
                               w-14 
                               sm:w-20 sm:flex sm:items-center sm:justify-center
                               md:w-24 
                               lg:w-32"
                    onClick={() => handleClickSorting('score')}
                >
                    Score(%)
                    <div className="text-sm text-center px-2">
                        {sortingTriangles.get('score')?.mode ??
                            SortingMode.undefined}
                    </div>
                </div>
                <div
                    className="tableDivHeaderCell
                               w-20
                               sm:w-32 sm:flex sm:items-center sm:justify-center
                               md:w-36 
                               lg:w-40"
                    onClick={() => handleClickSorting('status')}
                >
                    Status
                    <div className="text-sm text-center px-2">
                        {sortingTriangles.get('status')?.mode ??
                            SortingMode.undefined}
                    </div>
                </div>
                <div
                    className="tableDivHeaderCell
                               w-20 
                               sm:w-24 sm:flex sm:items-center sm:justify-center
                               md:w-32 
                               lg:w-52"
                    onClick={() => handleClickSorting('date')}
                >
                    Finish date
                    <div className="text-sm text-center px-2">
                        {sortingTriangles.get('date')?.mode ??
                            SortingMode.undefined}
                    </div>
                </div>
            </div>
            {data.map((candidate) => (
                <div className={displayType(candidate)} key={candidate.hash}>
                    <div className=" w-10 sm:w-24 md:w-32 lg:w-52 tableDivCell">
                        <div
                            className={`hidden sm:block border-l-4 w-40 border-${rankColor(
                                candidate.rank
                            )}`}
                        >
                            {formatHash(candidate.hash)}
                        </div>
                        <div
                            className={`block sm:hidden border-l-4 w-40 border-${rankColor(
                                candidate.rank
                            )}`}
                        >
                            {candidate.rank.slice(0, 3)}
                        </div>
                    </div>
                    <div className=" w-14 sm:w-20 md:w-24 lg:w-24 tableDivCell">
                        <div>{candidate.score}</div>
                    </div>
                    <div className=" w-14 sm:w-20 md:w-24 lg:w-32 tableDivCell">
                        <div>{candidate.scorePercent}%</div>
                    </div>
                    <div className=" w-20 sm:w-32 md:w-36 lg:w-40 tableDivCell text-sm md:text-base">
                        <div>{candidate.userStatus}</div>
                    </div>
                    <div className=" w-20 sm:w-24 md:w-32 lg:w-52 tableDivCell">
                        <div>{formatDate(candidate.taskEndDate)}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CandidateTableSwitcher;
