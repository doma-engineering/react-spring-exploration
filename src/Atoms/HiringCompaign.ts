import { atom } from "jotai";
import { TableResult } from "../Components/CandidateTable/candidateTableTypes";

export const tablesResult = atom<TableResult[]>([]);
export const differentCompany = atom(""); // when open page <Hiring campaigns>, user can set URL to different (not logined) company page, that companyID take that atom.

// Save results of hirings compaigns, for possibility to say in new loading where added new candidates.  
// TODO: implement this.
// export const localStorageResults = createLocalStorageAtom<CandidateTableFilters[]>("results", []);
// export const tablesStorageResult = atom<{user: string, result: TableResult[]}[]>([]);
