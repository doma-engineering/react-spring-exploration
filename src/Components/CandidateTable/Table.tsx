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
    <div className='CandidateTable'>
      <tr>
        <th>Candidate</th>
        <th>Score</th>
        <th>Score(%)</th>
        <th>Status</th>
        <th>Finish date</th>
      </tr>
      {transitions(({ opacity, height }, candidate, _, index) => (
        <animated.tr
          className="CandidateBox"
          style={{
            borderLeftColor: rankColor(candidate.rank),
            opacity,
            height,
            scaleY: opacity,
            background: (index % 2 === 0) ? "rgb(280, 190, 100)" : "rgb(230, 100, 37)",
            borderLeftWidth: "0.4rem"
          }}
        >
          <animated.td style={{ height }}> {formatHash(candidate.hash)} </animated.td>
          <animated.td style={{ height }}> {candidate.score}                </animated.td>
          <animated.td style={{ height }}> {candidate.scorePercent}         </animated.td>
          <animated.td style={{ height }}> {candidate.userStatus}           </animated.td>
          <animated.td style={{ height }}> {formatDate(candidate.taskEndDate)} </animated.td>
        </animated.tr>
      ))}
    </div>
  );
}

export default Table;
