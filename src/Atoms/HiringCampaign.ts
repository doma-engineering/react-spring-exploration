import { atom } from 'jotai';
import { TableResult } from './candidateTableTypes';

export const tablesResult = atom<TableResult[]>([]);

// Save results of hiring campaigns, for possibility to say in new loading where added new candidates.
// TODO: implement this.
// export const localStorageResults = createLocalStorageAtom<CandidateTableFilters[]>("results", []);
// export const tablesStorageResult = atom<{user: string, result: TableResult[]}[]>([]);
