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
    <div className="bg-gray-700 p-3 rounded drop-shadow-xl">
      <div className="flex text-stone-300 text-lg font-medium">
        <div className="w-52 pb-2 text-center border-b-2 border-slate-800">Candidate</div>
        <div className="w-24 pb-2 text-center border-b-2 border-slate-800">Score</div>
        <div className="w-32 pb-2 text-center border-b-2 border-slate-800">Score(%)</div>
        <div className="w-40 pb-2 text-center border-b-2 border-slate-800 px-12">Status</div>
        <div className="w-52 pb-2 text-center border-b-2 border-slate-800">Finish date</div>
      </div>
      <div>
        {transitions(({ opacity }, candidate, _, index) => (
          <animated.div
            className="flex text-center align-middle h-16"
            style={{
              opacity,
            }}
          >
            <div className="w-52 text-center border-b-2 border-slate-800 text-slate-200 h-16 flex justify-center items-center" >
              <div className={`border-l-4 w-40 border-${rankColor(candidate.rank)}`}>
                {formatHash(candidate.hash)}
              </div>
            </div>
            <div className="w-24 border-b-2 border-slate-800 text-slate-200 h-16 flex justify-center items-center" >
              <div>
                {candidate.score}
              </div>
            </div>
            <div className="w-32 border-b-2 border-slate-800 text-slate-200 h-16 flex justify-center items-center" >
              <div>
                {candidate.scorePercent}%
              </div>
            </div>
            <div className="w-40 border-b-2 border-slate-800 text-slate-200 h-16" >
              <div>
                {candidate.userStatus}
              </div>
            </div>
            <div className="w-52 border-b-2 border-slate-800 text-slate-200 h-16" >
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
