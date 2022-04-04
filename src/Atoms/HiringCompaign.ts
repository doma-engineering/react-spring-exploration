import { atom } from "jotai";
import { TableResult } from "../Components/CandidateTable/candidateTableTypes";

// export const usedTables = createLocalStorageAtom<string[]>("usedTables", []);
export const tablesResult = atom<TableResult[]>([]);
export const differentCompany = atom("");

export enum selectedType {
  none = "none",
  old = "old",
  new = "new",
}
export const switcherMouseHoverTable = atom<selectedType>(selectedType.none);
export const switcherSelectedTable = atom<selectedType>(selectedType.none);

// Save results of hirings compaigns, for possibility to say in new loading where added new candidates.  
// TODO: implement this.
// export const localStorageResults = createLocalStorageAtom<CandidateTableFilters[]>("results", []);
// export const tablesStorageResult = atom<{user: string, result: TableResult[]}[]>([]);
