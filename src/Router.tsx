
//  ------------------------------------------------------
//
// This module is testing for render multipages in React
//
//   there compose 2 pages:
//    - Hiring compaigns 
//    - Candidate table 
//
//  ------------------------------------------------------

import { BrowserRouter as Router, Navigate, Route, Routes, useParams } from "react-router-dom"
import HiringCompaign from "./Pages/HiringCompaign";
import CandidateTable, { filterLink } from "./Pages/CandidatesTable"
import { atom, useAtom } from "jotai";
import { Component } from "react";
import { filterData } from "./Components/CandidateTable/candidateTableAtoms";

export const companyName = atom("/Empty");

const Multipage = () => {

  const [CN] = useAtom(companyName)

  return (
    <Router>
      <Login />
      <Routes>
        <Route path="/" element={<Navigate to={`Compaigns${CN}/Filter:TTTF:3`} />} />
        <Route path="/Compaigns/:CompanyName/:FilterProps" element={<HiringCompaign />} />
        <Route path="/CandidateTables/:CandidateTable/:FilterProps" element={<CandidateTable />} />
      </Routes>
    </Router>
  );
}

export default Multipage;

// TODO: move to another file
const Login = () => {
  const [CN, setCN] = useAtom(companyName)
  return (
    <div
      className="login"
      style={{
        position: "absolute",
        left: 10,
      }}
    >
      <label>
        Login as:
        <input
          type="text"
          onChange={(e) => setCN("/" + e.target.value)}
        />
      </label>
      <div>
        Current Company Logined as
        <span style={{ fontWeight: "bold" }}> {CN.substring(1)} </span>
      </div>
    </div>
  );
}