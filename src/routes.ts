// _path          mean what in url contain parametric parts. Like ":CompanyName"
// _errorPath     mean what that path need for errors catch.

import { TaskCategories } from './Atoms/candidateTableTypes';

// ------------------------ ZHR --------------------------//
// ZHR - part where HR can find candidate for their company.

export const ROOT_URL = '/';
export const GET_STARTED_URL = '/GetStarted';
export const REGISTRATION_URL = '/Registration';
export const TERMS_AND_CONDITIONS = '/TermsAndConditions';
export const TASKS_BY_CATEGORY_URL_path = '/Tasks/:CategoryName';
export const TASKS_BY_CATEGORY_URL = (category: TaskCategories) =>
    `/Tasks/${category}`;

export const LOGIN_URL = '/Login';
export const HIRING_CAMPAIGNS_URL_path = '/Companies/:CompanyName/Campaigns';
export const HIRING_CAMPAIGNS_URL = (companyID: string) =>
    `/Companies/${companyID}/Campaigns`;
export const HIRING_CAMPAIGNS_SWITCH_MODE_URL_path =
    '/Companies/:CompanyName/Campaigns/switchMode';
export const HIRING_CAMPAIGNS_SWITCH_MODE_URL = (companyID: string) =>
    `/Companies/${companyID}/Campaigns/switchMode`;
export const HIRING_CAMPAIGNS_MISS_COMPANY_URL_errorPath =
    '/Companies//Campaigns';
export const CANDIDATE_TABLE_URL_path = '/CandidateTables/:CandidateTable';
export const CANDIDATE_TABLE_URL = (tableID: string) =>
    `/CandidateTables/${tableID}`;
export const CANDIDATE_TABLE_SWITCH_MODE_URL_path =
    '/CandidateTables/:CandidateTable/switchMode';
export const CANDIDATE_TABLE_SWITCH_MODE_URL = (tableID: string) =>
    `/CandidateTables/${tableID}/switchMode`;

//decorative pages
export const COMMUNITY_URL = '/Community';
export const COMPANIES_URL = '/Companies';
export const TASKS_URL = '/Tasks';
//end of decorative pages
