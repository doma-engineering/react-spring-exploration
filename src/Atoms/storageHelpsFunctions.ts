import { atom } from "jotai"
import { CandidateTableFilters, CandidateTableSettings } from "./candidateTableTypes"
import { defaultSettingsTable, tablesSettings, tablesSettingsLocalStorage, tablesSettingsSessionStorage, tablesSettingsURL } from "./LoadData"

export const createLocalStorageAtom = <T>(key: string, initialValue: T) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key)
    if (item !== null) {
      return JSON.parse(item)
    }
    return initialValue
  }
  const baseAtom = atom(getInitialValue())
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update
      set(baseAtom, nextValue)
      localStorage.setItem(key, JSON.stringify(nextValue))
    }
  )
  return derivedAtom
}


//TODO: why it's types <any, unknown, void> ? bc derivedAtom is hard to set type?
export const createSessionStorageAtom = <T>(key: string, initialValue: T) => {
  // ! IF local storage is empty => try load from local storage with same key !
  const getInitialValue = () => {
    const item = sessionStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item)
    }
    const tryLocal = localStorage.getItem(key);
    if (tryLocal !== null) {
      return JSON.parse(tryLocal)
    }
    return initialValue
  }
  const baseAtom = atom(getInitialValue())
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue = typeof update === 'function' ? update(get(baseAtom)) : update
      set(baseAtom, nextValue)
      sessionStorage.setItem(key, JSON.stringify(nextValue))
    }
  )
  return derivedAtom
}

export const filterSubscribeToSettingsAtom = () => (
  atom(
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
          if (usedTables.includes(table.tableID))
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
  )
);