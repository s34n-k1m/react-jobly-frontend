import JoblyApi from "./api";
import { useState, useEffect} from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

/*  CompanyList Component

Props: none

State: 
  companies [company,...]
  isLoading : T/F
  searchTerm: "account"
  searchResultStr: "search results for 'account' "

App -> Routes -> CompanyList -> CompanyCard
*/
function CompanyList() {
  const [companies, setCompanies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResultStr, setSearchResultStr] = useState(null);

  /* get companies */
  useEffect(function getCompanies() {
    async function getCompaniesWithApi() {
      const resCompanies = await JoblyApi.getCompanies();
      setCompanies(resCompanies);
      setIsLoading(false);
    }
    getCompaniesWithApi();
  }, []);


  function searchCompany(name) {
    setSearchTerm(name);
    setSearchResultStr(`search results for '${name}'`)
  }

  useEffect(function search() {
    async function searchCompanyByName() {
      const resCompanies = await JoblyApi.getCompanies(searchTerm);
      setCompanies(resCompanies);
      setSearchTerm(null);
    }

    if (searchTerm) {
      searchCompanyByName();
    }
  }, [searchTerm]);


  if (isLoading) return <div>Loading...</div>;
  if (searchTerm) return <div>Searching...</div>;
  if (companies.length === 0) {
    return (
      <h5>
        <SearchForm search={searchCompany} />
        No results found.
      </h5>);
  }

  // add keys
  return (
    <div className="CompanyList">
      <SearchForm search={searchCompany} />
      {
        searchResultStr
          ? <h5>{companies.length} {searchResultStr}</h5>
          : null
      }
      {companies.map(c => <CompanyCard key={c.handle} company={c} />)}
    </div>);
}


export default CompanyList;