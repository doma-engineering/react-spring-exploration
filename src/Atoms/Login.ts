import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { currentCompany } from './Company';

export type LoggedInCompany = {
    isLoggedIn: boolean;
    companyId: string;
};

export const loginInputString = atomWithStorage('loginInputString', '');
export const loggedInCompany = atomWithStorage<LoggedInCompany>(
    'loggedInCompany',
    { isLoggedIn: false, companyId: '' }
);

export const isPageForOtherCompany = atom(
    // return <true> if opened page is for not logged in company.
    (get): boolean => get(currentCompany).id !== get(loggedInCompany).companyId
);

export const pressedEnterButton = atom(false);

export const currentPath = atomWithStorage('currentPath', '');
