import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./userContext";

/* 
Homepage with signup and login option 
Props: none 
App -> Routes -> Homepage
*/
function Homepage() {
  const currentUser = useContext(UserContext);
  const history = useHistory();

  if (Object.keys(currentUser).length !== 0) history.push("/companies");

  return (
    <div className="Homepage mb-4 font-weight-bold container ">
      < h3 > Jobly</h3 >
      <p>All the jobs in one, convenient place.</p>
      <Link to="/login" className="btn btn-primary m-1">Login</Link>
      <Link to="/signup" className="btn btn-primary m-1">SignUp</Link>
    </div >);

}


export default Homepage;