import JoblyApi from "./api";
import { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";

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
  // search might return [], could add loading state
  if (!companies) return <div>Loading...</div>;
// add keys
  return (
    <div className="CompanyList">
      {companies.map(c => <CompanyCard key={c.handle} company={c} />)}
    </div>);
}


export default CompanyList;