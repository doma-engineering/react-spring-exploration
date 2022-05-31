import { config, useTransition, animated } from "@react-spring/web";
import { atom, useAtom } from "jotai";
import { currentTable } from "../../Atoms/CandidateTables";
import { currentFilters } from "../../Atoms/Filters";
import { filterData } from "../../Atoms/LoadData";

export const tableData = atom(
  (get) => get(currentTable).table
    .sort((item1, item2) => (item2.score - item1.score))
    .filter((candidate) => (
      get(filterData)
        .filter((_rank, index) => get(currentFilters)[index])
        .map(rank => rank.id)
        .includes(candidate.rank)
    ))
)

const Table = () => {

  const [candidates] = useAtom(tableData);
  const [filter] = useAtom(filterData);

  const transitions = useTransition(candidates, {
    keys: item => item.hash,
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 60 },
    leave: { opacity: 0, height: 0 },
    config: { ...config.slow, duration: 400 }
  });

  const rankColor = (rankName: string): string => {
    const rank = filter.find(rank => rank.id === rankName);
    return rank === undefined ? "FFFFFF" : rank.color;
  }

  const formatDate = (date: Date) => (date.toLocaleDateString());
  const formatHash = (hash: string) => (hash.substring(hash.length - 8));

  return (
    <div className="tableDiv">
      <div className="tableDivHeaderRow">
        <div className=" w-20 sm:w-24 md:w-32 lg:w-52 tableDivHeaderCell">Candidate</div>
        <div className=" w-16 sm:w-20 md:w-24 lg:w-24 tableDivHeaderCell">Score</div>
        <div className=" w-16 sm:w-20 md:w-24 lg:w-32 tableDivHeaderCell">Score(%)</div>
        <div className=" w-20 sm:w-32 md:w-36 lg:w-40 tableDivHeaderCell md:px-12">Status</div>
        <div className=" w-20 sm:w-24 md:w-32 lg:w-52 tableDivHeaderCell">Finish date</div>
      </div>
      <div>
        {transitions(({ opacity }, candidate) => (
          <animated.div
            className="tableDivRow"
            style={{
              opacity,
            }}
          >
            <div className=" w-20 sm:w-24 md:w-32 lg:w-52 tableDivCell" >
              <div className={`border-l-4 w-40 border-${rankColor(candidate.rank)}`}>
                {formatHash(candidate.hash)}
              </div>
            </div>
            <div className=" w-16 sm:w-20 md:w-24 lg:w-24 tableDivCell" >
              <div>
                {candidate.score}
              </div>
            </div>
            <div className=" w-16 sm:w-20 md:w-24 lg:w-32 tableDivCell" >
              <div>
                {candidate.scorePercent}%
              </div>
            </div>
            <div className=" w-20 sm:w-32 md:w-36 lg:w-40 tableDivCell text-sm md:text-base" >
              <div>
                {candidate.userStatus}
              </div>
            </div>
            <div className=" w-20 sm:w-24 md:w-32 lg:w-52 tableDivCell" >
              <div>
                {formatDate(candidate.taskEndDate)}
              </div>
            </div>
          </animated.div>
        ))}
      </div>
    </div >
  );
}

export default Table;
