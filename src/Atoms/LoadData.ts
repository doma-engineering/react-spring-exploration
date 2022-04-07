import { atom } from "jotai";
import { CandidateTable, Company, FilterProperty } from "../Components/CandidateTable/candidateTableTypes";
import { fakeCompanies, fakeFilterData, fakeTables } from "../Components/CandidateTable/fakeData";

export const companies = atom<Company[]>(fakeCompanies);
export const tables = atom<CandidateTable[]>(fakeTables);
export const filterData = atom<FilterProperty[]>(fakeFilterData);