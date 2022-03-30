import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { currentCompany } from "../../Atoms/Company";
import { companies, tables as allTables } from "../../Atoms/LoadData";
import { currentPath } from "../../Atoms/Login";
import { filters, urlFilters } from "../../Atoms/Filters";

import { defaultFilterParams, fakeFilterData } from "../CandidateTable/fakeData";

import { CandidateTable, CandidateTableFilters, Company } from "../CandidateTable/candidateTableTypes";

import ErrorPage from "../../Pages/HiringCampaignsErrorPage";
import HiringCampaignPage from "../../Pages/HiringCampaignsPage";
import { tablesResult } from "../../Atoms/HiringCompaign";

const HiringCampaignsPageValidator = () => {

  const { CompanyName } = useParams();

  const [currCompany, setCurrent] = useAtom(currentCompany);
  const [, setResult] = useAtom(tablesResult);
  const [filter, setFilters] = useAtom(filters);
  const [tables] = useAtom(allTables);
  const [urlFilter] = useAtom(urlFilters);
  const [, setCurrentPath] = useAtom(currentPath);

  const [returnPage, setPage] = useState(<></>);
  const [previusName, setPrevius] = useState("");
  const [allCompanies] = useAtom(companies);

  const updateResult = (company: Company) => {
    setResult(
      company.tables.map(
        (tableID) => {
          const tableData = tables?.find((table) => table.id === tableID) ?? (() => { throw "error find Table"; })();
          const filterData: boolean[] = filter?.find((filter: CandidateTableFilters) => filter.tableID === tableID)?.tableFilters ?? defaultFilterParams;
          return findResult(tableData, filterData);
        }
      )
    );
  }

  useEffect(() => {
    if (urlFilter !== filter) {
      setFilters(urlFilter);
      updateResult(currCompany);
    }
  }
    , [urlFilter]);

  useEffect(() => {
    if ((CompanyName?.toLowerCase() ?? "") !== previusName.toLowerCase()) {
      setPrevius(CompanyName ? CompanyName : "");
      const company = allCompanies?.find(c => c.displayName.toLowerCase() === CompanyName?.toLowerCase() ?? "") ?? { id: "", tables: [], displayName: "" };
      if (company.id !== "") {
        setPage(<HiringCampaignPage />);
        setCurrentPath(`/Companies/${CompanyName}/Campaigns`);
        setCurrent(company);

        if (filter.length === 0) {
          setFilters(company.tables.map((table) => ({ tableID: table, tableFilters: defaultFilterParams })));
        } else
          setFilters([...filter]); // for always display filter propertys in URL!

        updateResult(company);

      }
      else {
        setPage(<ErrorPage />);
        setCurrentPath(`/Companies/${CompanyName}/Campaigns`);
      }
    }
  }
    , [CompanyName]);

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