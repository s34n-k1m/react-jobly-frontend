import { NavLink } from "react-router-dom";


function Nav({ currentUser, logout}) {


  /* generate navlinks for when user is logged out */
  function whenLoggedOut() {
    return (
      <div className="Nav-loggedOut">
        <NavLink exact to="/login">
          LoginForm
        </NavLink>
        <NavLink exact to="/signup">
          SignupForm
        </NavLink>
      </div>
    )
  }
    /* generate navlinks for when user is logged in */
    function whenLoggedIn() {
      return (
        <div className="Nav-loggedIn">
          <NavLink exact to="/companies">
            Companies
        </NavLink>
          <NavLink exact to="/jobs">
            Jobs
        </NavLink>
          <NavLink exact to="/profile">
            Profile
        </NavLink>
          <NavLink exact to="/" onClick={handleLogout}>
            Logout {currentUser}
          </NavLink>
        </div>
      )
    }

  /* handle when user clicks on the logout link */
  function handleLogout(){
    logout();
  }

  return (
    <Nav className="Nav">
      <NavLink exact to="/">
        Jobly
      </NavLink>
      {currentUser
        ? whenLoggedIn()
        : whenLoggedOut()}
    </Nav>
  )
}


export default Nav;