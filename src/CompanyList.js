import JoblyApi from "./api";
import { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

/*  
Props: none
State: companies [company,...]
App -> Routes -> CompanyList -> CompanyCard
*/
function CompanyList() {
  const [companies, setCompanies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  /* get companies */
  useEffect(function getCompanies() {
    async function getCompaniesWithApi() {
      console.log(companies, "companies on init");
      const resCompanies = await JoblyApi.getCompanies();
      console.log(resCompanies, "res Companies");
      setCompanies(resCompanies);
    }
    getCompaniesWithApi();
    setIsLoading(false);
  }, []);

  // /* Make API request to get filtered companies list by name*/
  // async function searchCompanyByName(name) {
  //   setCompanies(null);
  //   const resCompanies = await JoblyApi.getCompanies(name);
  //   setCompanies(resCompanies);
  // }


  function searchCompany() {
    setIsSearching(true);
  }

  useEffect(function search() {
    async function searchCompanyByName(name) {
      console.log(companies, "companies on search");
      const resCompanies = await JoblyApi.getCompanies(name);
      setCompanies(resCompanies);
    }
    if (isSearching){
      console.log(companies, "companies before search");
      setIsLoading(true);
      searchCompanyByName();
      console.log(companies, "companies after search");
      setIsLoading(false);
    }
  }, [isSearching]);


  if (isLoading) return <div>Loading...</div>;
  if (companies !== null && companies.length === 0) {
    return (
      <div>
        <SearchForm search={searchCompany} />
        No results found.
      </div>);
  }


  // add keys
  return (
    <div className="CompanyList">
      <SearchForm search={searchCompany} />
      {companies.map(c => <CompanyCard key={c.handle} company={c} />)}
    </div>);
}


export default CompanyList;