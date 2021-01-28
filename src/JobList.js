import JoblyApi from "./api";
import { useState, useEffect } from "react";
import JobCard from "./JobCard";
import SearchForm from "./SearchForm";


/*  
Props: none
State: 
  jobs [job,...]
  isLoading : T/F
  searchTerm: "account"
  searchResultStr: "search results for 'account' "
App -> Routes -> JobList -> JobCard
*/
function JobList() {
  const [jobs, setJobs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResultStr, setSearchResultStr] = useState(null);

  /* get jobs */
  useEffect(function getJobs() {
    async function getJobsWithApi() {
      const resJobs = await JoblyApi.getJobs();
      setJobs(resJobs);
      setIsLoading(false);
    }
    getJobsWithApi();
  }, []);


  function searchJob(name) {
    setSearchTerm(name);
    setSearchResultStr(`results for '${name}'`)
  }



  useEffect(function search() {
    async function searchJobsByName() {
      const resJobs = await JoblyApi.getJobs(searchTerm);
      setJobs(resJobs);
      setSearchTerm(null);
    }
    if (searchTerm) {
      searchJobsByName();
    }
  }, [searchTerm]);

  if (isLoading) return <div>Loading...</div>;
  if (searchTerm) return <div>Searching...</div>;
  if (jobs.length === 0) {
    return (
      <h5>
        <SearchForm search={searchJob} />
        No results found.
      </h5>);
  }


  return (
    <div className="JobList">
      <SearchForm search={searchJob} />
      {
        searchResultStr
          ? <h5>{jobs.length} {searchResultStr}</h5>
          : null
      }
      {jobs.map(j => <JobCard key={j.id} job={j} />)}
    </div>);
}



export default JobList;