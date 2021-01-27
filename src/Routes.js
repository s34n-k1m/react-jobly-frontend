import { Route, Switch, Redirect} from "react-router-dom";
import Homepage from "./Homepage";
import Nav from "./Nav";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";


/** Routes Component
 * 
 * Props:
 * - currentUser: {}
 * - logout: function passed from App
 * - login: function passed from App
 * - signup: function passed from App
 * 
 * State: none
 * 
 * App -> Routes -> {Homepage, CompanyList, CompanyDetail, JobList, LoginForm, SignupForm, ProfileForm}
 * */
function Routes({ login, logout, signup }) {
  return (
    <>
      <Nav logout={logout}/>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/companies">
          <CompanyList />
        </Route>
        <Route exact path="/companies/:handle">
          <CompanyDetail />
        </Route>
        <Route exact path="/jobs">
          <JobList />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>
        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>
        <Route exact path="/profile">
          <ProfileForm />
        </Route>
        <Redirect to="/"/>
      </Switch>
    </>
  );

}

export default Routes;