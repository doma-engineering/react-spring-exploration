import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { companies } from "./LoadData";

export const loginInputString = atomWithStorage("loginInputString", "");
export const loginedCompany = atomWithStorage("loginedCompany", "");

export const loginNavigate = atom("");
export const tryToLogin = atom(
  (get) => get(loginNavigate),
  (get, set) => {
    const index = get(companies).findIndex((company) =>
      company.id.toLowerCase() === get(loginInputString).toLowerCase()
    )
    if (index !== -1) {
      set(loginedCompany, get(companies)[index].id);
      set(loginNavigate, `/Companies/${get(companies)[index].id}/Campaigns`);
    } else {
      set(loginNavigate, `/Companies/${get(loginInputString)}/Campaigns`);
      set(loginedCompany, '');
    }
  }
);

export const currentPath = atomWithStorage("currentPath", "");