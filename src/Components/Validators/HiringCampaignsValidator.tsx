import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { currentCompany } from "../../Atoms/Company";
import { companies, tables as allTables } from "../../Atoms/LoadData";
import { currentPath, loginedCompany } from "../../Atoms/Login";
import { filters, urlFilters } from "../../Atoms/Filters";

import { defaultFilterParams, fakeFilterData } from "../../Atoms/fakeData";

import { CandidateTable, CandidateTableFilters, Company } from "../CandidateTable/candidateTableTypes";

import ErrorPage from "../../Pages/HiringCampaignsErrorPage";
import HiringCampaignPage from "../../Pages/HiringCampaignsPage";
import { differentCompany, tablesResult } from "../../Atoms/HiringCompaign";
import { HIRINGS_COMPAIGNS_SWITCH_MODE_URL, HIRINGS_COMPAIGNS_URL } from "../../routes";
import { comeChanges } from "../../Atoms/SwithersAtoms";

const HiringCampaignsPageValidator = () => {

  const { CompanyName } = useParams();
  const navigate = useNavigate();

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
          const tableData = tables?.find((table) => table.id === tableID) ?? { id: "", displayName: "", table: [] };
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
      navigate(HIRINGS_COMPAIGNS_SWITCH_MODE_URL(company.id));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChanges]);

  useEffect(() => {
    const company = allCompanies
      ?.find(
        c => ((c.displayName.toLowerCase() === logined?.toLowerCase()) ?? ""))
      ?? { id: "", tables: [], displayName: "" };
    updateFilters(company)
    updateHiringTablesResult(company, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logined]);

  useEffect(() => {
    const company = allCompanies
      ?.find(
        c => ((c.displayName.toLowerCase() === CompanyName?.toLowerCase()) ?? ""))
      ?? { id: "", tables: [], displayName: "" };
    if (company.id !== "") {

      setPage(<HiringCampaignPage />);
      setCurrentPath(HIRINGS_COMPAIGNS_URL(company.id));
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
      setCurrentPath(HIRINGS_COMPAIGNS_URL(CompanyName || ""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CompanyName, urlFilter]);

  return (returnPage);
}

export default HiringCampaignsPageValidator;

export const findResult = (table: CandidateTable, filter: boolean[]) => {
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