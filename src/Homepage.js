import {Link} from "react-router-dom";
function Homepage() {
  return (
    <div className="Homepage mb-4 font-weight-bold container ">
      <h3>Jobly</h3>
      <p>All the jobs in one, convenient place.</p>
      <Link to="/login" className="btn btn-primary m-1">Login</Link>
      <Link to="/signup" className="btn btn-primary m-1">SignUp</Link>
    </div>);
}


export default Homepage;