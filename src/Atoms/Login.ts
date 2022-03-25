import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const loginInputString = atomWithStorage("loginInputString", "");
export const previusLogin = atomWithStorage("previusLogin", "");