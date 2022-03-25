import { useAtom } from "jotai";
import { Fragment, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { currentCompany } from "../../Atoms/Company";
import { tablesResult } from "../../Atoms/CandidateTables";
import { companies as allCompanies, companies, tables as allTables } from "../../Atoms/LoadData";
import { loginInputString } from "../../Atoms/Login";
import ErrorPage from "../../Pages/HiringCampaignsErrorPage";
import HiringCampaignPage from "../../Pages/HiringCampaignsPage";
import { CandidateTable } from "../CandidateTable/candidateTableTypes";
import { filters, urlFilters } from "../../Atoms/Filters";

const findResult = (table: CandidateTable) => {
  return {
    // TODO: pending, filtred.
    tableID: table.id,
    pending: 0,
    filtred: 0,
    total: table.table.length,
  }
}

const HiringCampaignsPageValidator = () => {
  // TODO: read them to log-str for unpack link
  // // URL params
  const { CompanyName } = useParams();

  const [company, setCurrent] = useAtom(currentCompany);
  const [, setResult] = useAtom(tablesResult);
  const [filter, setFilters] = useAtom(filters);
  const [tables] = useAtom(allTables);
  const [urlFilter] = useAtom(urlFilters);

  const [havePage, setHavePage] = useState(false);
  const [previusName, setPrevius] = useState("");
  const [loginString, setLogin] = useAtom(loginInputString);
  const [allCompanies] = useAtom(companies);

  const navigate = useNavigate();

  useEffect(() => {
    if (urlFilter !== filter) {
      setFilters(filter);
    }
  }
    , [urlFilter]);

  useEffect(() => {
    if ((CompanyName?.toLowerCase() ?? "") !== loginString.toLowerCase()) {
      //TODO validation to enter config
      setLogin(CompanyName ? CompanyName : "");
      navigate("/Login");
    }
  }, [CompanyName]);

  if ((CompanyName?.toLowerCase() ?? "") !== previusName.toLowerCase()) {
    setPrevius(CompanyName ? CompanyName : "");
    const company = allCompanies?.find(c => c.displayName.toLowerCase() === CompanyName?.toLowerCase() ?? "") ?? { id: "", tables: [], displayName: "" };
    if (company.id !== "") {
      setHavePage(true);
      setCurrent(company);
      if (filter === [])
        setFilters(company.tables.map((table) => ({ tableID: table, tableFilters: [true, true, true, false] })))
      else
        setFilters([...filter]);
      setResult(
        company.tables.map(
          (tableID) => {
            const tableData = tables?.find((table) => table.id === tableID) ?? (() => { throw "error find Table"; })();
            return findResult(tableData);
          }
        )
      );
    }
    else {
      setHavePage(false);
    }
  }

  return (havePage ? <HiringCampaignPage /> : <ErrorPage />);
}

export default HiringCampaignsPageValidator;