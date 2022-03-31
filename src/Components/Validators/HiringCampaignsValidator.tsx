import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { currentCompany } from "../../Atoms/Company";
import { comeChanges, companies, tables as allTables } from "../../Atoms/LoadData";
import { currentPath, loginedCompany } from "../../Atoms/Login";
import { filters, urlFilters } from "../../Atoms/Filters";

import { defaultFilterParams, fakeFilterData } from "../CandidateTable/fakeData";

import { CandidateTable, CandidateTableFilters, Company } from "../CandidateTable/candidateTableTypes";

import ErrorPage from "../../Pages/HiringCampaignsErrorPage";
import HiringCampaignPage from "../../Pages/HiringCampaignsPage";
import { differentCompany, tablesResult } from "../../Atoms/HiringCompaign";

const HiringCampaignsPageValidator = () => {

  const { CompanyName } = useParams();

  const [currCompany, setCurrentCompany] = useAtom(currentCompany);
  const [, setResult] = useAtom(tablesResult);
  const [filter, setFilters] = useAtom(filters);
  const [tables] = useAtom(allTables);
  const [urlFilter] = useAtom(urlFilters);
  const [, setCurrentPath] = useAtom(currentPath);
  const [isChanges, setComeChange] = useAtom(comeChanges);
  const [, setDifferentCompanyTable] = useAtom(differentCompany);
  const [allCompanies] = useAtom(companies);
  const [logined] = useAtom(loginedCompany);

  const [returnPage, setPage] = useState(<></>);
  const [previusURLFilter, setPreviusUrlFilter] = useState("hidden Egg");

  const updateHiringTablesResult = (company: Company, tfilters: CandidateTableFilters[]) => {
    setResult(
      company.tables.map(
        (tableID) => {
          const tableData = tables?.find((table) => table.id === tableID) ?? (() => { throw "error find Table"; })();
          const filterData: boolean[] = tfilters?.find((filter: CandidateTableFilters) => filter.tableID === tableID)?.tableFilters ?? defaultFilterParams;
          return findResult(tableData, filterData);
        }
      )
    );
  }

  // differentsOfTables return   > tables ID <   who haven't in   > filter <   but is in   > company <  .
  const differentsOfTables = (company: Company, filters: CandidateTableFilters[]): string[] => {
    return company.tables
      .filter((table) =>
        !filters.map(filter => filter.tableID)
          .includes(table)
      );
  }

  const updateFilters = (company: Company) => {

    if (
      (urlFilter.length > 0)
      // && (urlFilter !== filter)
      && (!urlFilter.reduce((answ, filtr, index) => (
        answ
        && filtr.tableID === filter[index].tableID
        && filtr.tableFilters.toString() === filter[index].tableFilters.toString()
      ), true))
    ) {
      setComeChange(true);
      return;
    }
    if (filter.length === 0) {
      const newFilter = company.tables.map(
        (tableID) => ({ tableID, tableFilters: defaultFilterParams })
      )
      setFilters(newFilter);
      updateHiringTablesResult(company, newFilter);
      return;
    }

    const different = differentsOfTables(company, filter);
    if (different.length > 0) {
      const newFilter = [...filter].concat(
        different.map(tableID => ({ tableID, tableFilters: defaultFilterParams }))
      )
      setFilters(newFilter);
      updateHiringTablesResult(company, newFilter);
      return;
    }

    // for always display filter propertys in URL!
    updateHiringTablesResult(company, filter);
    setFilters([...filter]);
  }

  useEffect(() => {
    if (!isChanges) {
      updateHiringTablesResult(currCompany, filter);
    }
  }
    , [isChanges]);

  useEffect(() => {
    const company = allCompanies
      ?.find(
        c => ((c.displayName.toLowerCase() === logined?.toLowerCase()) ?? ""))
      ?? { id: "", tables: [], displayName: "" };
    updateFilters(company)
    updateHiringTablesResult(company, filter);
  }
    , [logined]);

  useEffect(() => {
    const company = allCompanies
      ?.find(
        c => ((c.displayName.toLowerCase() === CompanyName?.toLowerCase()) ?? ""))
      ?? { id: "", tables: [], displayName: "" };
    if (company.id !== "") {

      setPage(<HiringCampaignPage />);
      setCurrentPath(`/Companies/${CompanyName}/Campaigns`);
      setCurrentCompany(company);

      if (urlFilter.map(fi => fi.tableFilters).toString() !== previusURLFilter) {
        setPreviusUrlFilter(urlFilter.map(fi => fi.tableFilters).toString());
        updateFilters(company);
      }

      if (company.id !== logined) {
        setDifferentCompanyTable(company.displayName);
      } else {
        setDifferentCompanyTable("");
      }

    }
    else {
      setPage(<ErrorPage />);
      setCurrentPath(`/Companies/${CompanyName}/Campaigns`);
    }
  }
    , [CompanyName, urlFilter]);

  return (returnPage);
}

export default HiringCampaignsPageValidator;

const findResult = (table: CandidateTable, filter: boolean[]) => {
  return {
    tableID: table.id,

    pending: table.table.length - table.table.filter((candidate) => (
      fakeFilterData
        .filter((_rank, index) => !filter[index])
        .map(rank => rank.id)
        .includes(candidate.rank)
    )).length,

    filtred: table.table.length - table.table.filter((candidate) => (
      fakeFilterData
        .filter((_rank, index) => filter[index])
        .map(rank => rank.id)
        .includes(candidate.rank)
    )).length,
    total: table.table.length,
  }
}