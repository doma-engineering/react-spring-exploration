// _path          mean what in url contain parametric parts. Like ":CompanyName"
// _errorPath     mean what that path need for errors catch.

export const ROOT_URL = '/';
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
