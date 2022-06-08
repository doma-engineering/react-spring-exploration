import { config, useTransition, animated } from "@react-spring/web";
import { atom, useAtom } from "jotai";
import { currentTable } from "../../Atoms/CandidateTables";
import { currentFilters } from "../../Atoms/Filters";
import { filterData } from "./filterData";

export const tableData = atom(
  (get) => get(currentTable).table
    .sort((item1, item2) => (item2.score - item1.score))
    .filter((candidate) => (
      filterData
        .filter((_rank, index) => get(currentFilters)[index])
        .map(rank => rank.id)
        .includes(candidate.rank)
    ))
)

const Table = () => {

  const [candidates] = useAtom(tableData);

  const randomOffset = () => {
    return Math.random() > .5 ?
      (Math.random() + .6) * 200 :
      -(Math.random() + .6) * 100;
  }

  const transitions = useTransition(candidates, {
    keys: item => item.hash,
    from: (candidate) => ({ opacity: 0, left: randomOffset() }),
    enter: { opacity: 1, left: 0 },
    leave: (candidate) => ({ opacity: 0, left: randomOffset() }),
    config: { ...config.slow, duration: 200 }
  });

  const rankColor = (rankName: string): string => {
    const rank = filterData.find(rank => rank.id === rankName);
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
        {transitions((style, candidate, _) => (
          <animated.div
            className="tableDivRow"
            style={{
              position: "relative",
              ...style
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
