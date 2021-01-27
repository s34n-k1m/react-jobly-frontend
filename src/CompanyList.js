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

  /* get companies */
  useEffect(function getCompanies() {
    async function getCompaniesWithApi() {
      const resCompanies = await JoblyApi.getCompanies();
      setCompanies(resCompanies);
    }
    getCompaniesWithApi();
  }, []);

  /* Make API request to get filtered companies list by name*/
  async function searchCompanyByName(name) {
    setCompanies(null);
    const resCompanies = await JoblyApi.getCompanies(name);
    setCompanies(resCompanies);
  }

  // search might return [], could add loading state
  if (companies === null) return <div>Loading...</div>;
  if (companies.length === 0) return <div>No results found.</div>;

  // add keys
  return (
    <div className="CompanyList">
      <SearchForm search={searchCompanyByName} />
      {companies.map(c => <CompanyCard key={c.handle} company={c} />)}
    </div>);
}


export default CompanyList;