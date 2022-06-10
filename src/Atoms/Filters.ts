import { atom } from "jotai";
import { CandidateTableFilters, CandidateTableSettings } from "./candidateTableTypes";
import { defaultFilterParams } from "./mocks/fakeData";
import { currentTable } from "./CandidateTables";
import { createSessionStorageAtom } from "./storageHelpsFunctions";
import { defaultSettingsTable, tablesSettings } from "./LoadData";

export const currentFilters = atom(
  (get): boolean[] => get(filters)?.find((filter: CandidateTableFilters) => filter.tableID === get(currentTable).id)?.tableFilters ?? defaultFilterParams,
  (get, set, newFilterSelection: boolean[]) => set(filters,
    get(filters).map((filter: CandidateTableFilters) => {
      if (filter.tableID === get(currentTable).id)
        return { tableID: get(currentTable).id, tableFilters: newFilterSelection };
      return filter;
    })
  ),
);

export const filters = atom(
  (get): CandidateTableFilters[] =>
    get(sessionFilters),
  (_get, set, arg: CandidateTableFilters[]) => {
    set(sessionFilters, arg);
    set(urlFilters, arg);
  },
);

export const sessionFilters = createSessionStorageAtom<CandidateTableFilters[]>("filters", []);

export const urlFilters = atom(
  (get): CandidateTableFilters[] => (
    get(tablesSettings).map((table: CandidateTableSettings): CandidateTableFilters => ({
      tableID: table.table,
      tableFilters: table.filters,
    }))
  ),
  (get, set, arg: CandidateTableFilters[]) => {
    const usedTables = get(tablesSettings).map((t) => t.table);
    set(tablesSettings,
      arg.map((table): CandidateTableSettings => {
        if (table.tableID in usedTables)
          return ({
            ...get(tablesSettings).find((tableItem: CandidateTableSettings) => (table.tableID === tableItem.table))!,
            filters: table.tableFilters,
          });
        return ({
          ...defaultSettingsTable,
          table: table.tableID,
          filters: table.tableFilters,
        });
      })
    );
  }
);

export const savedUrlFilters = atom<CandidateTableFilters[]>([]);