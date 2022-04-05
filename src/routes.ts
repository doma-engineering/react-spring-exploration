// _path          mean what in url contain parametric parts. Like ":CompanyName"
// _errorPath     mean what that path need for errors cathc.

export const ROOT_URL = "/";
export const LOGIN_URL = "/Login";
export const HIRINGS_COMPAIGNS_URL_path = "/Companies/:CompanyName/Campaigns";
export const HIRINGS_COMPAIGNS_URL = (companyID: string) => `/Companies/${companyID}/Campaigns`;
export const HIRINGS_COMPAIGNS_SWITCH_MODE_URL_path = "/Companies/:CompanyName/Campaigns/switchMode";
export const HIRINGS_COMPAIGNS_SWITCH_MODE_URL = (companyID: string) => `/Companies/${companyID}/Campaigns/switchMode`;
export const HIRINGS_COMPAIGNS_MISS_COMPANY_URL_errorPath = "/Companies//Campaigns";
export const CANDIDATE_TABLE_URL_path = "/CandidateTables/:CandidateTable";
export const CANDIDATE_TABLE_URL = (tableID: string) => `/CandidateTables/${tableID}`;


