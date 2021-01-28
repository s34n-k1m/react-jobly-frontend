import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./userContext";
/* 
Props: 
  login function from Routes, App
State: 
  formData
  isLoggingIn: T/F
App -> Routes -> LoginForm
*/
function LoginForm({ login }) {
  const initialFormData = { username: "test", password: "password" }
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const history = useHistory();
  const currentUser = useContext(UserContext);

  // TODO: have state to say "we are logging in", change to effect
  /* Handles form submission */
  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoggingIn(true);
  }

  useEffect(function loginUser(){
    async function loginAPICall(){
      const resLogin = await login(formData);
      if (resLogin[0] === "Login successful") {
        setFormData(initialFormData);
      } else {
        setErrorMessages(resLogin);
      }
    }
    if (isLoggingIn){
      loginAPICall();
    }
    setIsLoggingIn(false);
  }, [isLoggingIn])
  /* Handles form data changes */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  /* Displays error message if wrong login info inputted */
  function displayErrorMessage() {
    return (
      <>
        {
          errorMessages.length > 0
            ? errorMessages.map((e, i) => (
              <div key={i} className="alert alert-danger mt-3">{e}</div>))
            : null
        }
      </>);
  }
  if (currentUser) history.push("/companies");

  return (
    <div className="LoginForm col-6 container">

      <form className="LoginForm-form my-3 mx-15" onSubmit={handleSubmit}>
        <label htmlFor="username" className="">Username</label>
        <input
          className="LoginForm-username form-control flex-grow-1"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password" className="">Password</label>
        <input
          className="LoginForm-password form-control flex-grow-1"
          name="password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {displayErrorMessage()}
        <button className="btn btn-primary mt-3">Log in!</button>
      </form>
    </div>
  );

}

export default LoginForm;