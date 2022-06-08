import { atom } from "jotai";
import { TableResult } from "./candidateTableTypes";

export const tablesResult = atom<TableResult[]>([]);
export const differentCompany = atom(""); // when open page <Hiring campaigns>, user can set URL to different company page (not current logged in), that companyID take that atom.

// Save results of hiring campaigns, for possibility to say in new loading where added new candidates.  
// TODO: implement this.
// export const localStorageResults = createLocalStorageAtom<CandidateTableFilters[]>("results", []);
// export const tablesStorageResult = atom<{user: string, result: TableResult[]}[]>([]);
