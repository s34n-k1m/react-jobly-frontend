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
  const [searchTerm, setSearchTerm] = useState(null);
  
  /* get companies */
  useEffect(function getCompanies() {
    async function getCompaniesWithApi() {
      const resCompanies = await JoblyApi.getCompanies();
      setCompanies(resCompanies);
      setIsLoading(false);
    }
    getCompaniesWithApi();
  }, []);

  // /* Make API request to get filtered companies list by name*/
  // async function searchCompanyByName(name) {
  //   setCompanies(null);
  //   const resCompanies = await JoblyApi.getCompanies(name);
  //   setCompanies(resCompanies);
  // }

  function searchCompany(name) {
    setSearchTerm(name);
  }

  useEffect(function search() {
    async function searchCompanyByName() {
      const resCompanies = await JoblyApi.getCompanies(searchTerm);
      setCompanies(resCompanies);
      setSearchTerm(null);
    }
    
    console.log("SEARCH EFFECT");
    if (searchTerm){
      searchCompanyByName();
    }
  }, [searchTerm]);


  if (isLoading) return <div>Loading...</div>;
  if (searchTerm) return <div>Searching...</div>;
  if (companies.length === 0) {
    return (
      <div>
        <SearchForm search={searchCompany} />
        No results found.
      </div>);
  }

  console.log("PASSED THE IF CONDITIONS");
  // add keys
  return (
    <div className="CompanyList">
      <SearchForm search={searchCompany} />
      {companies.map(c => <CompanyCard key={c.handle} company={c} />)}
    </div>);
}


export default CompanyList;