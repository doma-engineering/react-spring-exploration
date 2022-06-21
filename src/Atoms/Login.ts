import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type LoggedInCompany = {
  isLoggedIn: boolean;
  companyId: string;
};

export const loginInputString = atomWithStorage("loginInputString", "");
export const loggedInCompany = atomWithStorage<LoggedInCompany>(
  "loggedInCompany",
  { isLoggedIn: false, companyId: "" }
);

export const pressedEnterButton = atom(false);

export const currentPath = atomWithStorage("currentPath", "");
