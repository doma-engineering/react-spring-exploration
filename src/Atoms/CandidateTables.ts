import { atom } from "jotai";
import { filterData } from "../Components/CandidateTable/filterData";
import { candidateSortingFunctionsTypes, sortFunction } from "./CandidatesSorting";
import { CandidateTable } from "./candidateTableTypes";
import { currentFilters } from "./Filters";

export const currentTable = atom<CandidateTable>({ id: "", displayName: "", table: [] });

export const tableData = atom(
  (get) => {
    const temp = get(currentTable).table
      .sort((item1, item2) => (
        candidateSortingFunctionsTypes.get(get(sortFunction).fn)
        ?? candidateSortingFunctionsTypes.get("date")!               //if sortFunction haven't in candidateSortingFunctions will called sorting by date.
      )(item1, item2)
      )
      .filter((candidate) => (
        filterData
          .filter((_rank, index) => get(currentFilters)[index])
          .map(rank => rank.id)
          .includes(candidate.rank)
      ))
    if (get(sortFunction).isIncrease) return temp.reverse();
    return temp;
  }
)