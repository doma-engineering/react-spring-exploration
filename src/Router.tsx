
//  ------------------------------------------------------
//
// This module is testing for render web pages in React
//
//   there compose 3 pages:
//    - simple login
//    - Hiring campaigns 
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
//         <Hiring campaigns>   <-->  <Candidate tables>  pages. 
//   and you always can re-login to other company.
//
//
//   Sad, but now history don't work correct.
//     Path like    http://localhost:3000/CandidateTables/Java#Filters=%5B%7B"tableID"%3A"Java"%2C"tableFilters"%3A%5Bfalse%2Cfalse%2Ctrue%2Cfalse%5D%7D
//     contain   #Filters=   what changes with filters buttons clicks, and it saves to browser history. 
//
//  ------------------------------------------------------

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
  HIRING_CAMPAIGNS_MISS_COMPANY_URL_errorPath,
  HIRING_CAMPAIGNS_SWITCH_MODE_URL_path,
  HIRING_CAMPAIGNS_URL_path,
  LOGIN_URL,
  ROOT_URL
} from "./routes";

import "./styles.css"
import RootValidator from "./Components/Validators/RootValidator";

const App = () => {
  return (
    <div className="bg-slate-800 w-screen h-screen">
      <Router>
        <UpsideMenu />
        <Routes>
          <Route path={ROOT_URL} element={<RootValidator />} />
          <Route path={LOGIN_URL} element={<LoginValidator />} />
          <Route path={HIRING_CAMPAIGNS_URL_path} element={<HiringCampaignsPageValidator />} />
          <Route path={HIRING_CAMPAIGNS_SWITCH_MODE_URL_path} element={<SwitchHiringCampaignsValidator />} />
          <Route path={CANDIDATE_TABLE_URL_path} element={<CandidateTableValidator />} />
          <Route path={CANDIDATE_TABLE_SWITCH_MODE_URL_path} element={<CandidateTableSwitcherValidator />} />
          <Route path={HIRING_CAMPAIGNS_MISS_COMPANY_URL_errorPath} element={<Navigate to={LOGIN_URL} />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;