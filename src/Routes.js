import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import Nav from "./Nav";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import UserContext from "./userContext";
import { useContext } from "react";

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
function Routes({ login, logout, signup, updateProfile }) {
  const currentUser = useContext(UserContext);

  return (
    <>
      <Nav logout={logout} />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/companies">
          {currentUser ? <CompanyList /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/companies/:handle">
          {currentUser ? <CompanyDetail /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/jobs">
          {currentUser ? <JobList /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/profile">
          {currentUser ? <ProfileForm updateProfile={updateProfile}/> : <Redirect to="/" />}
        </Route>
        <Route exact path="/login">
          {!currentUser ? <LoginForm login={login} /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/signup">
          {!currentUser ? <SignupForm signup={signup} /> : <Redirect to="/" />}
        </Route>
        <Redirect to="/" />
      </Switch>
    </>);
}

export default Routes;