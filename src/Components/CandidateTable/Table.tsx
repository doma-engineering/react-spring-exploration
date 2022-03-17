import { config, useTransition, animated } from "@react-spring/web";
import { atom, useAtom } from "jotai";
import { candidatesData, filterData } from "./candidateTableAtoms";

export const tableData = atom(
  (get) => get(candidatesData)
    .sort((item1, item2) => (item2.score - item1.score))
    .filter(
      (candidate) => (
        get(filterData)
          .filter(rank => rank.isSelected)
          .map(rank => rank.name)
          .includes(candidate.rank)
      )
    )
)

const Table = () => {

  const [candidates] = useAtom(tableData);
  const [filter] = useAtom(filterData);

  const transitions = useTransition(candidates, {
    keys: item => item.name,
    from: { opacity: 0, height: 0 },
    enter: { opacity: 1, height: 40 },
    leave: { opacity: 0, height: 0 },
    config: { ...config.slow, duration: 400 }
  });

  const rankColor = (rankName: string): string => {
    const rank = filter.find(rank => rank.name === rankName)
    return rank === undefined ? "FFFFFF" : rank.color;
  }

  return (
    <div className='CandidateTable'>
      {
        transitions(({ opacity, height }, candidate, _, index) => (
          <animated.div
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
            {candidate.nick}: {candidate.score}
          </animated.div>
        ))
      }
    </div>
  );
}

export default Table;