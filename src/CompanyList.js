import JoblyApi from "./api";
import {useState, useEffect} from "react";
import CompanyCard from "./CompanyCard";

/*  */
function CompanyList(){
  const [companies, setCompanies] = useState(null);

  useEffect(function getCompanies() {
    async function getCompaniesWithApi() {
      const resCompanies = await JoblyApi.getCompanies();
      setCompanies(resCompanies);
    }
    getCompaniesWithApi();
  }, []);

  if (!companies) return <div>Loading...</div>;

  return (
  <div>
    {companies.map(c => <CompanyCard company={c}/>)}
  </div>);
}


export default CompanyList;