import { atom } from "jotai";
import { atomWithHash } from "jotai/utils";
import { defaultSortingParams } from "./CandidatesSorting";
import {
  CandidateTable,
  CandidateTableSettings,
  CandidateTablesSettings,
  Company,
  FilterProperty,
} from "./candidateTableTypes";
import {
  defaultFilterParams,
  fakeCompanies,
  fakeFilterData,
  fakeTables,
} from "./mocks/fakeData";
import {
  createLocalStorageAtom,
  createSessionStorageAtom,
} from "./storageHelpsFunctions";

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

export const defaultSettingsTable: CandidateTableSettings = {
  table: "DefaultTable",
  filters: defaultFilterParams,
  sorting: defaultSortingParams,
};

export const tablesSettingsURL = atomWithHash<CandidateTablesSettings>(
  "tables",
  []
);
export const tablesSettingsLocalStorage =
  createLocalStorageAtom<CandidateTablesSettings>("tableSettings", []);
export const tablesSettingsSessionStorage =
  createSessionStorageAtom<CandidateTablesSettings>("tableSettings", []);

export const savedTablesSettingsURL = atom<CandidateTablesSettings>([]);

export const notEqualTablesSettings = (
  first: CandidateTableSettings[],
  second: CandidateTableSettings[]
) =>
  !first.reduce(
    (answer, item, index) =>
      answer &&
      (item.table === second[index]?.table ?? true) &&
      [...item.filters, item.sorting.fn, item.sorting.isIncrease].toString() ===
        [
          ...second[index].filters,
          second[index].sorting.fn,
          second[index].sorting.isIncrease,
        ].toString(),
    true
  );
