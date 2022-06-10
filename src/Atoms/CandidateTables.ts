import { atom } from "jotai";
import { CandidateTable } from "./candidateTableTypes";

export const currentTable = atom<CandidateTable>({ id: "", displayName: "", table: [] });