import { atom } from "jotai";
import { filterData } from "../Components/CandidateTable/filterData";
import { candidateSortingFunctionsTypes, currentSortFunction } from "./CandidatesSorting";
import { CandidateTable } from "./candidateTableTypes";
import { currentFilters } from "./Filters";

export const currentTable = atom<CandidateTable>({ id: "", displayName: "", table: [] });

export const tableData = atom(
  (get) => {
    const dataDecrease = get(currentTable).table
      .sort((item1, item2) => (
        candidateSortingFunctionsTypes.get(get(currentSortFunction).fn)
        ?? candidateSortingFunctionsTypes.get("date")!               //if sortFunction haven't in candidateSortingFunctions will called sorting by date.
      )(item1, item2)
      )
      .filter((candidate) => (
        filterData
          .filter((_rank, index) => get(currentFilters)[index])
          .map(rank => rank.id)
          .includes(candidate.rank)
      ))
    if (get(currentSortFunction).isIncrease) return dataDecrease.reverse();
    return dataDecrease;
  }
)