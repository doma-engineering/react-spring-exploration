import { atom, useAtom } from 'jotai';
import { currentTable } from '../../Atoms/CandidateTables';
import { Rank, UserStatus } from '../../Atoms/candidateTableTypes';
import { filters, savedUrlFilters } from '../../Atoms/Filters';
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

const tableData = atom((get) =>
    get(currentTable)
        .table.map((candidate) => {
            const oldF = get(filters).find(
                (filter) => filter.tableID === get(currentTable).id
            )?.tableFilters ?? [false, false, false, false];
            const newF = get(savedUrlFilters).find(
                (filter) => filter.tableID === get(currentTable).id
            )?.tableFilters ?? [false, false, false, false];

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
);

const CandidateTableSwitcher = () => {
    const [mouseHoverVersion] = useAtom(switcherMouseHoverTable);
    const [data] = useAtom(tableData);

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
                <div className=" w-20 sm:w-24 md:w-32 lg:w-52 tableDivHeaderCell">
                    Candidate
                </div>
                <div className=" w-16 sm:w-20 md:w-24 lg:w-24 tableDivHeaderCell">
                    Score
                </div>
                <div className=" w-16 sm:w-20 md:w-24 lg:w-32 tableDivHeaderCell">
                    Score(%)
                </div>
                <div className=" w-20 sm:w-32 md:w-36 tableDivHeaderCell md:px-12">
                    Status
                </div>
                <div className=" w-20 sm:w-24 md:w-32 tableDivHeaderCell">
                    Finish date
                </div>
            </div>
            {data.map((candidate) => (
                <div className={displayType(candidate)} key={candidate.hash}>
                    <div className=" w-20 sm:w-24 md:w-32 lg:w-52 tableDivCell">
                        <div
                            className={`border-l-4 w-40 border-${rankColor(
                                candidate.rank
                            )}`}
                        >
                            {formatHash(candidate.hash)}
                        </div>
                    </div>
                    <div className=" w-16 sm:w-20 md:w-24 tableDivCell">
                        <div>{candidate.score}</div>
                    </div>
                    <div className=" w-16 sm:w-20 md:w-24 lg:w-32 tableDivCell">
                        <div>{candidate.scorePercent}%</div>
                    </div>
                    <div className=" w-20 sm:w-32 md:w-36 lg:w-40 tableDivCell">
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
