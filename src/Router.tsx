
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

import "./Components/CandidateTable/candidateTable.css"

import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"
import HiringCampaignsPageValidator from "./Components/Validators/HiringCampaignsValidator";
import Error404Page from "./Pages/Error404Page";
import CandidateTableValidator from "./Components/Validators/CandidateTableValidator";
import LoginValidator from "./Components/Validators/LoginValidator";
import SwitchHiringCampaignsValidator from "./Components/Validators/SwitchHiringCampaignsValidator";

const Multipage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`Login`} />} />
        <Route path="/Login" element={<LoginValidator />} />
        <Route path="/Companies/:CompanyName/Campaigns" element={<HiringCampaignsPageValidator />} />
        <Route path="/Companies/:CompanyName/Campaigns/swithMode" element={<SwitchHiringCampaignsValidator />} />
        <Route path="/Companies//Campaigns" element={<Navigate to={`/Login`} />} />
        <Route path="/CandidateTables/:CandidateTable" element={<CandidateTableValidator />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Router>
  );
}

export default Multipage;