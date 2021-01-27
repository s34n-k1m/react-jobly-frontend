import './App.css';
import { useState, useEffect} from "react";
import Routes from "./Routes";
import { BrowserRouter } from 'react-router-dom';
import JoblyApi from "./api";
import jwt from "jsonwebtoken";
 

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
  const [currentUser, setCurrentUser] = useState({}); // CHANGE THE DEFAULT VALUE LATER
  const [token, setToken] = useState(null);

  /* Logout function, sets currentUser to null */
  function logout() {
    setCurrentUser({});
    setToken(null);
  }
  /* signup function, set token */
  async function signup(formData){
    const resToken = await JoblyApi.signup(formData);
    JoblyApi.token = resToken;
    setToken(resToken);
  }
  /* login function, set token*/
  async function login(formData){
    const resToken = await JoblyApi.login(formData);
    JoblyApi.token = resToken;
    setToken(resToken);
  }

  useEffect(function getCurrentUser(){
    async function getCurrentUserApiCall(){
      if (token !== null){
        const payload = jwt.decode(token);
        const user = await JoblyApi.getUser(payload.username);
        setCurrentUser(user);
      }
    };
    getCurrentUserApiCall();
  }, [token])
 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes 
          currentUser={currentUser}
          logout={logout}
          signup={signup}
          login={login}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
