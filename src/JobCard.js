
/** JobCard Component
 * 
 * Props:
 * - job: { job data }
 * 
 * State:
 * 
 * JobList -> JobCard
*/
function JobCard({ job }) {


  return (
    <div className="JobCard-card card">
      <div className="JobCard-body card-body">
        <h5 className="JobCard-title card-title text-left">{job.title}</h5>
        {job.companyName
          ? <h6 className="JobCard-companyName text-left">{job.companyName}</h6>
          : null}
        <p className="JobCard-salary text-left">Salary: {job.salary}</p>
        <p className="JobCard-equity text-left">Equity: {job.equity}</p>
        <div className="JobCard-button ">
          <button className="JobCard-apply btn btn-danger font-weight-bold text-uppercase float-right">Apply</button>
        </div>
      </div>

    </div>
  );
}

export default JobCard;