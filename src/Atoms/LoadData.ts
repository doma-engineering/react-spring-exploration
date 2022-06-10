import { atom } from "jotai";
import { CandidateTable, Company, FilterProperty } from "./candidateTableTypes";
import { fakeCompanies, fakeFilterData, fakeTables } from "./mocks/fakeData";

export const companies = atom<Company[]>(fakeCompanies);
export const tables = atom<CandidateTable[]>(fakeTables);
export const filterData = atom<FilterProperty[]>(fakeFilterData);