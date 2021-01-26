import JoblyApi from "./api";
import { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";


/*  */
function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  
  useEffect(function getCompany() {
    async function getCompanyWithApi() {
      try {
        const resCompany = await JoblyApi.getCompany(handle);
        console.log("RES COMPANY=", resCompany);
        setCompany(resCompany);
      } catch (err) {
        setCompany("NOT FOUND");
      }
    }
    getCompanyWithApi();
  }, []);

  if (!company) return <div>Loading...</div>;
  if (company === "NOT FOUND") return <Redirect to="/" />

  return (
  <div>
    {company.jobs.map(j => <div>{j.title}</div>)}
  </div>);
}


export default CompanyDetail;