import JoblyApi from "./api";
import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import SearchForm from "./SearchForm";


/*  
Props: none
State: jobs [job,...]
App -> Routes -> JobList -> JobCard
*/
function JobList() {
  const [jobs, setJobs] = useState(null);

  /* get jobs */
  useEffect(function getJobs() {
    async function getJobsWithApi() {
      const resJobs = await JoblyApi.getJobs();
      setJobs(resJobs);
    }
    getJobsWithApi();
  }, []);

  /* Make API request to get filtered companies list by name*/
  async function searchJobsByName(title) {
    setJobs(null);
    const resJobs = await JoblyApi.getJobs(title);
    setJobs(resJobs);
  }


  if (jobs === null) return <div>Loading...</div>;
  if (jobs.length === 0) return <div>No results found.</div>;

  return (
    <div className="JobList">
      <SearchForm search={searchJobsByName} />
      {jobs.map(j => <JobCard key={j.id} job={j} />)}
    </div>);
}



export default JobList;