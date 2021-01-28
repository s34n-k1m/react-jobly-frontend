import './App.css';
import { useState, useEffect } from "react";
import Routes from "./Routes";
import { BrowserRouter } from 'react-router-dom';
import JoblyApi from "./api";
import jwt from "jsonwebtoken";
import UserContext from "./userContext";
import useLocalStorage from "./useLocalStorage";

// import {BrowserRouter} from "react-router-dom";

/** App Component
 * 
 * Props: none
 * 
 * State: 
 * - currentUser: {}
 * - token : null
 * 
 * App -> Routes
 * */
function App() {
  const [currentUser, setCurrentUser] = useState(null); // CHANGE THE DEFAULT VALUE LATER
  const [token, setToken] = useLocalStorage("token", null);
  const [receivedCurrUser, setReceivedCurrUser] = useState(false);

  /* Logout function, sets currentUser to null */
  function logout() {
    setToken(null);
  }

  /* signup function, set token */
  async function signup(formData) {
    try {
      const resToken = await JoblyApi.signup(formData);
      setToken(resToken);

      return ["Signup successful"]
    } catch (err) {
      return err;
    }
  }

  /* login function, set token*/
  async function login(formData) {
    try {
      const resToken = await JoblyApi.login(formData);
      setToken(resToken);

      return ["Login successful"];
    } catch (err) {
      return err;
    }
  }

  useEffect(function getCurrentUser() {
    async function getCurrentUserApiCall() {
      if (token !== null) {
        JoblyApi.token = token;

        const payload = jwt.decode(token);
        const user = await JoblyApi.getUser(payload.username);

        setCurrentUser(user);
        setReceivedCurrUser(true);
      }
    };
    setCurrentUser(null);
    getCurrentUserApiCall();
  }, [token])

  if (!receivedCurrUser) return <div> Loading... </div>;

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={currentUser} >
          <Routes
            logout={logout}
            signup={signup}
            login={login} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
