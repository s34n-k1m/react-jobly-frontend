import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "./userContext";


/* 
Props: signup function from Routes, App
State: formData
App -> Routes -> SignupForm
*/
function SignupForm({ signup }) {
  // TODO: DUMMY DATA FOR TESTING, CHANGE LATER
  const initialFormData = { username: "test", password: "password", firstName: "testf", lastName: "testl", email: "test@test.com" }
  
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessages, setErrorMessages] = useState([]);

  const history = useHistory();
  const currentUser = useContext(UserContext);

  /* Handles form submission */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const resSignup = await signup(formData);

    if (resSignup[0] === "Signup successful") {
      setFormData(initialFormData);
    } else {
      setErrorMessages(resSignup);
    }
  }

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

  if (Object.keys(currentUser).length !== 0) history.push("/companies");

  return (
    <div className="SignupForm col-6 container">
      <form className="SignupForm-form my-3 mx-15" onSubmit={handleSubmit}>
        <label htmlFor="username" className="">Username</label>
        <input
          className="SignupForm-username form-control flex-grow-1"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password" className="">Password</label>
        <input
          className="SignupForm-password form-control flex-grow-1"
          name="password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="firstName" className="">First Name</label>
        <input
          className="SignupForm-firstName form-control flex-grow-1"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName" className="">Last Name</label>
        <input
          className="SignupForm-lastName form-control flex-grow-1"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className="">Email</label>
        <input
          className="SignupForm-email form-control flex-grow-1"
          name="email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {displayErrorMessage()}
        <button className="btn btn-primary mt-3">Sign Up!</button>
      </form>
    </div>
  );

}

export default SignupForm;