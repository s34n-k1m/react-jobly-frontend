import JoblyApi from "./api";
import { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import JobCard from "./JobCard";

/*  
Props: none
Params: handle
State: company {handle, name, ...}
App -> Routes -> CompanyDetail
*/
function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [isCompanyNotFound, setIsCompanyNotFound] = useState(false);

  /* get company */
  useEffect(function getCompany() {
    async function getCompanyWithApi() {
      try {
        const resCompany = await JoblyApi.getCompany(handle);
        setCompany(resCompany);
      } catch (err) {
        //have a state for company not found, true and false
        setIsCompanyNotFound(true);
      }
    }
    getCompanyWithApi();
  }, [handle]);
  
  if (isCompanyNotFound === true) return <Redirect to="/" />
  if (!company) return <div>Loading...</div>;

  return (
    <div className="CompanyDetail">
      <h4 className="CompanyDetail-name text-left"> {company.name}</h4>
      <p className="CompanyDetail-description text-left"> {company.description}</p>
      {company.jobs.map(j => <JobCard key={j.id} job={{ ...j, companyName: undefined }} />)}
    </div>);
}


export default CompanyDetail;