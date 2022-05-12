import { atom } from "jotai";
import { CandidateTable } from "../Components/CandidateTable/candidateTableTypes";

export const currentTable = atom<CandidateTable>({ id: "", displayName: "", table: [] });