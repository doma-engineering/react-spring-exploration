import { config, useTransition, animated } from "@react-spring/web";
import { atom, useAtom } from "jotai";
import { useState } from "react";
import { currentTable } from "../../Atoms/CandidateTables";
import { Candidate } from "../../Atoms/candidateTableTypes";
import { currentFilters } from "../../Atoms/Filters";
import { filterData } from "./filterData";

export const tableData = atom(
  (get) => {
    const temp = get(currentTable).table
      .sort((item1, item2) => (get(sortFunction).fn(item1, item2)))
      .filter((candidate) => (
        filterData
          .filter((_rank, index) => get(currentFilters)[index])
          .map(rank => rank.id)
          .includes(candidate.rank)
      ))
    if (get(sortFunction).isReverse) return temp.reverse();
    return temp;
  }
)

enum SortingMode {
  incPassive = "△",
  incActive = "▲",
  decPassive = "▽",
  decActive = "▼",
}

type SortingFunction = (candidate1: Candidate, candidate2: Candidate) => number

type SortingTriangle = {
  mode: SortingMode,
  sortingFunction: SortingFunction,
  isReverse: boolean,
  linkedTriangles: string[], //names from SortedTriangles
}

type SortingTriangles = Map<string, SortingTriangle>;

const findNewSortingMode = (before: SortingMode): SortingMode => {
  switch (before) {
    case SortingMode.incPassive:
      return SortingMode.incActive;
    case SortingMode.incActive:
      return SortingMode.decActive;
    case SortingMode.decPassive:
      return SortingMode.decActive;
    case SortingMode.decActive:
      return SortingMode.incActive;
    default:
      return SortingMode.decPassive;
  }
}

const doPassiveMode = (before: SortingMode) => {
  if (before === SortingMode.decActive) return SortingMode.decPassive;
  if (before === SortingMode.incActive) return SortingMode.incPassive;
  return before;
}

const getDefaultValuesSortingTriangles = () => {
  const sortingTriangles: SortingTriangles = new Map<string, SortingTriangle>();
  sortingTriangles.set("score",
    {
      mode: SortingMode.decPassive,
      sortingFunction: sortByScore,
      isReverse: false,
      linkedTriangles: ["scorePercent"],
    });
  sortingTriangles.set("scorePercent",
    {
      mode: SortingMode.decPassive,
      sortingFunction: sortByScore,
      isReverse: false,
      linkedTriangles: ["score"],
    });
  sortingTriangles.set("date",
    {
      mode: SortingMode.decPassive,
      sortingFunction: sortByDate,
      isReverse: false,
      linkedTriangles: [],
    });
  return sortingTriangles;
}

const sortByScore = (candidate1: Candidate, candidate2: Candidate) =>
  (candidate2.score - candidate1.score)

const sortByDate = (candidate1: Candidate, candidate2: Candidate) =>
  (candidate2.taskEndDate.valueOf() - candidate1.taskEndDate.valueOf())

// by default sort function need be decreased (from hight to low values).
type SortFunction = { fn: SortingFunction, isReverse: boolean }
const sortFunction = atom<SortFunction>({ fn: sortByScore, isReverse: false });

const Table = () => {

  const [candidates] = useAtom(tableData);
  const [, setSortFunction] = useAtom(sortFunction);

  const [sortingTriangles, setSortingTriangles] = useState<SortingTriangles>(getDefaultValuesSortingTriangles());

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

  const handleClickSortingTriangle = (columName: string) => {

    const currentTriangle = sortingTriangles.get(columName);
    if (currentTriangle === undefined) return;

    const newTriangleMode = findNewSortingMode(currentTriangle.mode);
    const newCurrentTriangle: SortingTriangle = {
      mode: newTriangleMode,
      sortingFunction: currentTriangle.sortingFunction,
      isReverse: ((newTriangleMode === SortingMode.incActive) || (newTriangleMode === SortingMode.incPassive)),
      linkedTriangles: currentTriangle.linkedTriangles,
    };

    const newSortingTriangles = new Map<string, SortingTriangle>()
    sortingTriangles.forEach((triangleItem, columKey) => {
      if (columKey === columName) {
        newSortingTriangles.set(columKey, newCurrentTriangle);
      } else {
        newSortingTriangles.set(columKey,
          {
            mode: doPassiveMode(triangleItem.mode),
            sortingFunction: triangleItem.sortingFunction,
            isReverse: ((triangleItem.mode === SortingMode.incActive) || (triangleItem.mode === SortingMode.incPassive)),
            linkedTriangles: triangleItem.linkedTriangles,
          }
        );
      }
    })

    currentTriangle.linkedTriangles.forEach((linkedTriangle) => {
      newSortingTriangles.set(linkedTriangle,
        {
          ...newCurrentTriangle,
          linkedTriangles: sortingTriangles.get(linkedTriangle)!.linkedTriangles // need be save each triangles correct links
        })
    });

    setSortingTriangles(newSortingTriangles);
    setSortFunction({ fn: currentTriangle.sortingFunction, isReverse: newSortingTriangles.get(columName)!.isReverse });
  }

  const formatDate = (date: Date) => (date.toLocaleDateString());
  const formatHash = (hash: string) => (hash.substring(hash.length - 8));

  return (
    <div className="tableDiv">
      <div className="tableDivHeaderRow">
        <div className="flex w-20 sm:w-24 md:w-32 lg:w-52 tableDivHeaderCell items-center justify-center">
          Candidate
        </div>
        <div className="flex w-16 sm:w-20 md:w-24 lg:w-24 tableDivHeaderCell items-center justify-center">
          <div>Score</div>
          <div
            className="text-sm text-center p-2"
            onClick={() => handleClickSortingTriangle("score")}
          >
            {sortingTriangles.get("score")?.mode ?? "#"}
          </div>
        </div>
        <div className="flex w-16 sm:w-20 md:w-24 lg:w-32 tableDivHeaderCell items-center justify-center">
          Score(%)
          <div
            className="text-sm text-center p-2"
            onClick={() => handleClickSortingTriangle("scorePercent")}
          >
            {sortingTriangles.get("scorePercent")?.mode ?? "#"}
          </div>
        </div>
        <div className="flex w-20 sm:w-32 md:w-36 lg:w-40 tableDivHeaderCell md:px-12 items-center justify-center">
          Status
        </div>
        <div className="flex w-20 sm:w-24 md:w-32 lg:w-52 tableDivHeaderCell items-center justify-center">
          Finish date
          <div
            className="text-sm text-center p-2"
            onClick={() => handleClickSortingTriangle("date")}
          >
            {sortingTriangles.get("date")?.mode ?? "#"}
          </div>
        </div>
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