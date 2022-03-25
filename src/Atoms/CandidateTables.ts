import { atom } from "jotai";
import { CandidateTable, TableResult } from "../Components/CandidateTable/candidateTableTypes";

export const currentTable = atom<CandidateTable>({ id: "", displayName: "", table: [] });
export const tablesResult = atom<TableResult[]>([]);