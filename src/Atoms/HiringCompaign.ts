import { atom } from "jotai";
import { TableResult } from "../Components/CandidateTable/candidateTableTypes";
import { createLocalStorageAtom } from "./storageHelpsFunctions";

// export const usedTables = createLocalStorageAtom<string[]>("usedTables", []);
export const tablesResult = atom<TableResult[]>([]);

// Save results of hirings compaigns, for possibility to say in new loading where added new candidates.  
// TODO: implement this.
// export const localStorageResults = createLocalStorageAtom<CandidateTableFilters[]>("results", []);
// export const tablesStorageResult = atom<{user: string, result: TableResult[]}[]>([]);
