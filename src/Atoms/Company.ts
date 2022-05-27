import { atom } from "jotai";
import { Company } from "./candidateTableTypes";

export const currentCompany = atom<Company>({ id: "", displayName: "", tables: [] });
export const companyName = atom(
  (get) => get(currentCompany).displayName,
  (get, set, newName: string) => set(currentCompany, { ...get(currentCompany), displayName: newName }),
);

