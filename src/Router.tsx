
//  ------------------------------------------------------
//
// This module is testing for render multipages in React
//
//   there compose 3 pages:
//    - simple login
//    - Hiring compaigns 
//    - Candidate table 
//
//  ------------------------------------------------------

import "./Components/CandidateTable/candidateTable.css"

import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from "react-router-dom"
import LoginPage from "./Pages/LoginPage";
import HiringCampaignsPageValidator from "./Components/Validators/HiringCampaignsValidator";
import Error404Page from "./Pages/Error404Page";
import CandidateTableValidator from "./Components/Validators/CandidateTableValidator";
import LoginValidator from "./Components/Validators/LoginValidator";

const Multipage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`Login`} />} />
        <Route path="/Login" element={<LoginValidator />} />
        <Route path="/Companies/:CompanyName/Campaigns" element={<HiringCampaignsPageValidator />} />
        <Route path="/CandidateTables/:CandidateTable" element={<CandidateTableValidator />} />
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </Router>
  );
}

export default Multipage;