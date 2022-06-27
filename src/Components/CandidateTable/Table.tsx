import { config, useTransition, animated } from '@react-spring/web';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import {
    doPassiveMode,
    currentSortFunction,
} from '../../Atoms/CandidatesSorting';
import { currentTable, tableData } from '../../Atoms/CandidateTables';
import {
    SortingMode,
    SortingTriangle,
    SortingTriangles,
} from '../../Atoms/candidateTableTypes';
import { tablesSettingsURL } from '../../Atoms/LoadData';
import { filterData } from './filterData';

const getDefaultValuesSortingTriangles = () =>
    new Map<string, SortingTriangle>([
        ['score', { mode: SortingMode.decPassive }],
        ['date', { mode: SortingMode.decPassive }],
        ['status', { mode: SortingMode.decPassive }],
    ]);

const Table = () => {
    const animationDuration = 200;

    const [candidates] = useAtom(tableData);
    const [sortingFunction, setSortFunction] = useAtom(currentSortFunction);
    const [url] = useAtom(tablesSettingsURL);
    const [allTableData, setCurrentTable] = useAtom(currentTable);

    // In default values need be all triangles who will used in table.
    // Else they will have state SortingMode.undefined ('#') while user don't click them.
    const [sortingTriangles, setSortingTriangles] = useState<SortingTriangles>(
        getDefaultValuesSortingTriangles()
    );

    const randomOffset = () => {
        return Math.random() > 0.5
            ? (Math.random() + 0.6) * 200
            : -(Math.random() + 0.6) * 100;
    };

    const transitions = useTransition(candidates, {
        keys: (candidate) => candidate.hash,
        from: (candidate) => ({ opacity: 0, left: randomOffset() }),
        enter: { opacity: 1, left: 0 },
        leave: (candidate) => ({ opacity: 0, left: randomOffset() }),
        config: { ...config.slow, duration: animationDuration },
    });

    const rankColor = (rankName: string): string => {
        const rank = filterData.find((rank) => rank.id === rankName);
        return rank === undefined ? 'FFFFFF' : rank.color;
    };

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

        setCurrentTable({ ...allTableData, table: [...allTableData.table] });
        setSortingTriangles(newSortingTriangles);
    }, [sortingFunction, url]);

    const handleClickSorting = (sortingType: string) => {
        // Changing state of sorting function atom will trigger use effect above, for updating display
        setCurrentTable({ ...allTableData, table: [] });
        setTimeout(() => {
            setCurrentTable({
                ...allTableData,
                table: [...allTableData.table],
            });
        }, animationDuration);
        setSortFunction({
            fn: sortingType,
            isIncrease:
                sortingType === sortingFunction.fn
                    ? !sortingFunction.isIncrease
                    : sortingTriangles.get(sortingType)?.mode ===
                      SortingMode.incPassive,
        });
    };

    const formatDate = (date: Date) => date.toLocaleDateString();
    const formatHash = (hash: string) => hash.substring(hash.length - 8);

    return (
        <div className="tableDiv">
            <div className="tableDivHeaderRow">
                <div className="flex w-20 sm:w-24 md:w-32 lg:w-52 tableDivHeaderCell items-center justify-center">
                    Candidate
                </div>
                <div
                    className="flex w-16 sm:w-20 md:w-24 lg:w-24 tableDivHeaderCell items-center justify-center"
                    onClick={() => handleClickSorting('score')}
                >
                    <div>Score</div>
                    <div className="text-sm text-center p-2">
                        {sortingTriangles.get('score')?.mode ??
                            SortingMode.undefined}
                    </div>
                </div>
                <div
                    className="flex w-16 sm:w-20 md:w-24 lg:w-32 tableDivHeaderCell items-center justify-center"
                    onClick={() => handleClickSorting('score')}
                >
                    Score(%)
                    <div className="text-sm text-center p-2">
                        {sortingTriangles.get('score')?.mode ??
                            SortingMode.undefined}
                    </div>
                </div>
                <div
                    className="flex w-20 sm:w-32 md:w-36 lg:w-40 tableDivHeaderCell md:px-12 items-center justify-center"
                    onClick={() => handleClickSorting('status')}
                >
                    Status
                    <div className="text-sm text-center p-2">
                        {sortingTriangles.get('status')?.mode ??
                            SortingMode.undefined}
                    </div>
                </div>
                <div
                    className="flex w-20 sm:w-24 md:w-32 lg:w-52 tableDivHeaderCell items-center justify-center"
                    onClick={() => handleClickSorting('date')}
                >
                    Finish date
                    <div className="text-sm text-center p-2">
                        {sortingTriangles.get('date')?.mode ??
                            SortingMode.undefined}
                    </div>
                </div>
            </div>
            <div>
                {transitions((style, candidate, _) => (
                    <animated.div
                        className="tableDivRow"
                        style={{
                            position: 'relative',
                            ...style,
                        }}
                    >
                        <div className=" w-20 sm:w-24 md:w-32 lg:w-52 tableDivCell">
                            <div
                                className={`border-l-4 w-40 border-${rankColor(
                                    candidate.rank
                                )}`}
                            >
                                {formatHash(candidate.hash)}
                            </div>
                        </div>
                        <div className=" w-16 sm:w-20 md:w-24 lg:w-24 tableDivCell">
                            <div>{candidate.score}</div>
                        </div>
                        <div className=" w-16 sm:w-20 md:w-24 lg:w-32 tableDivCell">
                            <div>{candidate.scorePercent}%</div>
                        </div>
                        <div className=" w-20 sm:w-32 md:w-36 lg:w-40 tableDivCell text-sm md:text-base">
                            <div>{candidate.userStatus}</div>
                        </div>
                        <div className=" w-20 sm:w-24 md:w-32 lg:w-52 tableDivCell">
                            <div>{formatDate(candidate.taskEndDate)}</div>
                        </div>
                    </animated.div>
                ))}
            </div>
        </div>
    );
};

export default Table;
