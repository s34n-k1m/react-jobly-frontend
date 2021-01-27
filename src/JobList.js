import JoblyApi from "./api";
import {useState, useEffect} from "react";
import JobCard from "./JobCard";
/*  
Props: none
State: jobs [job,...]
App -> Routes -> JobList -> JobCard
*/
function JobList(){
  const [jobs, setJobs] = useState(null);

  /* get jobs */
  useEffect(function getJobs() {
    async function getJobsWithApi() {
      const resJobs = await JoblyApi.getJobs();
      setJobs(resJobs);
    }
    getJobsWithApi();
  }, []);

  if (!jobs) return <div>Loading...</div>;

  return (
  <div>
    {jobs.map(j => <JobCard key={j.id} job={j}/>)}
  </div>);
}



export default JobList;