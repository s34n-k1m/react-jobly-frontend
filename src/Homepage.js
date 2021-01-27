import { Link, Redirect } from "react-router-dom";
/* 
Homepage with signup and login option 
Props: currentUser 
App -> Routes -> Homepage
*/
function Homepage({ currentUser }) {
  return (
    <>
      {(Object.keys(currentUser).length !== 0)
        ? <Redirect to="/companies" />
        : (<div className="Homepage mb-4 font-weight-bold container ">
          < h3 > Jobly</h3 >
          <p>All the jobs in one, convenient place.</p>
          <Link to="/login" className="btn btn-primary m-1">Login</Link>
          <Link to="/signup" className="btn btn-primary m-1">SignUp</Link>
        </div >)}
    </>)

}


export default Homepage;