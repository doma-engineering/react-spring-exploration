import { atom } from "jotai";
import { atomWithHash } from "jotai/utils";
import { CandidateTableFilters } from "../Components/CandidateTable/candidateTableTypes";
import { defaultFilterParams } from "../Components/CandidateTable/fakeData";
import { currentTable } from "./CandidateTables";
import { createLocalStorageAtom, createSessionStorageAtom } from "./storageHelpsFunctions";

export const currentFilters = atom(
  //TODO: "?." is ok there?
  (get): boolean[] => get(filters)?.find((filter: CandidateTableFilters) => filter.tableID === get(currentTable).id).tableFilters ?? defaultFilterParams,
  (get, set, newFilterSelection: boolean[]) => set(filters,
    //TODO: ask john how better there.
    get(filters).map((filter: CandidateTableFilters) => {
      if (filter.tableID === get(currentTable).id)
        return { tableID: get(currentTable).id, tableFilters: newFilterSelection };
      return filter;
    })
  ),
);

export const filters = atom(
  (get) =>
    get(sessionFilters),
  (_get, set, arg: CandidateTableFilters[]) => {
    set(sessionFilters, arg);
    set(localStorageFilters, arg);
    set(urlFilters, arg);
  },
);

export const localStorageFilters = createLocalStorageAtom<CandidateTableFilters[]>("filters", []);

export const sessionFilters = createSessionStorageAtom<CandidateTableFilters[]>("filters", []);

export const urlFilters = atomWithHash<CandidateTableFilters[]>("Filters", []);