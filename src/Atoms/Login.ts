import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Company } from './candidateTableTypes';
import { currentCompany } from './Company';
import { companies } from './LoadData';

export type LoggedInCompany = {
    isLoggedIn: boolean;
    companyId: string;
};

export const loginInputString = atomWithStorage('loginInputString', '');
export const loggedInCompany = atomWithStorage<LoggedInCompany>(
    'loggedInCompany',
    { isLoggedIn: false, companyId: '' }
);
export const loggedInCompanyData = atom(
    (get): Company | undefined =>
        get(companies).find(
            (company) =>
                get(loggedInCompany).isLoggedIn &&
                get(loggedInCompany).companyId === company.id
        ),
    (get, set, newData: Company) => {
        set(
            companies,
            get(companies).map((company) =>
                company.id === get(loggedInCompany).companyId &&
                get(loggedInCompany).isLoggedIn
                    ? newData
                    : company
            )
        );
    }
);

export const companyPinnedTasks = atom(
    (get) => get(loggedInCompanyData)?.tables,
    (get, set, tasks: string[]) => {
        if (get(loggedInCompanyData))
            set(loggedInCompanyData, {
                ...get(loggedInCompanyData)!,
                tables: tasks,
            });
    }
);

export const isPageForOtherCompany = atom(
    // return <true> if opened page is for not logged in company.
    (get): boolean => get(currentCompany).id !== get(loggedInCompany).companyId
);

export const pressedEnterButton = atom(false);

export const currentPath = atomWithStorage('currentPath', '');
