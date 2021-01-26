import './App.css';
import { useState } from "react";
import Routes from "./Routes";
import { BrowserRouter } from 'react-router-dom';

// import {BrowserRouter} from "react-router-dom";

/** App Component
 * 
 * Props: none
 * 
 * State: 
 * - currentUser: {}
 * 
 * App -> Routes
 * */
function App() {
  const [currentUser, setCurrentUser] = useState("test"); // CHANGE THE DEFAULT VALUE LATER

  /* Logout function, sets currentUser to null */
  function logout() {
    //TODO: not fully functioning yet, may need to make AJAX request
    setCurrentUser(null);
  }
 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes currentUser={currentUser} logout={logout} />
      </BrowserRouter>
    </div>
  );
}

export default App;
