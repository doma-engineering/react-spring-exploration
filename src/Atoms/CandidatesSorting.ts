import { atom } from "jotai";
import { SortFunctionAtom, SortingFunction, SortingMode, userStatusSortingWeight } from "./candidateTableTypes";

const sortByScore: SortingFunction = (candidate1, candidate2) => (
  candidate2.score - candidate1.score
);

const sortByDate: SortingFunction = (candidate1, candidate2) => (
  candidate2.taskEndDate.valueOf() - candidate1.taskEndDate.valueOf()
);

const sortByStatus: SortingFunction = (candidate1, candidate2) => (
  userStatusSortingWeight.get(candidate2.userStatus)! - userStatusSortingWeight.get(candidate1.userStatus)!
);

export const candidateSortingFunctionsTypes = new Map<string, SortingFunction>([
  ["date", sortByDate],
  ["score", sortByScore],
  ["status", sortByStatus],
]);

export const sortFunction = atom<SortFunctionAtom>({ fn: "sortByDate", isIncrease: false });

export const doPassiveMode = (before: SortingMode) => {
  if (before === SortingMode.decActive) return SortingMode.decPassive;
  if (before === SortingMode.incActive) return SortingMode.incPassive;
  return before;
}