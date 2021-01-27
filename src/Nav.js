import { NavLink } from "react-router-dom";


/** Navbar Component
 * 
 * Props:
 * - currentUser: {}
 * - logout: function from App Component
 * 
 * State: none
 * 
 * Routes -> Nav
 * */
function Nav({ currentUser, logout }) {

  console.log("CURRENT USER =", currentUser);
  /* generate navlinks for when user is logged out */
  function displayLinksLoggedOut() {
    return (
      <ul className="Nav-loggedOut navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink exact to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/signup" className="nav-link">
            Signup
          </NavLink>
        </li>
      </ul>
    )
  }
  /* generate navlinks for when user is logged in */
  function displayLinksLoggedIn() {
    return (
      <ul className="Nav-loggedIn navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink to="/companies" className="nav-link">
            Companies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/jobs" className="nav-link">
            Jobs
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/profile" className="nav-link">
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/" onClick={handleLogout} className="nav-link">
            Logout {currentUser}
          </NavLink>
        </li>
      </ul>
    )
  }

  /* handle when user clicks on the logout link */
  function handleLogout() {
    logout();
  }

  return (
    <nav className="Nav navbar navbar-expand-lg navbar-light bg-light">
      <NavLink exact to="/" className="navbar-brand">
        Jobly
      </NavLink>
      {/* Put <ul> here */}
      {currentUser
        ? displayLinksLoggedIn()
        : displayLinksLoggedOut()}
    </nav>
  )
}


export default Nav;