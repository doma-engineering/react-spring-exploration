import { atom } from "jotai";
import { atomWithHash } from "jotai/utils";
import { CandidateTable, CandidateTableSettings, CandidateTablesSettings, Company, FilterProperty } from "./candidateTableTypes";
import { defaultFilterParams, fakeCompanies, fakeFilterData, fakeTables } from "./mocks/fakeData";
import { createLocalStorageAtom, createSessionStorageAtom } from "./storageHelpsFunctions";

export const companies = atom<Company[]>(fakeCompanies);
export const tables = atom<CandidateTable[]>(fakeTables);
export const filterData = atom<FilterProperty[]>(fakeFilterData);

export const tablesSettings = atom(
  (get): CandidateTablesSettings => get(tablesSettingsSessionStorage),
  (_get, set, arg: CandidateTablesSettings) => {
    set(tablesSettingsURL, arg);
    set(tablesSettingsLocalStorage, arg);
    set(tablesSettingsSessionStorage, arg);
  }
);

export const defaultSettingsTable: CandidateTableSettings = { table: "DefaultTable", filters: defaultFilterParams };

export const tablesSettingsURL = atomWithHash<CandidateTablesSettings>("tables", []);
export const tablesSettingsLocalStorage = createLocalStorageAtom<CandidateTablesSettings>("tableSettings", []);
export const tablesSettingsSessionStorage = createSessionStorageAtom<CandidateTablesSettings>("tableSettings", []);