
//  ------------------------------------------------------
//
// This module is testing for render multipages in React
//
//   there compose 3 pages:
//    - simple login
//    - Hiring compaigns 
//    - Candidate table 
//
//   start from   http://localhost:3000  they will redirect you to
//     http://localhost:3000/Login
//
//   For test you can select one of there company:
//      1. Tea
//      2. WHALE
//   
//   
//   Then you will in 
//         <Hiring compaigns>   <-->  <Candidate tables>  pages. 
//   and you always can relogin to other company.
//
//
//   Sad, but now history don't work correct.
//     Path like    http://localhost:3000/CandidateTables/Java#Filters=%5B%7B"tableID"%3A"Java"%2C"tableFilters"%3A%5Bfalse%2Cfalse%2Ctrue%2Cfalse%5D%7D
//     contain   #Filters=   what changes with filters buttons clicks, and it saves to browser history. 
//
//  ------------------------------------------------------

//import "./Components/CandidateTable/candidateTable.css"

import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import UpsideMenu from "./Components/UpsideMenu/UpsideMenu";
import LoginValidator from "./Components/Validators/LoginValidator";
import HiringCampaignsPageValidator from "./Components/Validators/HiringCampaignsValidator";
import SwitchHiringCampaignsValidator from "./Components/Validators/SwitchHiringCampaignsValidator";
import CandidateTableValidator from "./Components/Validators/CandidateTableValidator";
import CandidateTableSwitcherValidator from "./Components/Validators/SwitchCandidateTableValidator";
import Error404Page from "./Pages/Error404Page";
import {
  CANDIDATE_TABLE_SWITCH_MODE_URL_path,
  CANDIDATE_TABLE_URL_path,
  HIRINGS_COMPAIGNS_MISS_COMPANY_URL_errorPath,
  HIRINGS_COMPAIGNS_SWITCH_MODE_URL_path,
  HIRINGS_COMPAIGNS_URL_path,
  LOGIN_URL,
  ROOT_URL
} from "./routes";

import "./styles.css"

const Multipage = () => {
  return (
    <div className="bg-slate-800 w-screen h-screen">
      <Router>
        <UpsideMenu />
        <Routes>
          <Route path={ROOT_URL} element={<Navigate to={`Login`} />} />
          <Route path={LOGIN_URL} element={<LoginValidator />} />
          <Route path={HIRINGS_COMPAIGNS_URL_path} element={<HiringCampaignsPageValidator />} />
          <Route path={HIRINGS_COMPAIGNS_SWITCH_MODE_URL_path} element={<SwitchHiringCampaignsValidator />} />
          <Route path={CANDIDATE_TABLE_URL_path} element={<CandidateTableValidator />} />
          <Route path={CANDIDATE_TABLE_SWITCH_MODE_URL_path} element={<CandidateTableSwitcherValidator />} />
          <Route path={HIRINGS_COMPAIGNS_MISS_COMPANY_URL_errorPath} element={<Navigate to={LOGIN_URL} />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Multipage;