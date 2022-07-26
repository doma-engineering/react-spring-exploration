import Tippy from '@tippyjs/react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { ReactNode, useEffect, useState } from 'react';
import {
    candidateSortingFunctionsTypes,
    doPassiveMode,
} from '../../Atoms/CandidatesSorting';
import { currentTable } from '../../Atoms/CandidateTables';
import {
    getDefaultValuesSortingTriangles,
    Rank,
    SortingMode,
    SortingTriangle,
    SortingTriangles,
    UserStatus,
} from '../../Atoms/candidateTableTypes';
import { savedTablesSettingsURL, tablesSettings } from '../../Atoms/LoadData';
import { defaultFilterParams } from '../../Atoms/mocks/fakeData';
import {
    candidateSwitchStatus,
    selectedType,
    switcherMouseHoverTable,
} from '../../Atoms/SwithersAtoms';
import { filterData } from '../Filters/filterData';

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

const selectedSorting = atom((get) => {
    const oldTable = get(tablesSettings).find(
        (table) => table.table === get(currentTable).id
    );
    const newTable = get(savedTablesSettingsURL).find(
        (table) => table.table === get(currentTable).id
    );

    const oldSorting = oldTable?.sorting ?? { fn: 'date', isIncrease: false };
    const newSorting = newTable?.sorting ?? { fn: 'date', isIncrease: false };

    const selectedSorting =
        get(switcherMouseHoverTable) === selectedType.none
            ? oldSorting
            : get(switcherMouseHoverTable) === selectedType.new
            ? newSorting
            : oldSorting;

    return selectedSorting;
});

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
            candidateSortingFunctionsTypes.get(get(selectedSorting).fn)!(c1, c2)
        );

    if (get(selectedSorting).isIncrease) return dataDecrease.reverse();
    return dataDecrease;
});

const CandidateTableSwitcher = () => {
    const [mouseHoverVersion] = useAtom(switcherMouseHoverTable);
    const [data] = useAtom(tableData);
    const sortingFunction = useAtomValue(selectedSorting);

    const [sortingTriangles, setSortingTriangles] = useState<SortingTriangles>(
        getDefaultValuesSortingTriangles()
    );

    useEffect(() => {
        const newSortingTriangles = new Map<string, SortingTriangle>();

        //Do all triangles passive.
        sortingTriangles.forEach((triangleItem, columKey) => {
            newSortingTriangles.set(columKey, {
                mode: doPassiveMode(triangleItem.mode),
            });
        });

        // Current selected do active
        newSortingTriangles.set(sortingFunction.fn, {
            mode: sortingFunction.isIncrease
                ? SortingMode.incActive
                : SortingMode.decActive,
        });

        setSortingTriangles(newSortingTriangles);
    }, [sortingFunction]);

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
                <SwitcherHeaderCell
                    content={
                        <div className="flex justify-center items-center h-full">
                            <div className="hidden sm:block text-center">
                                Candidate
                            </div>
                            <div className="block sm:hidden text-center">
                                Rank
                            </div>
                        </div>
                    }
                    adaptation="w-10 
                                sm:w-24
                                md:w-32 
                                lg:w-52"
                />
                <SwitcherHeaderCell
                    content="Score"
                    adaptation="w-14 
                                sm:w-20 sm:flex sm:items-center sm:justify-center
                                md:w-24 
                                lg:w-24"
                    sortable={true}
                    sortingTriangle={sortingTriangles.get('score')}
                />
                <SwitcherHeaderCell
                    content="Score(%)"
                    adaptation="w-14 
                                sm:w-20 sm:flex sm:items-center sm:justify-center
                                md:w-24 
                                lg:w-32"
                    sortable={true}
                    sortingTriangle={sortingTriangles.get('score')}
                />
                <SwitcherHeaderCell
                    content="Status"
                    adaptation="w-20
                               sm:w-32 sm:flex sm:items-center sm:justify-center
                               md:w-36 
                               lg:w-40"
                    sortable={true}
                    sortingTriangle={sortingTriangles.get('status')}
                />
                <SwitcherHeaderCell
                    content="Finish date"
                    adaptation="w-20 
                               sm:w-24 sm:flex sm:items-center sm:justify-center
                               md:w-32 
                               lg:w-52"
                    sortable={true}
                    sortingTriangle={sortingTriangles.get('date')}
                />
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

const SwitcherHeaderCell = ({
    content,
    adaptation,
    sortable = false,
    sortingTriangle,
}: {
    content: ReactNode;
    adaptation?: string;
    sortable?: boolean;
    sortingTriangle?: SortingTriangle;
}) => {
    return (
        <Tippy
            className="bg-red-500/80 py-2 px-4 rounded-full text-sm text-stone-200"
            arrow={false}
            content={
                <div>
                    You <b className="text-slate-200">can't</b> change sorting{' '}
                    <b className="text-slate-200">in Switch Mode</b>
                </div>
            }
            disabled={!sortable}
            trigger="click"
            onShow={(instance) => {
                setTimeout(() => {
                    instance.hide();
                }, 800);
            }}
        >
            <div
                className={`tableDivHeaderCell
                            ${adaptation}`}
            >
                {content}
                {sortingTriangle ? (
                    <div className="text-sm text-center px-2">
                        {sortingTriangle.mode ?? SortingMode.undefined}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </Tippy>
    );
};

export default CandidateTableSwitcher;
